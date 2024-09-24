import { Request, Response } from "express";
import List from "../models/List";


class ListController {
    public async create(req: Request, res: Response): Promise<void> {
        const { iduser, nome } = req.body;
        
        try {
            const response = await List.create({ iduser, nome});
            res.status(200).json(response);
        } catch (e: any) {
                res.send({ message: e });
            }
    }


    public async list(_: Request, res: Response): Promise<void> {
        res.send(await List.find(
            {},
            {},
            {
                sort: { nome: 1 }
            }
        ));
    }

    public async listDetails(req: Request, res: Response): Promise<void> {
        try {
          const lists = await List.find()
            .populate({
              path: 'tasks',
              populate: {
                path: 'subTasks',
              },
            })
            .exec();
    
          res.json(lists);
        } catch (error) {
          console.error(error);
          res.status(500).json({ message: 'Erro ao buscar detalhes da lista' });
        }
    }
      

    public async delete(req: Request, res: Response): Promise<void> {
        const { id } = req.body;
        const response = await List.findByIdAndDelete(id);
        if (response) {
            res.json(response);
        }
        else {
            res.json({ message: "Registro inexistente" });
        }
    }

    public async updatenome(req: Request, res: Response): Promise<void> {
        const { id, nome } = req.body;
        try {
            const response = await List.findByIdAndUpdate(
                id,
                { nome },
                {
                    new: true,
                    runValidators: true
                }
            );
            if (response) {
                res.json(response);
            }
            else {
                res.json({ message: "Registro inexistente" });
            }
        } catch (e: any) {
           
            if (e.errors?.mail) {
                res.send({ message: e.errors.nome.message });
            }
            else {
                res.send({ message: e });
            }
        }
    }
}

export default new ListController();