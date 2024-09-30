import { Router } from "express";
import controller from "../controllers/ListController";

const router = Router();

router.get("/", controller.list)
router.get("/mylist", controller.listDetails)
router.post("/", controller.create),
router.put("/", controller.updatenome)
router.delete("/:id", controller.delete)

export default router