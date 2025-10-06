// routes/dashboard.ts
router.get("/dashboard", async (req, res) => {
  try {
    const range = req.query.range || "7"; // default 7 วัน
    let startDate: Date;
    let endDate: Date = new Date();
    endDate.setHours(23, 59, 59, 999);

    if (range === "7") {
      startDate = new Date();
      startDate.setDate(startDate.getDate() - 6);
    } else if (range === "30") {
      startDate = new Date();
      startDate.setDate(startDate.getDate() - 29);
    } else if (range === "custom" && req.query.start && req.query.end) {
      startDate = new Date(req.query.start as string);
      endDate = new Date(req.query.end as string);
    } else {
      return res.status(400).json({ error: "Invalid range" });
    }

    startDate.setHours(0, 0, 0, 0);

    // Query messages by day
    const days: { label: string; start: Date; end: Date }[] = [];
    const diffDays = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24));
    for (let i = 0; i <= diffDays; i++) {
      const d = new Date(startDate);
      d.setDate(startDate.getDate() + i);
      const start = new Date(d);
      const end = new Date(d);
      end.setHours(23, 59, 59, 999);
      days.push({
        label: d.toLocaleDateString("th-TH", { day: "2-digit", month: "short" }),
        start,
        end,
      });
    }

    const inboundCounts: number[] = [];
    const outboundCounts: number[] = [];

    for (const d of days) {
      const inbound = await prisma.message.count({
        where: { direction: "inbound", created_at: { gte: d.start, lte: d.end } },
      });
      const outbound = await prisma.message.count({
        where: { direction: "outbound", created_at: { gte: d.start, lte: d.end } },
      });
      inboundCounts.push(inbound);
      outboundCounts.push(outbound);
    }

    const dailyMessagesChart = {
      labels: days.map(d => d.label),
      datasets: [
        { label: "Inbound", data: inboundCounts, borderColor: "#36A2EB", backgroundColor: "rgba(54,162,235,0.2)" },
        { label: "Outbound", data: outboundCounts, borderColor: "#FF6384", backgroundColor: "rgba(255,99,132,0.2)" },
      ],
    };

    res.json({ dailyMessagesChart });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});
