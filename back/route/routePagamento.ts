import { Router, Request, Response } from 'express';
import { MeioDePagamento } from './../model/meioPagamentos';

export const routePagamento = Router();

routePagamento.get('/pagamento', async (req: Request, res: Response) => 
{
    let result = await MeioDePagamento.listAll();

    res.status(200).json(result)
});

routePagamento.get('/pagamento/:id', async (req: Request, res: Response) => 
{
    let id = Number(req.params.id);
    let pagamento = await MeioDePagamento.findOneById(id);

    if ( pagamento != null)
    {
        res.status(200).json(pagamento);
        return;
    }

    let erro = { "id": id, "erro" : "Pagamento não encontrada." };

    res.status(400).json(erro);
});

routePagamento.post('/pagamento', async (req: Request, res: Response) => 
{
    let pagamento = new MeioDePagamento();
    Object.assign(pagamento, req.body);
    let erros : string[] = pagamento.validate();

    if (erros.length > 0)
    {
        let json = {"erros":erros};
        res.status(400).json(json);
    }

    await pagamento.insert();

    if (pagamento.id)
    {
        res.status(200).json(pagamento);
        return;  
    }

    let erro = { "id": null, "erro" : "Erro ao inserir pagamento." };

    res.status(400).json(erro);
});

routePagamento.put('/pagamento/:id', async (req: Request, res: Response) => 
{
    let id = Number(req.params.id);
    let pagamento = await MeioDePagamento.findOneById(id);

    if (pagamento == null)
    {
        let erro = { "id": id, "erro" : "Pagamento não encontrado." };
        res.status(400).json(erro);
        return;
    }

    Object.assign(pagamento, req.body);
    
    let erros : string[] = pagamento.validate();

    if (erros.length > 0)
    {
        let json = {"erros":erros};
        res.status(400).json(json);
    }

    pagamento.update();

    if ( pagamento.id)
    {
        res.status(200).json(pagamento);
        return;
    }

    let erro = { "id": id, "erro" : "Erro ao editar pagamento." };
    res.status(400).json(erro);
});

routePagamento.delete('/pagamento/:id', async (req: Request, res: Response) => 
{
    let id = Number(req.params.id);
    let pagamento = await MeioDePagamento.findOneById(id);

    await pagamento?.delete();

    let retorno = {"okay" : true };
    res.status(200).json(pagamento);
});