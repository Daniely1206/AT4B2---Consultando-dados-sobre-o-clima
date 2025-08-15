const cidadeInput = document.getElementById('city-input');
const botBusca = document.getElementById('search-btn');
const resultadoClima = document.getElementById('weather-result');
const cidadeNome = document.getElementById('city-name');
const tempoLocal = document.getElementById('local-time');
const climaIcone = document.getElementById('weather-icon');
const temperatura = document.getElementById('temperature');
const condicao = document.getElementById('condition');
const sensacao = document.getElementById('feels-like');
const umidade = document.getElementById('humidity');
const velocidadeVento = document.getElementById('wind-speed');
const pressao = document.getElementById('pressure');
const visibilidade = document.getElementById('visibility');
const uvIndex = document.getElementById('uv-index');
const messagemErro = document.getElementById('error-message');
const chaveAPI = '05593afd13d9427585a201822251308';

async function buscandoDados(cidade){
    try{
        const resposta = await fetch(`https://api.weatherapi.com/v1/current.json?key=${chaveAPI}&q=${cidade}&lang=pt`);
        const dados = await resposta.json();

        if(dados.erro){
            resultadoClima.classList.add('hidden');
            messagemErro.classList.remove('hidden');
            return;
        }

        exibirDados(dados);
    }catch(erro){
        alert("Erro!", erro);
        resultadoClima.classList.add('hidden');
        messagemErro.classList.remove('hidden');
    }
}

function exibirDados(dados){
    messagemErro.classList.add('hidden');
    resultadoClima.classList.remove('hidden');

    cidadeNome.textContent = `${dados.location.name}, ${dados.location.region}, ${dados.location.country}`;
    tempoLocal.textContent = `Horário local: ${dados.location.localtime}`;
    climaIcone.src = dados.current.condition.icon;
    climaIcone.alt = dados.current.condition.text;
    temperatura.textContent = `${dados.current.temp_c}°C`;
    condicao.textContent = dados.current.condition.text;
    sensacao.textContent = `${dados.current.feelslike_c}°C`;
    umidade.textContent = `${dados.current.humidity}%`;
    velocidadeVento.textContent = `${dados.current.wind_kph} km/h`;
    pressao.textContent = `${dados.current.pressure_mb} mb`;
    visibilidade.textContent = `${dados.current.vis_km} km`;
    uvIndex.textContent = dados.current.uv;
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
