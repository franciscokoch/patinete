import { client, dbQuery } from './../database';

export class Cliente
{
    id: number = 0;
    nome: string = "";
    cpf: string = "";
    email: string = "";
    telefone: string = "";
    cidade: string = "";
    siglaUf: string = "";

    validate()
    {
        let errors: string[] = [];

        if ( this.nome.length == 0)
        {
            errors.push("Nome é obrigatório.");
        }
        if ( this.cpf.length == 0)
        {
            errors.push("CPF é obrigatório.");
        }
        if ( this.email.length == 0)
        {
            errors.push("E-mail é obrigatório.");
        }
        if ( this.telefone.length == 0)
        {
            errors.push("Telefone é obrigatório.");
        }
        if (this.cidade.length == 0 || this.siglaUf.length == 0)
        {
            errors.push("É necessário definir cidade e sigla.");
        }
        return errors;
    }

    public async insert():Promise<Cliente|null>
    {
        let sql = `INSERT INTO "clientes" 
    (
    "nome", 
    "cpf",
    "email", 
    "telefone",
    "cidade",
    "siglaUf"
    ) 
    VALUES ($1,$2,$3,$4,$5,$6) RETURNING id`;

        let params = [
            this.nome,
            this.cpf,
            this.email,
            this.telefone,
            this.cidade,
            this.siglaUf
        ];

        let resultado = await dbQuery(sql,params);

        if (resultado.length > 0 )
        {
            this.id = resultado[0].id;
            return this;
        }

        return null;
    }

    public async update():Promise<Cliente|null>
    {
        let sql = `
        UPDATE "clientes" 
        SET 
        "nome" = $1,
        "cpf" = $2,
        "email" = $3,
        "telefone" = $4,
        "cidade" = $5,
        "siglaUf" = $6
        WHERE id = $7`;    
        
        let params = [
            this.nome,
            this.cpf,
            this.email,
            this.telefone,
            this.cidade,
            this.siglaUf,
            this.id
        ];

        let resultado = await dbQuery(sql,params);

        if (resultado)
        {
            return this;
        }

        return null;
    }

    public async save():Promise<Cliente|null>
    {
        if (this.id)
        {
            return await this.update();
        }

        return await this.insert();
    }

    public async delete():Promise<Cliente|null>
    {
        let sql = `DELETE FROM "clientes" WHERE id = $1 RETURNING id;`;
        let resultado = await dbQuery(sql,[this.id]);

        if (resultado.length > 0 )
        {
            this.id = resultado[0].id;
            return this;
        }

        return null;
    }

    static async findOneById(id:number):Promise<Cliente|null>
    {
        let sql = `SELECT * FROM "clientes"
        WHERE id = $1 LIMIT 1`;
        let resultado = await dbQuery(sql,[id]);

        if (resultado.length > 0)
        {
            let cliente = new Cliente();
            Object.assign(cliente,resultado[0]);
            return cliente;
        }

        return null;
    }

    static async listAll():Promise<Cliente[]>
    {
        let sql = `SELECT * FROM "clientes" ORDER BY "id"`;

        let result = await dbQuery(sql);
        let clientes : Cliente[] = [];

        for (let i = 0 ; i < result.length; i++)
        {
            let json = result[i];
            let cliente = new Cliente();
            Object.assign(cliente, json);
            clientes.push(cliente);
        }

        return clientes;
    }
}