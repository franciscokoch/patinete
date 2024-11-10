import { Router, Request, Response } from 'express';
import { AluguelItem } from './../model/aluguelItem';

export const routeAluguelItem = Router();

routeAluguelItem.get('/aluguelItem', async (req: Request, res: Response) => 
{
    let result = await AluguelItem.listAll();

    res.status(200).json(result)
});

routeAluguelItem.get('/aluguelItem/:id', async (req: Request, res: Response) => 
{
    let id = Number(req.params.id);
    let aluguelItem = await AluguelItem.findOneById(id);

    if ( aluguelItem != null)
    {
        res.status(200).json(aluguelItem);
        return;
    }

    let erro = { "id": id, "erro" : "Aluguel item não encontrada." };

    res.status(400).json(erro);
});

routeAluguelItem.post('/aluguelItem', async (req: Request, res: Response) => 
{
    let aluguelItem = new AluguelItem();
    Object.assign(aluguelItem, req.body);
    let erros : string[] = aluguelItem.validate();

    if (erros.length > 0)
    {
        let json = {"erros":erros};
        res.status(400).json(json);
    }

    await aluguelItem.insert();

    if (aluguelItem.id)
    {
        res.status(200).json(aluguelItem);
        return;  
    }

    let erro = { "id": null, "erro" : "Erro ao inserir aluguel item." };

    res.status(400).json(erro);
});

routeAluguelItem.put('/aluguelItem/:id', async (req: Request, res: Response) => 
{
    let id = Number(req.params.id);
    let aluguelItem = await AluguelItem.findOneById(id);

    if (aluguelItem == null)
    {
        let erro = { "id": id, "erro" : "Aluguel item não encontrado." };
        res.status(400).json(erro);
        return;
    }

    Object.assign(aluguelItem, req.body);
    
    let erros : string[] = aluguelItem.validate();

    if (erros.length > 0)
    {
        let json = {"erros":erros};
        res.status(400).json(json);
    }

    aluguelItem.update();

    if ( aluguelItem.id)
    {
        res.status(200).json(aluguelItem);
        return;
    }

    let erro = { "id": id, "erro" : "Erro ao editar aluguel item." };
    res.status(400).json(erro);
});

routeAluguelItem.delete('/aluguelItem/:id', async (req: Request, res: Response) => 
{
    let id = Number(req.params.id);
    let aluguelItem = await AluguelItem.findOneById(id);

    await aluguelItem?.delete();

    let retorno = {"okay" : true };
    res.status(200).json(aluguelItem);
});