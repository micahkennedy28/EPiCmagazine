import { Router, type IRouter } from "express";
import { eq, gte } from "drizzle-orm";
import { db, eventsTable } from "@workspace/db";
import {
  ListEventsQueryParams,
  ListEventsResponse,
  GetEventParams,
  GetEventResponse,
} from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/events", async (req, res): Promise<void> => {
  const query = ListEventsQueryParams.safeParse(req.query);
  const limit = query.success && query.data.limit ? query.data.limit : 20;

  let events;
  if (query.success && query.data.upcoming === true) {
    events = await db
      .select()
      .from(eventsTable)
      .where(gte(eventsTable.date, new Date()))
      .orderBy(eventsTable.date)
      .limit(limit);
  } else {
    events = await db
      .select()
      .from(eventsTable)
      .orderBy(eventsTable.date)
      .limit(limit);
  }

  res.json(ListEventsResponse.parse(events));
});

router.get("/events/:id", async (req, res): Promise<void> => {
  const params = GetEventParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const [event] = await db
    .select()
    .from(eventsTable)
    .where(eq(eventsTable.id, params.data.id));

  if (!event) {
    res.status(404).json({ error: "Event not found" });
    return;
  }

  res.json(GetEventResponse.parse(event));
});

export default router;
