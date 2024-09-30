import { ObjectId } from "mongoose";

export interface ISubTask {
    idtask: ObjectId,
    titulo: string,
    descricao: string
}