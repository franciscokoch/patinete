import { client, dbQuery } from './../database';

export class Usuario
{
    id: number = 0;
    usuario: string = "";
    senha: string = "";

    validate()
    {
        let errors: string[] = [];

        if ( this.usuario.length == 0)
        {
            errors.push("Usuario é obrigatório.");
        }
        if ( this.senha.length == 0)
        {
            errors.push("Senha é obrigatório.");
        }
        return errors;
    }

    public async insert():Promise<Usuario|null>
    {
        let sql = `INSERT INTO "usuarios" 
    (
    "usuario", 
    "senha"
    ) 
    VALUES ($1,$2) RETURNING id`;

        let params = [
            this.usuario,
            this.senha
        ];

        let resultado = await dbQuery(sql,params);

        if (resultado.length > 0 )
        {
            this.id = resultado[0].id;
            return this;
        }

        return null;
    }

    public async update():Promise<Usuario|null>
    {
        let sql = `
        UPDATE "usuarios" 
        SET 
        "usuario" = $1,
        "senha" = $2,
        WHERE id = $3`;    
        
        let params = [
            this.usuario,
            this.senha,
            this.id
        ];

        let resultado = await dbQuery(sql,params);

        if (resultado)
        {
            return this;
        }

        return null;
    }

    public async save():Promise<Usuario|null>
    {
        if (this.id)
        {
            return await this.update();
        }

        return await this.insert();
    }

    public async delete():Promise<Usuario|null>
    {
        let sql = `DELETE FROM "usuarios" WHERE id = $1 RETURNING id;`;
        let resultado = await dbQuery(sql,[this.id]);

        if (resultado.length > 0 )
        {
            this.id = resultado[0].id;
            return this;
        }

        return null;
    }

    static async findOneById(id:number):Promise<Usuario|null>
    {
        let sql = `SELECT * FROM "usuarios"
        WHERE id = $1 LIMIT 1`;
        let resultado = await dbQuery(sql,[id]);

        if (resultado.length > 0)
        {
            let usuario = new Usuario();
            Object.assign(usuario,resultado[0]);
            return usuario;
        }

        return null;
    }

    static async listAll():Promise<Usuario[]>
    {
        let sql = `SELECT * FROM "usuarios" ORDER BY "id"`;

        let result = await dbQuery(sql);
        let usuarios : Usuario[] = [];

        for (let i = 0 ; i < result.length; i++)
        {
            let json = result[i];
            let usuario = new Usuario();
            Object.assign(usuario, json);
            usuarios.push(usuario);
        }

        return usuarios;
    }
}