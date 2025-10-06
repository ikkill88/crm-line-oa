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
