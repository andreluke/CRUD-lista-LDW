import { Router } from "express";
import controller from "../controllers/TaskController";

const router = Router();

router.get("/", controller.listTasks)
router.get("/mytask", controller.listTaskDetails)
router.post("/", controller.create)
router.put("/:id", controller.update)
router.delete("/:id", controller.delete)

export default router