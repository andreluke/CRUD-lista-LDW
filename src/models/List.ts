import mongoose, { ObjectId, Schema, Types } from "mongoose";
import { IList } from "../interfaces/IList";

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
    tasks: [{ type: Schema.Types.ObjectId, ref: 'Task' }]
})

const Lista = mongoose.model<IList>("List", listaSchema)

export default Lista