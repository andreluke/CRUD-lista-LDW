import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const secret = process.env.JWT_SECRET;

export const tokenize = (object: any) => {

    if (!secret) {
        throw new Error("JWT_SECRET is not defined");
    }
    return jwt.sign(object, secret, { expiresIn: '1h' })
}

export const validadeAcess = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // o token enviado pelo cliente no header da requisição
  const authorization: string | undefined = req.headers.authorization;
  if (!authorization) {
    res.status(401).send({ error: "Efetue o login para continuar" });
  } else {
    try {
      // autorização no formato Bearer token
      const [, token] = authorization.split(" ");
      if (!secret) {
        throw new Error("JWT_SECRET is not defined");
    }
      const decoded = <any>jwt.verify(token, secret);
      if (decoded) {
        res.locals = decoded;
        next();
      } else {
        res.status(401).send({ error: "Não autorizado" });
      }
    } catch (e: any) {
      if( e.message == "jwt malformed" ){
        res.status(401).send({ error: "Token inválido" });
      }
      else{
        res.status(401).send({ error: e.message });
      }
    }
  }
};

