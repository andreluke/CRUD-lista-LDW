import { Request, Response } from "express";
import Task from "../models/Task";
import mongoose from "mongoose";


class TaskController {
    public async create(req: Request, res: Response): Promise<void> {
        const { idlist, titulo, descricao, prioridade, status, venceEm } = req.body;
        
        try {
            const response = await Task.create({ idlist, titulo, descricao, prioridade, status, venceEm });
            res.status(200).json(response);
        } catch (e: any) {
                res.send({ message: e });
            }
    }

    public async listTasks(_: Request, res: Response): Promise<void> {
        res.send(await Task.find(
            {},
            {},
            {
                sort: { titulo: 1 }
            }
        ));
    }

    public async listTaskDetails(req: Request, res: Response): Promise<void> {
        try {
          const Tasks = await Task.find()
            .populate({
                path: 'subTasks',
            })
            .exec();
    
          res.json(Tasks);
        } catch (error) {
          console.error(error);
          res.status(500).json({ message: 'Erro ao buscar detalhes da tarefa' });
        }
    }
      

    public async delete(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const response = await Task.findByIdAndDelete(id);
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
            const response = await Task.findByIdAndUpdate(
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

export default new TaskController();