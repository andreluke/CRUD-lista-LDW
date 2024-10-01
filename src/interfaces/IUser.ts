import { ObjectId } from "mongoose"

export interface IUser {
    nome: string,
    email: string,
    senha: string,
    lists: ObjectId[]
}