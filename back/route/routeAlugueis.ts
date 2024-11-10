import { Router, Request, Response } from 'express';
import { Aluguel } from './../model/alugueis';

export const routeAluguel = Router();

routeAluguel.get('/aluguel', async (req: Request, res: Response) => 
{
    let result = await Aluguel.listAll();

    res.status(200).json(result)
});

routeAluguel.get('/aluguel/:id', async (req: Request, res: Response) => 
{
    let id = Number(req.params.id);
    let aluguel = await Aluguel.findOneById(id);

    if ( aluguel != null)
    {
        res.status(200).json(aluguel);
        return;
    }

    let erro = { "id": id, "erro" : "Aluguel não encontrada." };

    res.status(400).json(erro);
});

routeAluguel.post('/aluguel', async (req: Request, res: Response) => 
{
    let aluguel = new Aluguel();
    Object.assign(aluguel, req.body);
    let erros : string[] = aluguel.validate();

    if (erros.length > 0)
    {
        let json = {"erros":erros};
        res.status(400).json(json);
    }

    await aluguel.insert();

    if (aluguel.id)
    {
        res.status(200).json(aluguel);
        return;  
    }

    let erro = { "id": null, "erro" : "Erro ao inserir aluguel." };

    res.status(400).json(erro);
});

routeAluguel.put('/aluguel/:id', async (req: Request, res: Response) => 
{
    let id = Number(req.params.id);
    let aluguel = await Aluguel.findOneById(id);

    if (aluguel == null)
    {
        let erro = { "id": id, "erro" : "Aluguel não encontrado." };
        res.status(400).json(erro);
        return;
    }

    Object.assign(aluguel, req.body);
    
    let erros : string[] = aluguel.validate();

    if (erros.length > 0)
    {
        let json = {"erros":erros};
        res.status(400).json(json);
    }

    aluguel.update();

    if ( aluguel.id)
    {
        res.status(200).json(aluguel);
        return;
    }

    let erro = { "id": id, "erro" : "Erro ao editar aluguel." };
    res.status(400).json(erro);
});

routeAluguel.delete('/aluguel/:id', async (req: Request, res: Response) => 
{
    let id = Number(req.params.id);
    let aluguel = await Aluguel.findOneById(id);

    await aluguel?.delete();

    let retorno = {"okay" : true };
    res.status(200).json(aluguel);
});