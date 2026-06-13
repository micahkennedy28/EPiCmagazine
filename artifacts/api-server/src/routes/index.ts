import { Router, type IRouter } from "express";
import healthRouter from "./health";
import magazinesRouter from "./magazines";
import teamRouter from "./team";
import storiesRouter from "./stories";
import eventsRouter from "./events";
import opportunitiesRouter from "./opportunities";
import contactRouter from "./contact";
import statsRouter from "./stats";

const router: IRouter = Router();

router.use(healthRouter);
router.use(magazinesRouter);
router.use(teamRouter);
router.use(storiesRouter);
router.use(eventsRouter);
router.use(opportunitiesRouter);
router.use(contactRouter);
router.use(statsRouter);

export default router;
