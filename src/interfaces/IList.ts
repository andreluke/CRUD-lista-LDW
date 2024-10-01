import { ObjectId, Schema } from "mongoose";

export interface IList{
    iduser: ObjectId,
    nome: string,
    tasks: ObjectId[]
}