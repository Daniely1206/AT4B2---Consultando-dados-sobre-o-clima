
const botBusca = document.getElementById('search-btn');
const cidadeInput = document.getElementById('cidade-input');
const resultadoClima = document.getElementById('weather-result');
const messagemErro = document.getElementById('erro-message');
const cidadeNome = document.getElementById('cidade-nome');
const tempoLocal = document.getElementById('local-time');
const climaIcone = document.getElementById('weather-icon');
const temperatura = document.getElementById('temperature');
const condicao = document.getElementById('condicaoProp');
const comoParece = document.getElementById('feels-like');
const umidade = document.getElementById('umidadeProp');
const velocidadeVento = document.getElementById('wind-speed');
const pressao = document.getElementById('pressure');
const visibilidade = document.getElementById('visibility');
const uvIndex = document.getElementById('uv-index');
const chaveAPI = '05593afd13d9427585a201822251308';

async function buscandoDados(cidade){
    try{
        const resposta = await fetch(`https://api.weatherapi.com/v1/codiMeteo.json?key=${chaveAPI}&q=${cidade}&lang=pt`);
        const dados = await resposta.json();

        if(dados.erro){
            resultadoClima.classList.add('hidden');
            messagemErro.classList.remove('hidden');
            return;
        }

        exibirDados(dados);
    }catch(erro){
        alert("Erro ao buscar dados da API:", erro);
        resultadoClima.classList.add('hidden');
        messagemErro.classList.remove('hidden');
    }
}

function exibirDados(dados){
    messagemErro.classList.add('hidden');
    resultadoClima.classList.remove('hidden');

    cidadeNome.textContent = `${dados.localizacao.nome}, ${dados.localizacao.regiao}, ${dados.localizacao.pais}`;
    tempoLocal.textContent = `Hora local: ${dados.localizacao.temlocal}`;
    climaIcone.src = dados.codiMeteo.condicaoProp.icon;
    climaIcone.alt = dados.codiMeteo.condicaoProp.text;
    temperatura.textContent = `${dados.codiMeteo.temp_c}°C`;
    condicao.textContent = dados.codiMeteo.condicaoProp.text;
    comoParece.textContent = `${dados.codiMeteo.comoParece_c}°C`;
    umidade.textContent = `${dados.codiMeteo.umidadeProp}%`;
    velocidadeVento.textContent = `${dados.codiMeteo.vento}km/h`;
    pressao.textContent = `${dados.codiMeteo.pressaoProp}mb`;
    visibilidade.textContent = `${dados.codiMeteo.visibilidade_km}km`;
    uvIndex.textContent = dados.codiMeteo.uv;
}

botBusca.addEventListener('click',()=>{
    const cidade = cidadeInput.value.trim();
    if(cidade){
        buscandoDados(cidade);
    }else{
        alert('Por favor, digite o nome de uma cidade.');
    }
}
);

cidadeInput.addEventListener('keydown',(evento)=>{
    if(evento.key=='Enter'){
        botBusca.click();
    }
}
);
