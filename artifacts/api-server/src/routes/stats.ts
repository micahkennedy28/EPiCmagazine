import { Router, type IRouter } from "express";
import { db, magazinesTable, teamMembersTable, storiesTable, eventsTable, opportunitiesTable } from "@workspace/db";
import { sql } from "drizzle-orm";
import { GetSiteStatsResponse } from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/stats", async (_req, res): Promise<void> => {
  const [magazineCount] = await db.select({ count: sql<number>`count(*)::int` }).from(magazinesTable);
  const [teamCount] = await db.select({ count: sql<number>`count(*)::int` }).from(teamMembersTable);
  const [storyCount] = await db.select({ count: sql<number>`count(*)::int` }).from(storiesTable);
  const [eventCount] = await db.select({ count: sql<number>`count(*)::int` }).from(eventsTable);
  const [opportunityCount] = await db.select({ count: sql<number>`count(*)::int` }).from(opportunitiesTable);

  res.json(GetSiteStatsResponse.parse({
    totalMagazines: magazineCount?.count ?? 0,
    totalTeamMembers: teamCount?.count ?? 0,
    totalStories: storyCount?.count ?? 0,
    totalOpportunities: opportunityCount?.count ?? 0,
    totalEvents: eventCount?.count ?? 0,
    youthReached: 2500,
    volunteerHours: 4800,
    communitiesServed: 12,
  }));
});

export default router;
