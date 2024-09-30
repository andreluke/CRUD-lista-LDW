import { Router } from "express";
import controller from "../controllers/UserController";
import { validadeAcess } from "../middlewares/Auth";

const router = Router();

router.get("/",  controller.listUsers);
router.get("/mylist", validadeAcess, controller.listUserDetails);
router.post("/", controller.create);
router.post("/login", controller.login)
router.delete("/:id",  controller.delete);
router.put("/email",  controller.updatemail);
router.put("/nome",  controller.updatenome);
router.put("/senha",  controller.updatesenha);

export default router