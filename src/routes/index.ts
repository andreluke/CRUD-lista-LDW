import { Router } from "express";
import user from "./user"
import list from "./list"

const routes = Router()

routes.use("/usuario", user);
routes.use("/lista", list)

export default routes