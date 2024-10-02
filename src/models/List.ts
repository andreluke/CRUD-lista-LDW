import mongoose, { ObjectId, Schema, Types } from "mongoose";
import { IList, ITask, ISubTask } from "../interfaces/IList";

const subTaskSchema = new Schema<ISubTask>({
    titulo: {
        type: String,
        trim: true,
    },
    descricao:{
        type: String,
        trim: true,
    }
})

const taskSchema = new Schema<ITask>({
    titulo: {
        type: String,
        trim: true,
        required: true,
        maxlength: 6
    },
    descricao:{
        type: String,
        trim: true,
    },
    prioridade:{
        type: String,
        enum: {values: ["Alta", "Média", "Baixa"], message: "A prioridade só pode ser alta, média ou baixa!"},
        required: true
    },
    status:{
        type: String,
        enum: ["Concluído", "Não concluído"],
        default: "Não concluído"
    },
    criadoEm:{
        type: Date,
        default: Date.now
    },
    venceEm: {
        type: Date,
        required: true
    },
    subTasks: [subTaskSchema]
})


const listaSchema = new Schema<IList>({
    iduser: {
        type: Types.ObjectId,
        ref: 'User',
        required: [true, "O usuário é obrigatório"],
        validate:{
            validator: async function(_id:ObjectId) {
                const document = await mongoose.models.User.findById(_id);
                return !!document;
            },
            message:"O usuário não existe no cadastro"
        }
    },
    nome: {
        type: String,
        trim: true,
        required: true,
    },
    tasks: [taskSchema]
})

const Lista = mongoose.model<IList>("List", listaSchema)

export default Lista