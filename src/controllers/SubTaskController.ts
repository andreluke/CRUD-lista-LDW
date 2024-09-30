import { Request, Response } from "express";
import SubTask from "../models/SubTask";
import mongoose from "mongoose";


class SubTaskController {
    public async create(req: Request, res: Response): Promise<void> {
        const { idtask, titulo, descricao } = req.body;
        
        try {
            const response = await SubTask.create({ idtask, titulo, descricao });
            res.status(200).json(response);
        } catch (e: any) {
                res.status(400).send({ message: e });
            }
    }


    public async list(_: Request, res: Response): Promise<void> {
        res.send(await SubTask.find(
            {},
            {},
            {
                sort: { titulo: 1 }
            }
        ));
    }

    public async delete(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const response = await SubTask.findByIdAndDelete(id);
        if (response) {
            res.json(response);
        }
        else {
            res.json({ message: "Registro inexistente" });
        }
    }

    public async update(req: Request, res: Response): Promise<void> {
        const { id } = req.params; // Assumindo que o ID está nos parâmetros da URL
        const updateData = req.body; 
        try {
            const response = await SubTask.findByIdAndUpdate(
                id,
                updateData,
                {
                    new: true,
                    runValidators: true,
                    overwrite: false
                }
            );
    
            if (response) {
                res.json(response);
            } else {
                res.status(404).json({ message: "Registro inexistente" });
            }
        } catch (error) {
            if (error instanceof mongoose.Error.ValidationError) {
                const errorMessages = Object.values(error.errors).map(err => err.message);
                res.status(400).send({ messages: errorMessages });
            } else {
                res.status(500).send({ message: error instanceof Error ? error.message : "Erro interno do servidor" });
            }
        }
    }   
}

export default new SubTaskController();