import express from 'express';
import { Router, Express, Request, Response } from 'express';
import cors from 'cors';
import { routeCliente } from './route/routeClientes';

const port: Number = 3000;
let server: Express = express();

server.use(cors());
server.use(express.json());
server.use(routeCliente);

server.get('/', async (req: Request, res: Response) => 
{
    res.json( { message: "okay" } )
});

server.listen(port, () =>
{
    console.log('Server iniciado na porta ' + port );
});