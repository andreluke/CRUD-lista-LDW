import mongoose, { ObjectId, Schema, Types } from "mongoose";

const subTaskSchema = new Schema({
    idtask: {
        type: Types.ObjectId,
        ref: 'Task',
        required: [true, "A tarefa é obrigatório"],
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

const Task = mongoose.model("Task", subTaskSchema)

export default Task