async function listarClientes()
{
    let clientes = await myGet('/cliente')
    let html = '';
    console.log(clientes);

    for (let i=0; i < clientes.length; i++)
    {
        let cliente = clientes[i];

        if (!cliente)
        {
            continue;
        }

        let excluir = `<button onclick="excluirCliente(${cliente.id})">Excluir</button>`;
        let editar = `<button onclick="editarCliente(${cliente.id})">Editar</button>`;

        html += `
        <tr>
            <td>${cliente.id}</td>
            <td>${cliente.nome}</td>
            <td>${cliente.cpf}</td>
            <td>${cliente.email}</td>
            <td>${cliente.telefone}</td>
            <td>${cliente.cidade}</td>
            <td>${cliente.siglaUf}</td>
            <td>${excluir}</td>
            <td>${editar}</td>
        </tr>
        `;
    }

    document.getElementById('tbody-clientes').innerHTML = html;
}

async function gravarCliente()
{
    let id = pegarParametro('id');
    let method = id == null ? 'POST' : 'PUT';
    let url = id == null ? "/cliente" : "/cliente/"+id;

    let cliente = {
        "nome": document.getElementById('nome').value,
        "cpf": document.getElementById('cpf').value,
        "email": document.getElementById('email').value,
        "telefone": document.getElementById('telefone').value,
        "cidade": document.getElementById('cidade').value,
        "siglaUf": document.getElementById('siglaUf').value
    };

    let result = await myPost(url,method, cliente);
    console.log(result);

    if (result.nome)
    {
        alert("Cliente cadastrado com sucesso!");
        window.location = "cliente.html?id="+result.id
    }
    else
    {
        alert("Erro ao cadastrar cliente!");
    }
}

function pressEnter()
{
    if (event.key === 'Enter')
    {
        gravarCliente();
    } 
}

async function excluirCliente(id)
{
    if (confirm("Deseja realmente excluir?"))
    {
        let json = await myGet("/cliente/"+id, "DELETE");

        if (json.nome)
        {
            alert("Cliente excluído com sucesso!");
            window.location.reload();
        }
        else
        {
            alert("Problemas em excluir o cliente!");
        }
    }
}

async function editarCliente(id)
{
    window.location = "cliente.html?id="+id;
}

async function carregarCliente()
{
    let id = pegarParametro('id');


    if (id != null)
    {
        document.getElementById('pageTitle').innerHTML = 'Editar cliente';
        document.getElementById('labelTitle').innerHTML = 'Editar cliente ' + id + ' :';
        document.getElementById('paymentBtn').innerHTML = 'Editar cliente';
        document.getElementById('abrir-modal').innerHTML = 'Editar cliente';

        let result = await fetch(apiUrl+"/cliente/"+id);
        let cliente = await result.json();

        document.getElementById('nome').value = cliente.nome;
        document.getElementById('cpf').value = cliente.cpf;
        document.getElementById('email').value = cliente.email;
        document.getElementById('telefone').value = cliente.telefone;
        document.getElementById('cidade').value = cliente.cidade;
        setSelectValue('siglaUf', result.siglaUf);
    }
}

async function carregarEstados()
{
    const url = "https://brasilapi.com.br/api/ibge/uf/v1";
    let resultado = await fetch(url);
    let estados = await resultado.json();
    let html = '';
    
    for (let i=0; i<estados.length; i++)
    {
        let estado = estados[i];
        
        html += `<option value="${estado.sigla}">
            ${estado.nome}
            </option>`;
    }

    document.getElementById('siglaUf').innerHTML = html;
}