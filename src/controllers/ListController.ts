import { Request, Response } from "express";
import List from "../models/List";

class ListController {
  // Create a new list with tasks and subtasks
  public async create(req: Request, res: Response): Promise<void> {
    const { iduser, nome, tasks } = req.body;

    try {
      const response = await List.create({ iduser, nome, tasks });
      res.status(200).json(response);
    } catch (e: any) {
      res.status(400).json({ message: e.message });
    }
  }

  // List all lists sorted by name
  public async list(_: Request, res: Response): Promise<void> {
    try {
      const lists = await List.find({}, {}, { sort: { nome: 1 } });
      res.status(200).json(lists);
    } catch (e: any) {
      res.status(500).json({ message: "Erro ao buscar listas" });
    }
  }

  // Delete a list by ID
  public async delete(req: Request, res: Response): Promise<void> {
    const { id } = req.body;

    try {
      const response = await List.findByIdAndDelete(id);
      if (response) {
        res.status(200).json(response);
      } else {
        res.status(404).json({ message: "Registro inexistente" });
      }
    } catch (e: any) {
      res.status(500).json({ message: "Erro ao excluir lista" });
    }
  }

  // Update the name of a list by ID
  public async updatenome(req: Request, res: Response): Promise<void> {
    const { id, nome } = req.body;

    try {
      const response = await List.findByIdAndUpdate(
        id,
        { nome },
        {
          new: true,
          runValidators: true,
        }
      );

      if (response) {
        res.status(200).json(response);
      } else {
        res.status(404).json({ message: "Registro inexistente" });
      }
    } catch (e: any) {
      res.status(400).json({ message: e.message });
    }
  }
  public async updateTask(req: Request, res: Response): Promise<void> {
    const { listId, taskId } = req.params;
    const { titulo, descricao, prioridade, status, venceEm, subTasks } = req.body;

    try {
      // Find the list by ID and update the specific task by taskId
      const list = await List.findOneAndUpdate(
        { _id: listId, "tasks._id": taskId }, // Find the list and task by their respective IDs
        {
          $set: {
            "tasks.$.titulo": titulo,
            "tasks.$.descricao": descricao,
            "tasks.$.prioridade": prioridade,
            "tasks.$.status": status,
            "tasks.$.venceEm": venceEm,
            "tasks.$.subTasks": subTasks, // Replace subTasks if provided
          },
        },
        { new: true, runValidators: true }
      );

      if (list) {
        res.status(200).json(list);
      } else {
        res.status(404).json({ message: "Lista ou task não encontrada" });
      }
    } catch (error: any) {
      res.status(500).json({ message: "Erro ao atualizar a task", error: error.message });
    }
  }
}

export default new ListController();
