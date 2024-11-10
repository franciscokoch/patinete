import { client, dbQuery } from './../database';

export class AluguelItem
{
    id: number = 0;
    idAluguel: number = 0;
    idPatinete: number = 0;
    quantidade: number = 0;
    valorUnitario: number = 0;
    valorTotal: number = 0;

    validate()
    {
        let errors: string[] = [];

        return errors;
    }

    public async insert():Promise<AluguelItem|null>
    {
        let sql = `INSERT INTO "aluguelItem" 
    (
    "idAluguel", 
    "idPatinete",
    "quantidade", 
    "valorUnitario",
    "valorTotal"
    ) 
    VALUES ($1,$2,$3,$4,$5) RETURNING id`;

        let params = [
            this.idAluguel,
            this.idPatinete,
            this.quantidade,
            this.valorUnitario,
            this.valorTotal,
        ];

        let resultado = await dbQuery(sql,params);

        if (resultado.length > 0 )
        {
            this.id = resultado[0].id;
            return this;
        }

        return null;
    }

    public async update():Promise<AluguelItem|null>
    {
        let sql = `
        UPDATE "aluguelItem" 
        SET 
        "idAluguel" = $1,
        "idPatinete" = $2,
        "quantidade" = $3,
        "valorUnitario" = $4,
        "valorTotal" = $5,
        WHERE id = $6`;    
        
        let params = [
            this.idAluguel,
            this.idPatinete,
            this.quantidade,
            this.valorUnitario,
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

    public async save():Promise<AluguelItem|null>
    {
        if (this.id)
        {
            return await this.update();
        }

        return await this.insert();
    }

    public async delete():Promise<AluguelItem|null>
    {
        let sql = `DELETE FROM "aluguelItem" WHERE id = $1 RETURNING id;`;
        let resultado = await dbQuery(sql,[this.id]);

        if (resultado.length > 0 )
        {
            this.id = resultado[0].id;
            return this;
        }

        return null;
    }

    static async findOneById(id:number):Promise<AluguelItem|null>
    {
        let sql = `SELECT * FROM "aluguelItem"
        WHERE id = $1 LIMIT 1`;
        let resultado = await dbQuery(sql,[id]);

        if (resultado.length > 0)
        {
            let aluguelItem = new AluguelItem();
            Object.assign(aluguelItem,resultado[0]);
            return aluguelItem;
        }

        return null;
    }

    static async listAll():Promise<AluguelItem[]>
    {
        let sql = `SELECT * FROM "aluguelItem" ORDER BY "id"`;

        let result = await dbQuery(sql);
        let aluguelItens : AluguelItem[] = [];

        for (let i = 0 ; i < result.length; i++)
        {
            let json = result[i];
            let aluguelItem = new AluguelItem();
            Object.assign(aluguelItem, json);
            aluguelItens.push(aluguelItem);
        }

        return aluguelItens;
    }
}