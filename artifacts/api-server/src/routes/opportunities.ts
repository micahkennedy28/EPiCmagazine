import { Router, type IRouter } from "express";
import { eq } from "drizzle-orm";
import { db, opportunitiesTable } from "@workspace/db";
import {
  ListOpportunitiesQueryParams,
  ListOpportunitiesResponse,
  GetOpportunityParams,
  GetOpportunityResponse,
} from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/opportunities", async (req, res): Promise<void> => {
  const query = ListOpportunitiesQueryParams.safeParse(req.query);

  let opportunities;
  if (query.success && query.data.category) {
    opportunities = await db
      .select()
      .from(opportunitiesTable)
      .where(eq(opportunitiesTable.category, query.data.category))
      .orderBy(opportunitiesTable.id);
  } else {
    opportunities = await db
      .select()
      .from(opportunitiesTable)
      .orderBy(opportunitiesTable.id);
  }

  res.json(ListOpportunitiesResponse.parse(opportunities));
});

router.get("/opportunities/:id", async (req, res): Promise<void> => {
  const params = GetOpportunityParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const [opportunity] = await db
    .select()
    .from(opportunitiesTable)
    .where(eq(opportunitiesTable.id, params.data.id));

  if (!opportunity) {
    res.status(404).json({ error: "Opportunity not found" });
    return;
  }

  res.json(GetOpportunityResponse.parse(opportunity));
});

export default router;
