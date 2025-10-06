// routes/messages.ts
import express from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = express.Router();

// GET /api/users/:id/messages
router.get("/users/:id/messages", async (req, res) => {
  const { id } = req.params;

  try {
    const user = await prisma.user.findUnique({
      where: { id },
      include: {
        messages: {
          orderBy: { created_at: "asc" }, // เรียงตามเวลา
        },
      },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({
      user: {
        id: user.id,
        display_name: user.display_name,
        line_user_id: user.line_user_id,
      },
      messages: user.messages.map((m) => ({
        id: m.id,
        direction: m.direction,
        content: m.content,
        status: m.status,
        created_at: m.created_at,
      })),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
