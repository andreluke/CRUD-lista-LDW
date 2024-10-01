import mongoose, { ObjectId, Schema, Types } from "mongoose";
import { ITask } from "../interfaces/ITask";

const taskSchema = new Schema<ITask>({
    idlist: {
        type: Types.ObjectId,
        ref: 'List',
        required: [true, "A lista é obrigatória"],
        validate:{
            validator: async function(_id:ObjectId) {
                const document = await mongoose.models.List.findById(_id);
                return !!document;
            },
            message:"A lista não existe no cadastro"
        }
    },
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
    subTasks: [{ type: Schema.Types.ObjectId, ref: 'SubTask' }]
})

const Task = mongoose.model<ITask>("Task", taskSchema)

export default Task