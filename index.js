const axios = require('axios');
require('dotenv').config();

// Obter cidade da linha de comando
const cidade = process.argv[2];

if (!cidade) {
    console.error("Por favor, forneça o nome de uma cidade.");
    process.exit(1);
}

const apiKey = process.env.API_KEY;
const url = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&units=metric&lang=pt_br&appid=${apiKey}`;

// Consultar API e exibir resultados
axios.get(url)
    .then(response => {
        const dados = response.data;
        console.log(`Previsão do tempo para ${dados.name}:`);
        console.log(`Temperatura atual: ${dados.main.temp}°C`);
        console.log(`Condição climática: ${dados.weather[0].description}`);
        console.log(`Sensação térmica: ${dados.main.feels_like}°C`);
    })
    .catch(error => {
        if (error.response && error.response.status === 404) {
            console.error("Cidade não encontrada.");
        } else {
            console.error("Erro ao consultar a API:", error.message);
        }
    });
