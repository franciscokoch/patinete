import { Router, Request, Response } from 'express';
import { Usuario } from './../model/usuario';

export const routeUsuario = Router();

routeUsuario.get('/usuario', async (req: Request, res: Response) => 
{
    let result = await Usuario.listAll();

    res.status(200).json(result)
});

routeUsuario.get('/usuario/:id', async (req: Request, res: Response) => 
{
    let id = Number(req.params.id);
    let usuario = await Usuario.findOneById(id);

    if ( usuario != null)
    {
        res.status(200).json(usuario);
        return;
    }

    let erro = { "id": id, "erro" : "Usuario não encontrada." };

    res.status(400).json(erro);
});

routeUsuario.post('/usuario', async (req: Request, res: Response) => 
{
    let usuario = new Usuario();
    Object.assign(usuario, req.body);
    let erros : string[] = usuario.validate();

    if (erros.length > 0)
    {
        let json = {"erros":erros};
        res.status(400).json(json);
    }

    await usuario.insert();

    if (usuario.id)
    {
        res.status(200).json(usuario);
        return;  
    }

    let erro = { "id": null, "erro" : "Erro ao inserir usuario." };

    res.status(400).json(erro);
});

routeUsuario.put('/usuario/:id', async (req: Request, res: Response) => 
{
    let id = Number(req.params.id);
    let usuario = await Usuario.findOneById(id);

    if (usuario == null)
    {
        let erro = { "id": id, "erro" : "Usuario não encontrado." };
        res.status(400).json(erro);
        return;
    }

    Object.assign(usuario, req.body);
    
    let erros : string[] = usuario.validate();

    if (erros.length > 0)
    {
        let json = {"erros":erros};
        res.status(400).json(json);
    }

    usuario.update();

    if ( usuario.id)
    {
        res.status(200).json(usuario);
        return;
    }

    let erro = { "id": id, "erro" : "Erro ao editar usuario." };
    res.status(400).json(erro);
});

routeUsuario.delete('/usuario/:id', async (req: Request, res: Response) => 
{
    let id = Number(req.params.id);
    let usuario = await Usuario.findOneById(id);

    await usuario?.delete();

    let retorno = {"okay" : true };
    res.status(200).json(usuario);
});