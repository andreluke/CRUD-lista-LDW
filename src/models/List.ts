import mongoose, { ObjectId, Schema, Types } from "mongoose";

const listaSchema = new Schema({
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
    }
})

const Lista = mongoose.model("List", listaSchema)

export default Lista