import { client, dbQuery } from './../database';

export class Patinete
{
    id: number = 0;
    cor: string = "";
    marca: string = "";
    modelo: string = "";

    validade()
    {
        let errors: string[] = [];

        if ( this.cor.length == 0)
        {
            errors.push("Nome é obrigatório.");
        }
        if ( this.marca.length == 0)
        {
            errors.push("CPF é obrigatório.");
        }
        if ( this.modelo.length == 0)
        {
            errors.push("E-mail é obrigatório.");
        }
        return errors;
    }

    public async insert():Promise<Patinete|null>
    {
        let sql = `INSERT INTO "patinetes" 
    (
    "cor", 
    "marca",
    "modelo"
    ) 
    VALUES ($1,$2,$3) RETURNING id`;

        let params = [
            this.cor,
            this.marca,
            this.modelo
        ];

        let resultado = await dbQuery(sql,params);

        if (resultado.length > 0 )
        {
            this.id = resultado[0].id;
            return this;
        }

        return null;
    }

    public async update():Promise<Patinete|null>
    {
        let sql = `
        UPDATE "patinetes" 
        SET 
        "cor" = $1,
        "marca" = $2,
        "modelo" = $3
        WHERE id = $7`;    
        
        let params = [
            this.cor,
            this.marca,
            this.modelo,
            this.id
        ];

        let resultado = await dbQuery(sql,params);

        if (resultado)
        {
            return this;
        }

        return null;
    }

    public async save():Promise<Patinete|null>
    {
        if (this.id)
        {
            return await this.update();
        }

        return await this.insert();
    }

    public async delete():Promise<Patinete|null>
    {
        let sql = `DELETE FROM "patinetes" WHERE id = $1 RETURNING id;`;
        let resultado = await dbQuery(sql,[this.id]);

        if (resultado.length > 0 )
        {
            this.id = resultado[0].id;
            return this;
        }

        return null;
    }

    static async findOneById(id:number):Promise<Patinete|null>
    {
        let sql = `SELECT * FROM "patinetes"
        WHERE id = $1 LIMIT 1`;
        let resultado = await dbQuery(sql,[id]);

        if (resultado.length > 0)
        {
            let patinete = new Patinete();
            Object.assign(patinete,resultado[0]);
            return patinete;
        }

        return null;
    }

    static async listAll():Promise<Patinete[]>
    {
        let sql = `SELECT * FROM "patinetes" ORDER BY "id;"`;

        let result = await dbQuery(sql);
        let patinetes : Patinete[] = [];

        for (let i = 0 ; i < result.length; i++)
        {
            let json = result[i];
            let patinete = new Patinete();
            Object.assign(patinete, json);
            patinetes.push(patinete);
        }

        return patinetes;
    }
}