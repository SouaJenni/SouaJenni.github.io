var tela;

const colunas = 20;
const linhas = 20;

var contexto;

var comidaX;
var comidaY;

const tamanhoQuadradinho = 25;

var cobrinhaX = tamanhoQuadradinho * 5;
var cobrinhaY = tamanhoQuadradinho * 5;

var velocidadeX = 0;
var velocidadeY = 0;

var cobrinha = [];

var perdeu = false;

window.onload = function(){
    tela = document.getElementById("tela");
    tela.height = colunas * tamanhoQuadradinho;
    tela.width = linhas * tamanhoQuadradinho;
    contexto = tela.getContext("2d");

    colocarComida();
    document.addEventListener("keyup", controlarCobrinha);
    setInterval(atualizacao, 100);
}

function atualizacao(){
    if(perdeu){
        return;
    }
    contexto.fillStyle = "#027023";
    contexto.fillRect(0, 0, tela.width, tela.height);

    contexto.fillStyle = "red";
    contexto.fillRect(comidaX, comidaY, tamanhoQuadradinho, tamanhoQuadradinho);

    if(cobrinhaX == comidaX && cobrinhaY == comidaY){
        cobrinha.push([comidaX, comidaY]);
        colocarComida();
    }

    for(let i = cobrinha.length-1; i>0; i--){
        cobrinha[i] = cobrinha[i-1];
    }
    if(cobrinha.length){
        cobrinha[0] = [cobrinhaX, cobrinhaY];
    }

    contexto.fillStyle = "yellow";
    cobrinhaX += velocidadeX * tamanhoQuadradinho;
    cobrinhaY += velocidadeY * tamanhoQuadradinho;
    contexto.fillRect(cobrinhaX, cobrinhaY, tamanhoQuadradinho, tamanhoQuadradinho);
    for(let i = 0; i<cobrinha.length; i++){
        contexto.fillRect(cobrinha[i][0], cobrinha[i][1], tamanhoQuadradinho, tamanhoQuadradinho);
    }

    if(cobrinhaX < 0 || cobrinhaX > colunas * tamanhoQuadradinho || cobrinhaY < 0 || cobrinhaY > linhas * tamanhoQuadradinho){
        perdeu = true;
        alert("Você é ruim demais");
    }
    for(let i = 0; cobrinha.length; i++){
        if(cobrinhaX == cobrinha[i][0] && cobrinhaY == cobrinha[i][1]){
            perdeu = true;
            alert("Perdeu, esse é o lado errado!");
        }
    }
}

function colocarComida(){
    comidaX = Math.floor(Math.random() * colunas) * tamanhoQuadradinho;
    comidaY = Math.floor(Math.random() * linhas) * tamanhoQuadradinho;
}

function controlarCobrinha(evento){
    if(evento.code == "ArrowUp" && velocidadeY != 1){
        velocidadeX = 0;
        velocidadeY = -1;
    }else if(evento.code == "ArrowDown" && velocidadeY != -1){
        velocidadeX = 0;
        velocidadeY = 1;
    }else if(evento.code == "ArrowLeft" && velocidadeX != 1){
        velocidadeX = -1;
        velocidadeY = 0;
    }else if(evento.code == "ArrowRight" && velocidadeX != -1){
        velocidadeX = 1;
        velocidadeY = 0;
    }
}