import { Router, Request, Response } from 'express';
import { Patinete } from './../model/patinetes';

export const routePatinete = Router();

routePatinete.get('/patinete', async (req: Request, res: Response) => 
{
    let result = await Patinete.listAll();

    res.status(200).json(result)
});

routePatinete.get('/patinete/:id', async (req: Request, res: Response) => 
{
    let id = Number(req.params.id);
    let patinete = await Patinete.findOneById(id);

    if ( patinete != null)
    {
        res.status(200).json(patinete);
        return;
    }

    let erro = { "id": id, "erro" : "Patinete não encontrada." };

    res.status(400).json(erro);
});

routePatinete.post('/patinete', async (req: Request, res: Response) => 
{
    let patinete = new Patinete();
    Object.assign(patinete, req.body);
    let erros : string[] = patinete.validate();

    if (erros.length > 0)
    {
        let json = {"erros":erros};
        res.status(400).json(json);
    }

    await patinete.insert();

    if (patinete.id)
    {
        res.status(200).json(patinete);
        return;  
    }

    let erro = { "id": null, "erro" : "Erro ao inserir patinete." };

    res.status(400).json(erro);
});

routePatinete.put('/patinete/:id', async (req: Request, res: Response) => 
{
    let id = Number(req.params.id);
    let patinete = await Patinete.findOneById(id);

    if (patinete == null)
    {
        let erro = { "id": id, "erro" : "Patinete não encontrado." };
        res.status(400).json(erro);
        return;
    }

    Object.assign(patinete, req.body);
    
    let erros : string[] = patinete.validate();

    if (erros.length > 0)
    {
        let json = {"erros":erros};
        res.status(400).json(json);
    }

    patinete.update();

    if ( patinete.id)
    {
        res.status(200).json(patinete);
        return;
    }

    let erro = { "id": id, "erro" : "Erro ao editar patinete." };
    res.status(400).json(erro);
});

routePatinete.delete('/patinete/:id', async (req: Request, res: Response) => 
{
    let id = Number(req.params.id);
    let patinete = await Patinete.findOneById(id);

    await patinete?.delete();

    let retorno = {"okay" : true };
    res.status(200).json(patinete);
});