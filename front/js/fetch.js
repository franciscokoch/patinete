const apiUrl = "http://localhost:3000";

function setSelectValue(id, inVal)
{
    let dl = document.getElementById(id);
    let el = 0;

    for (let i=0; i<dl.options.length; i++)
    {
        if (dl.options[i].value == inVal)
        {
            el=i;
            break;
        }
    }
    
    dl.selectedIndex = el;
}

function pegarParametro(parametro)
{
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    return urlParams.get(parametro)
}

async function myGet(url, method)
{ 
    const options = {
        method: method,
        redirect: "follow"
    };
    
    let result = await fetch(apiUrl+url, options);
    return await result.json();
}

async function myPost(url, method, jacson)
{
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const options = {
        method: method,
        body: JSON.stringify(jacson),
        headers: myHeaders,
        redirect: "follow"
    };

    let result = await fetch(apiUrl+url, options);
    return await result.json();
}

function formatarReal(valor)
{
    valor = valor.replace(',','');
    valor = valor.replace('.',',');
    return '<small>R$ </small>'+valor;
}

document.getElementById("openBtn").addEventListener("click", function ()
{
    document.getElementById("sidebar").classList.toggle("openSideBar");
});