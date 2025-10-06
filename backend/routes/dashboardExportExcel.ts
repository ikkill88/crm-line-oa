// routes/dashboardExportExcel.ts
router.get("/dashboard/export-excel", async (req, res) => {
  try {
    const { start, end, fields } = req.query;
    let where: any = {};

    if (start && end) {
      where.created_at = {
        gte: new Date(start as string),
        lte: new Date(end as string),
      };
    }

    const messages = await prisma.message.findMany({
      where,
      orderBy: { created_at: "desc" },
      include: { user: true },
    });

    const selectedFields = (fields as string)?.split(",") || [
      "id",
      "user",
      "direction",
      "content",
      "status",
      "created_at",
    ];

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Messages");

    worksheet.columns = selectedFields.map(f => ({
      header: f,
      key: f,
      width: 20,
    }));

    messages.forEach(m => {
      const row: any = {};
      if (selectedFields.includes("id")) row.id = m.id;
      if (selectedFields.includes("user"))
        row.user = m.user?.display_name || m.user?.username || "Unknown";
      if (selectedFields.includes("direction")) row.direction = m.direction;
      if (selectedFields.includes("content")) row.content = m.content;
      if (selectedFields.includes("status")) row.status = m.status;
      if (selectedFields.includes("created_at")) row.created_at = m.created_at;
      worksheet.addRow(row);
    });

    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader("Content-Disposition", "attachment; filename=dashboard_export.xlsx");

    await workbook.xlsx.write(res);
    res.end();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Export Excel failed" });
  }
});
