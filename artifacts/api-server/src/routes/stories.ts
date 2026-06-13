import { Router, type IRouter } from "express";
import { eq, desc } from "drizzle-orm";
import { db, storiesTable } from "@workspace/db";
import {
  ListStoriesQueryParams,
  ListStoriesResponse,
  GetStoryParams,
  GetStoryResponse,
} from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/stories", async (req, res): Promise<void> => {
  const query = ListStoriesQueryParams.safeParse(req.query);
  const limit = query.success && query.data.limit ? query.data.limit : 50;

  let stories;
  if (query.success && query.data.featured === true) {
    stories = await db
      .select()
      .from(storiesTable)
      .where(eq(storiesTable.featured, true))
      .orderBy(desc(storiesTable.publishedAt))
      .limit(limit);
  } else {
    stories = await db
      .select()
      .from(storiesTable)
      .orderBy(desc(storiesTable.publishedAt))
      .limit(limit);
  }

  res.json(ListStoriesResponse.parse(stories));
});

router.get("/stories/:id", async (req, res): Promise<void> => {
  const params = GetStoryParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const [story] = await db
    .select()
    .from(storiesTable)
    .where(eq(storiesTable.id, params.data.id));

  if (!story) {
    res.status(404).json({ error: "Story not found" });
    return;
  }

  res.json(GetStoryResponse.parse(story));
});

export default router;
