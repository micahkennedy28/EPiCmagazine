import { Router, type IRouter } from "express";
import { db, prayerRequestsTable, contactMessagesTable } from "@workspace/db";
import {
  SubmitPrayerRequestBody,
  SubmitContactBody,
} from "@workspace/api-zod";

const router: IRouter = Router();

router.post("/prayer-requests", async (req, res): Promise<void> => {
  const parsed = SubmitPrayerRequestBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const [prayerRequest] = await db
    .insert(prayerRequestsTable)
    .values(parsed.data)
    .returning();

  res.status(201).json({
    id: prayerRequest.id,
    name: prayerRequest.name,
    email: prayerRequest.email,
    request: prayerRequest.request,
    anonymous: prayerRequest.anonymous,
    submittedAt: prayerRequest.submittedAt.toISOString(),
  });
});

router.post("/contact", async (req, res): Promise<void> => {
  const parsed = SubmitContactBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const [message] = await db
    .insert(contactMessagesTable)
    .values(parsed.data)
    .returning();

  res.status(201).json({
    id: message.id,
    name: message.name,
    email: message.email,
    subject: message.subject,
    message: message.message,
    submittedAt: message.submittedAt.toISOString(),
  });
});

export default router;
