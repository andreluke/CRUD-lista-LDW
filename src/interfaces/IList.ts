import { ObjectId } from "mongoose";

export interface ISubTask {
    titulo: string,
    descricao: string
}
export interface ITask{
    idlist: ObjectId,
    titulo: string,
    descricao: string,
    prioridade: string,
    status: string,
    criadoEm: Date,
    venceEm: Date,
    subTasks: [ISubTask]
}


export interface IList{
    iduser: ObjectId,
    nome: string,
    tasks: [ITask]
}