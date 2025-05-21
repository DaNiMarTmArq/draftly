import { Router } from "express";
import authorRouter from "./authorroutes";
import postRouter from "./postroutes";

const router = Router();

router.use("/authors", authorRouter);
router.use("/posts", postRouter);

export default router;
