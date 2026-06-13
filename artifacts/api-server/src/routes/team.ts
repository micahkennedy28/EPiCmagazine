import { Router, type IRouter } from "express";
import { eq } from "drizzle-orm";
import { db, teamMembersTable } from "@workspace/db";
import {
  ListTeamMembersResponse,
  GetTeamMemberParams,
  GetTeamMemberResponse,
} from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/team", async (_req, res): Promise<void> => {
  const members = await db.select().from(teamMembersTable).orderBy(teamMembersTable.id);
  res.json(ListTeamMembersResponse.parse(members));
});

router.get("/team/:id", async (req, res): Promise<void> => {
  const params = GetTeamMemberParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const [member] = await db
    .select()
    .from(teamMembersTable)
    .where(eq(teamMembersTable.id, params.data.id));

  if (!member) {
    res.status(404).json({ error: "Team member not found" });
    return;
  }

  res.json(GetTeamMemberResponse.parse(member));
});

export default router;
