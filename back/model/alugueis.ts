import { client, dbQuery } from './../database';

export class Aluguel
{
    id: number = 0;
    idCliente: number = 0;
    idPatinete: number = 0;
    idMeioPagamento: number = 0;
    dataAluguel: string = "";
    horaAluguel: string = "";
    dataDevolucao: string = "";
    horaDevolucao: string = "";
    valorTotal: number = 0;

    validate()
    {
        let errors: string[] = [];

        if ( this.dataAluguel.length == 0)
        {
            errors.push("Data do aluguel é obrigatório.");
        }
        if ( this.horaAluguel.length == 0)
        {
            errors.push("Hora do aluguel é obrigatório.");
        }
        if ( this.dataDevolucao.length == 0)
        {
            errors.push("Data da devolução é obrigatório.");
        }
        if ( this.horaDevolucao.length == 0)
        {
            errors.push("Hora da devolução é obrigatório.");
        }
        if ( this.valorTotal == 0)
        {
            errors.push("Valor total é obrigatório.");
        }
        return errors;
    }

    public async insert():Promise<Aluguel|null>
    {
        let sql = `INSERT INTO "alugueis" 
    (
    "idCliente", 
    "idPatinete",
    "idMeioPagamento", 
    "dataAluguel",
    "horaAluguel",
    "dataDevolucao",
    "horaDevolucao",
    "valorTotal"
    ) 
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING id`;

        let params = [
            this.idCliente,
            this.idPatinete,
            this.idMeioPagamento,
            this.dataAluguel,
            this.horaAluguel,
            this.dataDevolucao,
            this.horaDevolucao,
            this.valorTotal 
        ];

        let resultado = await dbQuery(sql,params);

        if (resultado.length > 0 )
        {
            this.id = resultado[0].id;
            return this;
        }

        return null;
    }

    public async update():Promise<Aluguel|null>
    {
        let sql = `
        UPDATE "algueis" 
        SET 
        "idCliente" = $1,
        "idPatinete" = $2,
        "idMeioPagamento" = $3,
        "dataAluguel" = $4,
        "horaAluguel" = $5,
        "dataDevolucao" = $6,
        "horaDevolucao" = $7,
        "valorTotal" = $8
        WHERE id = $9`;    
        
        let params = [
            this.idCliente,
            this.idPatinete,
            this.idMeioPagamento,
            this.dataAluguel,
            this.horaAluguel,
            this.dataDevolucao,
            this.horaDevolucao,
            this.valorTotal,
            this.id
        ];

        let resultado = await dbQuery(sql,params);

        if (resultado)
        {
            return this;
        }

        return null;
    }

    public async save():Promise<Aluguel|null>
    {
        if (this.id)
        {
            return await this.update();
        }

        return await this.insert();
    }

    public async delete():Promise<Aluguel|null>
    {
        let sql = `DELETE FROM "alugueis" WHERE id = $1 RETURNING id;`;
        let resultado = await dbQuery(sql,[this.id]);

        if (resultado.length > 0 )
        {
            this.id = resultado[0].id;
            return this;
        }

        return null;
    }

    static async findOneById(id:number):Promise<Aluguel|null>
    {
        let sql = `SELECT * FROM "alugueis"
        WHERE id = $1 LIMIT 1`;
        let resultado = await dbQuery(sql,[id]);

        if (resultado.length > 0)
        {
            let aluguel = new Aluguel();
            Object.assign(aluguel,resultado[0]);
            return aluguel;
        }

        return null;
    }

    static async listAll():Promise<Aluguel[]>
    {
        let sql = `SELECT * FROM "alugueis" ORDER BY "id"`;

        let result = await dbQuery(sql);
        let alugueis : Aluguel[] = [];

        for (let i = 0 ; i < result.length; i++)
        {
            let json = result[i];
            let aluguel = new Aluguel();
            Object.assign(aluguel, json);
            alugueis.push(aluguel);
        }

        return alugueis;
    }
}