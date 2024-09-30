import { Router } from "express";
import user from "./user"
import list from "./list"
import task from "./task"
import subTask from "./subTask"

const routes = Router()

routes.use("/usuario", user);
routes.use("/lista", list)
routes.use("/tarefa", task)
routes.use("/subtarefa", subTask)

export default routes