async function listarAluguel()
{
    let result = await myGet('/aluguel')
    let html = '';
    console.log(result);

    for (let i=0; i < result.length; i++)
    {
        let aluguel = result[i];

        if (!aluguel)
        {
            continue;
        }

        let excluir = `<button onclick="excluirAluguel(${aluguel.id})">Excluir</button>`;
        let editar = `<button onclick="editarAluguel(${aluguel.id})">Editar</button>`;

        html += `
        <tr>
            <td>${aluguel.id}</td>
            <td>${aluguel.dataAluguel}</td>
            <td>${aluguel.horaAluguel}</td>
            <td>${aluguel.dataDevolucao}</td>
            <td>${aluguel.horaDevolucao}</td>
            <td style="text-align:right">${formatarReal(aluguel.valorTotal)}</td>
            <td>${excluir}</td>
            <td>${editar}</td>
        </tr>
        `;
    }

    document.getElementById('tbody-aluguel').innerHTML = html;
}

async function gravarAluguel()
{
    let id = pegarParametro('id');
    let method = id == null ? 'POST' : 'PUT';
    let url = id == null ? "/aluguel" : "/aluguel/"+id;

    let aluguel = {
        "dataAluguel": document.getElementById('dataAluguel').value,
        "horaAluguel": document.getElementById('horaAluguel').value,
        "dataDevolucao": document.getElementById('dataDevolucao').value,
        "horaDevolucao": document.getElementById('horaDevolucao').value,
        "valorTotal": parseFloat(document.getElementById('valorTotal').value.replace(',', '.'))
    };

    let result = await myPost(url,method, aluguel);
    console.log(result);

    if (result.dataAluguel)
    {
        alert("Aluguel cadastrado com sucesso!");
        window.location = "aluguel.html?id="+result.id
    }
    else
    {
        alert("Erro ao cadastrar aluguel!");
    }
}

function pressEnter()
{
    if (event.key === 'Enter')
    {
        gravarAluguel();
    } 
}

async function excluirAluguel(id)
{
    if (confirm("Deseja realmente excluir?"))
    {
        let json = await myGet("/aluguel/"+id, "DELETE");

        if (json.nome)
        {
            alert("Aluguel excluído com sucesso!");
            window.location.reload();
        }
        else
        {
            alert("Problemas em excluir o aluguel!");
        }
    }
}

async function editarAluguel(id)
{
    window.location = "aluguel.html?id="+id;
}

async function carregarAluguel()
{
    let id = pegarParametro('id');


    if (id != null)
    {
        document.getElementById('pageTitle').innerHTML = 'Editar aluguel';
        document.getElementById('labelTitle').innerHTML = 'Editar aluguel ' + id + ' :';
        document.getElementById('paymentBtn').innerHTML = 'Editar aluguel';

        let result = await fetch(apiUrl+"/aluguel/"+id);
        let aluguel = await result.json();

        document.getElementById('dataAluguel').value = aluguel.dataAluguel;
        document.getElementById('horaAluguel').value = aluguel.horaAluguel;
        document.getElementById('dataDevolucao').value = aluguel.dataDevolucao;
        document.getElementById('horaDevolucao').value = aluguel.horaDevolucao;
        document.getElementById('valorTotal').value = aluguel.valorTotal;
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