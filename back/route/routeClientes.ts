import { Router, Request, Response } from 'express';
import { Cliente } from './../model/clientes';

export const routeCliente = Router();

routeCliente.get('/cliente', async (req: Request, res: Response) => 
{
    let result = await Cliente.listAll();

    res.status(200).json(result)
});

routeCliente.get('/cliente/:id', async (req: Request, res: Response) => 
{
    let id = Number(req.params.id);
    let cliente = await Cliente.findOneById(id);

    if ( cliente != null)
    {
        res.status(200).json(cliente);
        return;
    }

    let erro = { "id": id, "erro" : "Cliente não encontrada." };

    res.status(400).json(erro);
});

routeCliente.post('/cliente', async (req: Request, res: Response) => 
{
    let cliente = new Cliente();
    Object.assign(cliente, req.body);
    let erros : string[] = cliente.validate();

    if (erros.length > 0)
    {
        let json = {"erros":erros};
        res.status(400).json(json);
    }

    await cliente.insert();

    if (cliente.id)
    {
        res.status(200).json(cliente);
        return;  
    }

    let erro = { "id": null, "erro" : "Erro ao inserir cliente." };

    res.status(400).json(erro);
});

routeCliente.put('/cliente/:id', async (req: Request, res: Response) => 
{
    let id = Number(req.params.id);
    let cliente = await Cliente.findOneById(id);

    if (cliente == null)
    {
        let erro = { "id": id, "erro" : "Cliente não encontrado." };
        res.status(400).json(erro);
        return;
    }

    Object.assign(cliente, req.body);
    
    let erros : string[] = cliente.validate();

    if (erros.length > 0)
    {
        let json = {"erros":erros};
        res.status(400).json(json);
    }

    cliente.update();

    if ( cliente.id)
    {
        res.status(200).json(cliente);
        return;
    }

    let erro = { "id": id, "erro" : "Erro ao editar cliente." };
    res.status(400).json(erro);
});

routeCliente.delete('/cliente/:id', async (req: Request, res: Response) => 
{
    let id = Number(req.params.id);
    let cliente = await Cliente.findOneById(id);

    await cliente?.delete();

    let retorno = {"okay" : true };
    res.status(200).json(cliente);
});