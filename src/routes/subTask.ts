import { Router } from "express";
import controller from "../controllers/SubTaskController";

const router = Router();

router.get("/", controller.list)
router.post("/", controller.create)
router.put("/:id", controller.update)
router.delete("/:id", controller.delete)

export default router