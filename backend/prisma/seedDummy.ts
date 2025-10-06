import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  // สร้างผู้ใช้จำลอง
  const user1 = await prisma.user.create({
    data: {
      line_user_id: "U1234567890",
      username: "dhanawat",
      display_name: "Dhanawat Test",
      picture_url: "https://example.com/avatar1.png",
      status_message: "สวัสดีครับ",
      opt_in: true,
      tags: ["vip", "test"]
    },
  });

  const user2 = await prisma.user.create({
    data: {
      line_user_id: "U0987654321",
      username: "alice",
      display_name: "Alice Example",
      picture_url: "https://example.com/avatar2.png",
      status_message: "Hello world",
      opt_in: true,
      tags: ["new"]
    },
  });

  // สร้างข้อความจำลอง
  await prisma.message.createMany({
    data: [
      {
        user_id: user1.id,
        direction: "inbound",
        content: "สวัสดีครับ สนใจสินค้าครับ",
        status: "received",
      },
      {
        user_id: user1.id,
        direction: "outbound",
        content: "ขอบคุณครับ เดี๋ยวทีมงานติดต่อกลับนะครับ",
        status: "sent",
      },
      {
        user_id: user2.id,
        direction: "inbound",
        content: "Do you have any promotions?",
        status: "received",
      },
    ],
  });

  console.log("✅ Seed dummy users/messages สำเร็จแล้ว");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
