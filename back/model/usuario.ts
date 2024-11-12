import { client, dbQuery } from './../database';

export class Usuario
{
    id: number = 0;
    usuario: string = "";
    senha: string = "";
    ativo: boolean;
}