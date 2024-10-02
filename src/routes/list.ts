import { Router } from "express";
import controller from "../controllers/ListController";

const router = Router();

router.get("/", controller.list)
router.post("/", controller.create),
router.put("/", controller.updatenome)
router.put("/:listId/tasks/:taskId", controller.updateTask);
router.delete("/:id", controller.delete)

export default router