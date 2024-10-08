import mongoose, { ObjectId, Schema, Types } from "mongoose";
import { IUser } from "../interfaces/IUser";

const UserSchema = new Schema<IUser>({
  nome: {
    type: String,
    trim: true,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    unique: true,
    required: [true, "O e-mail é obrigatório"],
    validate: {
      validator: function (value: string) {
        // expressão regular para validar o formato do e-mail
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(value);
      },
      message: (props: any) =>
        `${props.value} não é um formato de e-mail válido`,
    },
  },
  senha: {
    type: String,
    minlength: 6,
    maxlength: 100,
    select: false,
    trim: true,
    required: [true, "A senha é obrigatória"],
  },
  lists: [{ type: Schema.Types.ObjectId, ref: "List" }],
});

const User = mongoose.model<IUser>("User", UserSchema);

export default User;
