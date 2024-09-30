import mongoose, { ObjectId, Schema, Types } from "mongoose";
import { ISubTask } from "../interfaces/ISubTask";

const subTaskSchema = new Schema<ISubTask>({
    idtask: {
        type: Types.ObjectId,
        ref: 'Task',
        required: [true, "A tarefa é obrigatória"],
        validate:{
            validator: async function(_id:ObjectId) {
                const document = await mongoose.models.Task.findById(_id);
                return !!document;
            },
            message:"A tarefa não existe no cadastro"
        }
    },
    titulo: {
        type: String,
        trim: true,
    },
    descricao:{
        type: String,
        trim: true,
    }
})

const SubTask = mongoose.model<ISubTask>("SubTask", subTaskSchema)

export default SubTask