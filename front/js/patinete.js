async function listarPatinetes()
{
    let patinetes = await myGet('/patinete')
    let html = '';
    console.log(patinetes);

    for (let i=0; i < patinetes.length; i++)
    {
        let patinete = patinetes[i];

        if (!patinete)
        {
            continue;
        }

        let excluir = `<button onclick="excluirPatinete(${patinete.id})">Excluir</button>`;
        let editar = `<button onclick="editarPatinete(${patinete.id})">Editar</button>`;

        html += `
        <tr>
            <td>${patinete.id}</td>
            <td>${patinete.cor}</td>
            <td>${patinete.marca}</td>
            <td>${patinete.modelo}</td>
            <td>${excluir}</td>
            <td>${editar}</td>
        </tr>
        `;
    }

    document.getElementById('tbody-patinetes').innerHTML = html;
}

async function gravarPatinete()
{
    let id = pegarParametro('id');
    let method = id == null ? 'POST' : 'PUT';
    let url = id == null ? "/patinete" : "/patinete/"+id;

    let patinete = {
        "cor": document.getElementById('cor').value,
        "marca": document.getElementById('marca').value,
        "modelo": document.getElementById('modelo').value
    };

    let result = await myPost(url,method, patinete);
    console.log(result);

    if (result.cor)
    {
        alert("Patinete cadastrado com sucesso!");
        window.location = "patinete.html?id="+result.id
    }
    else
    {
        alert("Erro ao cadastrar patinete!");
    }
}

function pressEnter()
{
    if (event.key === 'Enter')
    {
        gravarPatinete();
    } 
}

async function excluirPatinete(id)
{
    if (confirm("Deseja realmente excluir?"))
    {
        let json = await myGet("/patinete/"+id, "DELETE");

        if (json.nome)
        {
            alert("Patinete excluído com sucesso!");
            window.location.reload();
        }
        else
        {
            alert("Problemas em excluir o patinete!");
        }
    }
}

async function editarPatinete(id)
{
    window.location = "patinete.html?id="+id;
}

async function carregarPatinete()
{
    let id = pegarParametro('id');


    if (id != null)
    {
        document.getElementById('pageTitle').innerHTML = 'Editar patinete';
        document.getElementById('labelTitle').innerHTML = 'Editar patinete ' + id + ' :';
        document.getElementById('paymentBtn').innerHTML = 'Editar patinete';

        let result = await fetch(apiUrl+"/patinete/"+id);
        let patinete = await result.json();

        document.getElementById('cor').value = patinete.cor;
        document.getElementById('marca').value = patinete.marca;
        document.getElementById('modelo').value = patinete.modelo;
    }
}