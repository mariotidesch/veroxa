import { Router, type IRouter } from "express";
import healthRouter from "./health";
import contactRouter from "./contact";
import assistantRouter from "./assistant";

const router: IRouter = Router();

router.use(healthRouter);
router.use(contactRouter);
router.use(assistantRouter);

export default router;
