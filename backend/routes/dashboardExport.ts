// routes/dashboardExport.ts
router.get("/dashboard/export", async (req, res) => {
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

    // default fields
    const selectedFields = (fields as string)?.split(",") || [
      "id",
      "user",
      "direction",
      "content",
      "status",
      "created_at",
    ];

    const data = messages.map(m => {
      const row: any = {};
      if (selectedFields.includes("id")) row.id = m.id;
      if (selectedFields.includes("user"))
        row.user = m.user?.display_name || m.user?.username || "Unknown";
      if (selectedFields.includes("direction")) row.direction = m.direction;
      if (selectedFields.includes("content")) row.content = m.content;
      if (selectedFields.includes("status")) row.status = m.status;
      if (selectedFields.includes("created_at")) row.created_at = m.created_at;
      return row;
    });

    const parser = new Parser({ fields: selectedFields });
    const csv = parser.parse(data);

    res.header("Content-Type", "text/csv");
    res.attachment("dashboard_export.csv");
    return res.send(csv);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Export failed" });
  }
});
