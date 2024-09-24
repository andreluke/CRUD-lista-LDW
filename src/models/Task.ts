import mongoose, { ObjectId, Schema, Types } from "mongoose";

const taskSchema = new Schema({
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
    },
    descricao:{
        type: String,
        trim: true,
    },
    prioridade:{
        type: String,
        enum: ["Alta", "Média", "Baixa"],
        required: true
    },
    status:{
        type: String,
        enum: ["Concluido", "Não concluido"],
        default: "Não concluido"
    },
    criadoEm:{
        type: Date,
        default: Date.now
    },
    venceEm: {
        type: Date,
        required: true
    }
})

const Task = mongoose.model("Task", taskSchema)

export default Task