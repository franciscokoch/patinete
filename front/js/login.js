let authorization = localStorage.getItem('Authorization');

async function verificaLogin()
{
    let resultado = await buscarLogin(authorization);

    if (!resultado)
    {
        window.location = 'login.html';
    }
}

async function buscarLogin(authorization2)
{
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append('Authorization', authorization2);
    console.log(authorization2);

    const options = {
        method: 'GET',
        headers: myHeaders
    };

    try
    {
        let result = await fetch(apiUrl+"/login", options);
        let resultado = await result.json();

        if (resultado.resultado == 'Login okay')
        {
            return true;
        }
    }
    catch (error)
    {
        return false;
    }

    return false;
}

async function login()
{
    let user = document.getElementById('login').value;
    let password = document.getElementById('senha').value;

    console.log('login='+user);
    console.log('senha='+password);

    let base64 = "Basic "+btoa(user+":"+password);
    console.log(base64);
    let resultado = await buscarLogin(base64);

    if (resultado)
    {
        
        localStorage.setItem("Authorization", base64);
        window.location = 'admin.html';
    }
    else
    {
        alert("Falha no login!");
    }
}