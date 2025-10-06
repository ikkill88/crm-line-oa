import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // ค่าเริ่มต้น (คุณสามารถแก้ไขตรงนี้ได้)
  const channelId = process.env.LINE_CHANNEL_ID || "YOUR_CHANNEL_ID";
  const channelSecret = process.env.LINE_CHANNEL_SECRET || "YOUR_CHANNEL_SECRET";
  const channelAccessToken = process.env.LINE_CHANNEL_ACCESS_TOKEN || "YOUR_CHANNEL_ACCESS_TOKEN";

  await prisma.line_config.create({
    data: {
      channel_id: channelId,
      channel_secret: channelSecret,
      channel_access_token: channelAccessToken,
    },
  });

  console.log("✅ Seed line_config สำเร็จแล้ว");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
