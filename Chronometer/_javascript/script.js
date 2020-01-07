// Variáveis criadas a partir de TAGS HTML

var spanHMS = document.querySelector("#spanHMS"); // recebe a tag que vai exibibir as horas/minutos/segundos;
var spanC = document.querySelector("#spanC"); // recebe a tag que vai exibibir os centesimos;
var tclEspaco = document.querySelector("#tclEspaco"); // Recebe o Botão que zera o cronometro;
var tclEnter = document.querySelector("#tclEnter"); // Recebe o Botão que inicia / pausa o cronometro;

// ===========================================

// Variáveis auxiliares

var estadoCrono = false; 
var intervaloCrono;
var valCrono = 0;
var valHor = 0;
var valMin = 0;
var valSeg = 0;
var valCen = 0;

var tmpIni;
var guardaVal = 0; 


// ==============================================

inicio();

// Função Padrão de inicio de código

function inicio(){


tclEnter.addEventListener("click",MotorCrono);
tclEspaco.addEventListener("click",ZeraCrono);

window.addEventListener("keydown",verificaTecla);

MudaEstadoElemento(tclEspaco,true);


}

// ===================================

// Função que inicia e pausa o cronometro  

function MotorCrono(){

switch(estadoCrono){

    case true:
        window.clearInterval(intervaloCrono);
        guardaVal = valCrono;
        MudaTxt(tclEnter,"Resume");   
        estadoCrono = false; 
    break;

    default:
        tmpIni = new Date();
        intervaloCrono =  window.setInterval(IncrementaValCrono,100);
        MudaTxt(tclEnter,"Pause");
        estadoCrono = true; 
        
}    




MudaEstadoElemento(tclEspaco,estadoCrono);
RetiraFocoElemento(tclEnter);

}

// ==========================================

// Função que zera o cronometro 

function ZeraCrono(){


valCrono = 0;
guardaVal = 0;
atualizaCrono();
RetiraFocoElemento(tclEspaco);
MudaEstadoElemento(tclEspaco,true);
MudaTxt(tclEnter,"Start");   

}

// ===============================


// Função que incrementa o valor da variável valCrono

function IncrementaValCrono(){

var tmpAtual = new Date();

valCrono = guardaVal;


valCrono+= (tmpAtual - tmpIni);

atualizaCrono();

}

// =================================



// Função que atualiza o cronometro 

function atualizaCrono(){

var totTmp = valCrono;

valHor = AdicionaZero(Math.floor(totTmp / 3600000));
totTmp-= valHor * 3600000;
       
valMin = AdicionaZero(Math.floor(totTmp / 60000));
totTmp-= valMin * 60000;
       
valSeg = AdicionaZero(Math.floor(totTmp / 1000));
totTmp-= valSeg * 1000;
       
valCen = AdicionaZero(Math.floor(totTmp / 100));



MudaTxt(spanHMS,valHor + ":" + valMin + ":" + valSeg + ":");
MudaTxt(spanC,valCen);

}

// ===========================================

// Função que verifica qual tecla foi pressionada 

function verificaTecla(ev){

var tcl = ev.keyCode;


switch(tcl){

    case 13:
        MotorCrono();
    break;

    case 32:
        if(!(estadoCrono))
            ZeraCrono();
    break;

}

}

// ==============================================



// Função que muda o atributo textContent de algun elemento HTML  

function MudaTxt(ele,txt){

ele.textContent = txt;     

}

// ============================================================

// Função que muda o estado 'disabled' de um elemento HTML

function MudaEstadoElemento(ele,estado){

ele.disabled = estado;

}

// ===========================================================

// Função que adiciona um ZERO ao núero Passado Como parâmetro 


function AdicionaZero(n){

if(n < 10)
    n = "0" + n;

return n;

}

// ============================================================

// Função que retira o foco de um elemento

function RetiraFocoElemento(e){

    e.blur();

}

// ==============================================================