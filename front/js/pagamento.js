async function listarPagamento()
{
    let pagamentos = await myGet('/pagamento')
    let html = '';
    console.log(pagamentos);

    for (let i=0; i < pagamentos.length; i++)
    {
        let pagamento = pagamentos[i];

        if (!pagamento)
        {
            continue;
        }

        let excluir = `<button onclick="excluirPagamento(${pagamento.id})">Excluir</button>`;
        let editar = `<button onclick="editarPagamento(${pagamento.id})">Editar</button>`;

        html += `
        <tr>
            <td>${pagamento.id}</td>
            <td>${pagamento.nome}</td>
            <td>${excluir}</td>
            <td>${editar}</td>
        </tr>
        `;
    }

    document.getElementById('tbody-pagamentos').innerHTML = html;
}

async function gravarPagamento()
{
    let id = pegarParametro('id');
    let method = id == null ? 'POST' : 'PUT';
    let url = id == null ? "/pagamento" : "/pagamento/"+id;

    let pagamento = {
        "nome": document.getElementById('nome').value,
    };

    let result = await myPost(url,method, pagamento);
    console.log(result);

    if (result.nome)
    {
        alert("Meio de pagamento cadastrado com sucesso!");
        window.location = "pagamento.html?id="+result.id
    }
    else
    {
        alert("Erro ao cadastrar meio de pagamento!");
    }
}

function pressEnter()
{
    if (event.key === 'Enter')
    {
        gravarPagamento();
    } 
}

async function excluirPagamento(id)
{
    if (confirm("Deseja realmente excluir?"))
    {
        let json = await myGet("/pagamento/"+id, "DELETE");

        if (json.nome)
        {
            alert("Meio de pagamento excluído com sucesso!");
            window.location.reload();
        }
        else
        {
            alert("Problemas em excluir o meio de pagamento!");
        }
    }
}

async function editarPagamento(id)
{
    window.location = "pagamento.html?id="+id;
}

async function carregarPagamento()
{
    let id = pegarParametro('id');


    if (id != null)
    {
        document.getElementById('pageTitle').innerHTML = 'Editar pagamento';
        document.getElementById('labelTitle').innerHTML = 'Editar pagamento ' + id + ' :';
        document.getElementById('paymentBtn').innerHTML = 'Editar pagamento';

        let result = await fetch(apiUrl+"/pagamento/"+id);
        let pagamento = await result.json();

        document.getElementById('nome').value = pagamento.nome;
    }
}