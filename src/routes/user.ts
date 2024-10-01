import { Router } from "express";
import controller from "../controllers/UserController";
import { validadeAcess } from "../middlewares/Auth";

const router = Router();

router.get("/",  controller.listUsers);
router.get("/mylist/:id", validadeAcess, controller.listUserDetails);
router.post("/", controller.create);
router.post("/login", controller.login)
router.delete("/:id",  controller.delete);
router.put("/email/:id",  controller.updatemail);
router.put("/nome/:id",  controller.updatenome);
router.put("/senha/:id",  controller.updatesenha);

export default router