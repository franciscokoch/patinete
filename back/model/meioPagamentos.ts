import { client, dbQuery } from './../database';

export class MeioDePagamento
{
    id: number = 0;
    nome: string = "";

    validade()
    {
        let errors: string[] = [];

        if ( this.nome.length == 0)
        {
            errors.push("Nome é obrigatório.");
        }
        return errors;
    }

    public async insert():Promise<MeioDePagamento|null>
    {
        let sql = `INSERT INTO "meioPagamento" 
    (
    "nome"
    ) 
    VALUES ($1) RETURNING id`;

        let params = [
            this.nome,
        ];

        let resultado = await dbQuery(sql,params);

        if (resultado.length > 0 )
        {
            this.id = resultado[0].id;
            return this;
        }

        return null;
    }

    public async update():Promise<MeioDePagamento|null>
    {
        let sql = `
        UPDATE "clientes" 
        SET 
        "nome" = $1,
        WHERE id = $2`;    
        
        let params = [
            this.nome,
            this.id
        ];

        let resultado = await dbQuery(sql,params);

        if (resultado)
        {
            return this;
        }

        return null;
    }

    public async save():Promise<MeioDePagamento|null>
    {
        if (this.id)
        {
            return await this.update();
        }

        return await this.insert();
    }

    public async delete():Promise<MeioDePagamento|null>
    {
        let sql = `DELETE FROM "meioPagamento" WHERE id = $1 RETURNING id;`;
        let resultado = await dbQuery(sql,[this.id]);

        if (resultado.length > 0 )
        {
            this.id = resultado[0].id;
            return this;
        }

        return null;
    }

    static async findOneById(id:number):Promise<MeioDePagamento|null>
    {
        let sql = `SELECT * FROM "meioPagamento"
        WHERE id = $1 LIMIT 1`;
        let resultado = await dbQuery(sql,[id]);

        if (resultado.length > 0)
        {
            let meioPagamento = new MeioDePagamento();
            Object.assign(meioPagamento,resultado[0]);
            return meioPagamento;
        }

        return null;
    }

    static async listAll():Promise<MeioDePagamento[]>
    {
        let sql = `SELECT * FROM "meioPagamentos" ORDER BY "id;"`;

        let result = await dbQuery(sql);
        let meioPagamentos : MeioDePagamento[] = [];

        for (let i = 0 ; i < result.length; i++)
        {
            let json = result[i];
            let meioPagamento = new MeioDePagamento();
            Object.assign(meioPagamento, json);
            meioPagamentos.push(meioPagamento);
        }

        return meioPagamentos;
    }
}