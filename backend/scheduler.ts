// scheduler.ts
import cron from "node-cron";
import fs from "fs";
import ExcelJS from "exceljs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function exportExcel() {
  const messages = await prisma.message.findMany({
    orderBy: { created_at: "desc" },
    include: { user: true },
  });

  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Messages");

  worksheet.columns = [
    { header: "ID", key: "id", width: 10 },
    { header: "User", key: "user", width: 25 },
    { header: "Direction", key: "direction", width: 10 },
    { header: "Content", key: "content", width: 50 },
    { header: "Status", key: "status", width: 10 },
    { header: "Created At", key: "created_at", width: 20 },
  ];

  messages.forEach(m => {
    worksheet.addRow({
      id: m.id,
      user: m.user?.display_name || m.user?.username || "Unknown",
      direction: m.direction,
      content: m.content,
      status: m.status,
      created_at: m.created_at,
    });
  });

  const fileName = `exports/dashboard_${new Date().toISOString().split("T")[0]}.xlsx`;
  await workbook.xlsx.writeFile(fileName);
  console.log("✅ Exported:", fileName);
}

// ตั้งเวลา: ทุกวันตี 1
cron.schedule("0 1 * * *", () => {
  console.log("⏰ Running scheduled export...");
  exportExcel();
});
