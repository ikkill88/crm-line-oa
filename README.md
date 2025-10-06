CRM + LINE OA System
ระบบ CRM ที่เชื่อมต่อกับ LINE Official Account (LINE OA) รองรับการจัดการลูกค้า, ดู/ส่งข้อความ, Dashboard วิเคราะห์ และ Export ข้อมูล (CSV/Excel + Scheduled Export)

📂 โครงสร้างโปรเจกต์
crm-line-oa/


├── backend/
│   ├── prisma/
│   │   ├── schema.prisma          # โครงสร้าง DB
│   │   ├── seed.ts                # seed ค่า config LINE OA
│   │   └── seedDummy.ts           # seed users/messages จำลอง
│   ├── routes/
│   │   ├── messages.ts            # /api/users/:id/messages
│   │   ├── dashboard.ts           # /api/dashboard (KPI + charts)
│   │   ├── dashboardExport.ts     # /api/dashboard/export (CSV)
│   │   └── dashboardExportExcel.ts# /api/dashboard/export-excel (Excel)
│   ├── scheduler.ts               # cron job export อัตโนมัติ
│   ├── app.ts                     # main express app
│   ├── package.json
│   └── .env                       # config DB + LINE OA
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ChatHistory.jsx    # viewer + ส่งข้อความ
│   │   │   └── Dashboard.jsx      # dashboard + filter + export
│   │   └── pages/
│   │       └── UsersPage.jsx      # รายชื่อลูกค้า + chat history
│   ├── package.json
│
└── docker-compose.yml             # dev setup (db + backend + frontend)



✨ ฟีเจอร์ที่มี
Backend

Prisma + PostgreSQL

Seed config LINE OA (seed.ts)

Seed users/messages dummy (seedDummy.ts)

API /api/users/:id/messages → ดึงประวัติการสนทนา

API /api/messages/send → ส่งข้อความออกไปยัง LINE OA

API /api/dashboard → KPI + กราฟ (inbound/outbound, opt-in/out, top users, recent messages)

API /api/dashboard/export → Export CSV (เลือกช่วงเวลา + fields)

API /api/dashboard/export-excel → Export Excel (เลือกช่วงเวลา + fields)

Cron Job (scheduler.ts) → Export อัตโนมัติทุกวัน

Frontend (React)

UsersPage → เลือก user → ดู ChatHistory

ChatHistory → แสดงข้อความ inbound/outbound + ส่งข้อความใหม่

Dashboard → KPI cards + Line/Pie/Bar charts + Recent activity

Filter → เลือกช่วงเวลา (7 วัน / 30 วัน / Custom range)

DatePicker → เลือก start/end สำหรับ custom range

Export → CSV/Excel + เลือก fields ที่ต้องการ

⚙️ วิธีติดตั้งและใช้งาน
1. เตรียมระบบ
ติดตั้ง Docker + Docker Compose

Clone โปรเจกต์นี้

2. ตั้งค่า .env (backend)
env
DATABASE_URL="postgresql://crm:crm123@db:5432/crmdb?schema=public"
PORT=3000
LINE_CHANNEL_ID="YOUR_CHANNEL_ID"
LINE_CHANNEL_SECRET="YOUR_CHANNEL_SECRET"
LINE_CHANNEL_ACCESS_TOKEN="YOUR_CHANNEL_ACCESS_TOKEN"


3. รันระบบ
bash
docker-compose up -d
4. Migration + Seed
bash
docker-compose exec backend npm run prisma:migrate
docker-compose exec backend npm run prisma:seed
docker-compose exec backend npm run prisma:seed:dummy
5. เข้าใช้งาน
Backend API: http://localhost:3000/api/...

Frontend React: http://localhost:5173 (หรือ port ที่ตั้งไว้)

🚀 การใช้งาน
ดูรายชื่อลูกค้า → หน้า UsersPage

ดู/ส่งข้อความ → ChatHistory

ดูสถิติรวม → Dashboard

เลือกช่วงเวลา → Filter (7 วัน / 30 วัน / Custom)

Export → ปุ่ม Export CSV/Excel (เลือก fields ได้)

Export อัตโนมัติ → Cron job จะสร้างไฟล์ใน exports/ ทุกวัน

✅ สรุป
คุณจะได้ระบบ CRM + LINE OA ที่ครบทั้ง เก็บลูกค้า, ดู/ส่งข้อความ, Dashboard วิเคราะห์, Export ข้อมูล (manual + auto) และยังปรับแต่งได้ง่ายเพราะเราแยก backend/frontend ชัดเจน
