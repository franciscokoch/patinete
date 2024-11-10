import { Cliente } from "../model/clientes";

async function clientesTest()
{
    let cliente = new Cliente();
    cliente.nome = "Kleber";
    cliente.cpf = "999.999.999-99";
    cliente.email = "kleber@gmail.com";
    cliente.telefone = "(55) 9999-9999";
    cliente.cidade = "Lajeado";
    cliente.siglaUf = "RS";
    await cliente.insert();

    console.log("INSERT com sucesso!");
}

clientesTest();