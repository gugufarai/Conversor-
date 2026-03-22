const moeda1 = document.getElementById("moeda1");
const moeda2 = document.getElementById("moeda2");
const numero = document.getElementById("Numero");
const botao = document.querySelector(".converter");
const resultado = document.getElementById("resultado");

botao.addEventListener("click", converter);

function converter(){

    const de = moeda1.value.trim().toUpperCase();
    const para = moeda2.value.trim().toUpperCase();
    const valor = Number(numero.value);

    if(!de || !para || !valor){
        resultado.innerHTML = "Preencha todos os campos.";
        return;
    }

    fetch("https://api.exchangerate-api.com/v4/latest/" + de)
    .then(res => res.json())
    .then(data => {

        const taxa = data.rates[para];

        if(!taxa){
            resultado.innerHTML = "Moeda inválida.";
            return;
        }

        const convertido = valor * taxa;

        resultado.innerHTML =
        `${valor} ${de} = ${convertido.toFixed(2)} ${para}`;

    })
    .catch(() => {

        resultado.innerHTML = "Erro ao conectar à API.";

    });

}