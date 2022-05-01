/* const nome = prompt("Qual é seu nome?"); */

let modelo = "";
let gola = "";
let tecido = "";

let blusasEncomendadas = [];

function selecionaOpcao(el) {
    const pai = el.parentNode;
    const opcao = el.querySelector(".div-arredondada");
    if (pai.querySelector(".selecionado") !== null) {
        pai.querySelector(".selecionado").classList.remove("selecionado")
        opcao.classList.add("selecionado");
    } else {
        opcao.classList.add("selecionado");
    }
    alterarBotao();
}

function verificaSelecao() {
    if (document.querySelector(".modelo .selecionado") !== null && document.querySelector(".gola .selecionado") !== null && document.querySelector(".tecido .selecionado") !== null && document.querySelector(".link").value !== "") {
        return true;
    }
    return false;
}

function alterarBotao() {
    if (verificaSelecao()) {
        document.querySelector(".botao-pedido").classList.add("botao-selecionado");
    }
}

function tratarSucesso() {
    carregarEncomendadas();
    alert("Encomenda realizada com sucesso!");
}

function tratarErro() {
    alert("Ops, não conseguimos processar sua encomenda");
}

function enviarPedido() {
    const pai = document.querySelector(".modelo .opcao .selecionado").parentNode;
    const pai2 = document.querySelector(".gola .opcao .selecionado").parentNode;
    const pai3 = document.querySelector(".tecido .opcao .selecionado").parentNode;
    modelo = pai.querySelector("p").innerHTML;
    gola = pai2.querySelector("p").innerHTML;
    tecido = pai3.querySelector("p").innerHTML;

    alert(`Modelo: ${modelo}\nGola: ${gola}\nTecido: ${tecido}\nGostaria de confirmar o pedido?`)
    const imagem = document.querySelector(".link").value;
    const objeto = {
        "model": "t-shirt" | "long" | "top-tank",
        "neck": "v-neck" | "round" | "polo",
        "material": "silk" | "cotton" | "polyester",
        "image": imagem,
        "owner": nome,
        "author": nome
    }

    if (modelo === "T-shirt") {
        objeto.model = "t-shirt";
    } else if (modelo === "Camiseta") {
        objeto.model = "top-tank";
    } else if (modelo === "Manga longa") {
        objeto.model = "long"
    }

    if (gola === "Gola V") {
        objeto.neck = "v-neck";
    } else if (gola === "Gola redonda") {
        objeto.neck = "round";
    } else if (gola === "Gola polo") {
        objeto.neck = "polo"
    }

    if (tecido === "Seda") {
        objeto.material = "silk";
    } else if (tecido === "Algodão") {
        objeto.material = "cotton";
    } else if (tecido === "Poliéster") {
        objeto.material = "polyester"
    }

    const promise = axios.post("https://mock-api.driven.com.br/api/v4/shirts-api/shirts", objeto);
    promise.then(tratarSucesso);
    promise.catch(tratarErro);
}

function carregarEncomendadas() {
    let promise = axios.get("https://mock-api.driven.com.br/api/v4/shirts-api/shirts");
    promise.then(renderizarEncomendadas);
}

function renderizarEncomendadas(response) {
    const lista = document.querySelector(".pedidos");
    console.log(response);
    lista.innerHTML = '';
    for(let i = 0; i < 10; i++) {
        lista.innerHTML += `
        <div class="pedido">
                <img src="${response.data[i].image}" alt="Blusa ${i+1}">
                <p><strong>Criador:</strong> ${response.data[i].owner}</p>
            </div>
        `
    }
}

carregarEncomendadas();