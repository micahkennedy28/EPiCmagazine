import { Router, type IRouter } from "express";
import { desc, eq } from "drizzle-orm";
import { db, magazinesTable } from "@workspace/db";
import {
  ListMagazinesQueryParams,
  ListMagazinesResponse,
  GetMagazineParams,
  GetMagazineResponse,
  GetLatestMagazineResponse,
  CreateMagazineBody,
} from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/magazines", async (req, res): Promise<void> => {
  const query = ListMagazinesQueryParams.safeParse(req.query);
  const limit = query.success && query.data.limit ? query.data.limit : 50;
  const offset = query.success && query.data.offset ? query.data.offset : 0;

  const magazines = await db
    .select()
    .from(magazinesTable)
    .orderBy(desc(magazinesTable.publishedAt))
    .limit(limit)
    .offset(offset);

  res.json(ListMagazinesResponse.parse(magazines));
});

router.post("/magazines", async (req, res): Promise<void> => {
  const parsed = CreateMagazineBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const [magazine] = await db.insert(magazinesTable).values(parsed.data).returning();
  res.status(201).json(GetMagazineResponse.parse(magazine));
});

router.get("/magazines/latest", async (_req, res): Promise<void> => {
  const [magazine] = await db
    .select()
    .from(magazinesTable)
    .orderBy(desc(magazinesTable.publishedAt))
    .limit(1);

  if (!magazine) {
    res.status(404).json({ error: "No magazine found" });
    return;
  }

  res.json(GetLatestMagazineResponse.parse(magazine));
});

router.get("/magazines/:id", async (req, res): Promise<void> => {
  const params = GetMagazineParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const [magazine] = await db
    .select()
    .from(magazinesTable)
    .where(eq(magazinesTable.id, params.data.id));

  if (!magazine) {
    res.status(404).json({ error: "Magazine not found" });
    return;
  }

  res.json(GetMagazineResponse.parse(magazine));
});

export default router;
