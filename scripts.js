const nome = prompt("Qual é seu nome?");

function selecionaOpcao(el) {
    const pai = el.parentNode;
    const opcao = el.querySelector(".div-arredondada");
    if (pai.querySelector(".selecionado") !== null) {
        pai.querySelector(".selecionado").classList.remove("selecionado")
        opcao.classList.add("selecionado");
    } else {
        opcao.classList.add("selecionado");
    }
    verificaSelecao();
}

function verificaSelecao() {
    if (document.querySelector(".modelo .selecionado") !== null && document.querySelector(".gola .selecionado") !== null && document.querySelector(".tecido .selecionado") !== null && document.querySelector("link").value !== "") {
        return true;
    }
    return false;
}