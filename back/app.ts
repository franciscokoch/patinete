import express, { NextFunction, Express, Response, Request } from 'express';
import cors from 'cors';
import { routeCliente } from './route/routeClientes';
import { routeAluguel } from './route/routeAlugueis';
import { routePagamento } from './route/routePagamento';
import { routePatinete } from './route/routePatinete';
import { routeAluguelItem } from './route/routeAluguelItem';

const port: Number = 3000;
let server: Express = express();

server.use(cors());
server.use(express.json());
server.use(routeCliente);
server.use(routeAluguel);
server.use(routePagamento);
server.use(routePatinete);
server.use(routeAluguelItem);

server.listen(port, () =>
{
    console.log('Server iniciado na porta ' + port );
});