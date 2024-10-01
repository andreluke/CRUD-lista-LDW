import { ObjectId, Schema } from "mongoose";

export interface ITask{
    idlist: ObjectId,
    titulo: string,
    descricao: string,
    prioridade: string,
    status: string,
    criadoEm: Date,
    venceEm: Date,
    subTasks: ObjectId[]
}