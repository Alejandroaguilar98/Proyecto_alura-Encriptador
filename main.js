// EVENTOS DEL DOCUMENTO
// document.addEventListener('DOMContentLoaded', () => )


// INPUTS
const btnEncriptar = document.getElementById('boton__encriptar');
const btnDesencriptar = document.getElementById('boton__desencriptar');
const textIngreso = document.getElementById('contenedor__teaxtarea-ingreso');

// OUTPUTS
const btnCopiar = document.getElementById('copiar__textarea');
const textSalida = document.getElementById('texto__salida');
const contSalidaInicial = document.getElementById('mensaje__salida-inicial');
const contSalidaSecundario = document.getElementById('mensaje__salida-secundario');

// VARIABLES
const mayusculas = /[A-Z]/;
const minusculas = /[a-z]/;
var caracteresEspeciales = /[~!@#$%^&*()_+|}{[\]\\\/?><:"`;.,áéíóúÁÉÍÓÚ'1-9]/gm;

// VERIFICAR QUE EL CAMPO NO ESTE VACIO
function esCampoVacio() {
    if (textIngreso.value.length == 0) {
        return true;
    } else {
        return false;
    }
}
// VERIFICAR QUE EL CAMPO CONTENGA LETRAS
function hayLetras() {
    let min = minusculas.test(textIngreso.value);
    if(!min) {
        return false;
    } else {
        return true;
    }
}
// VERIFICAR SI HAY MAYUSCULAS
function verificarMayusculas() {
    let mayus = mayusculas.test(textIngreso.value);
    if(mayus) {
        return true;
    } else {
        return false;
    }
}
// VERIFICAR SI HAY CARACTERES ESPECIALES
function verificarCaracteres() {
    let caracter = caracteresEspeciales.test(textIngreso.value);
    if(caracter) {
        return true;
    } else {
        return false;
    }
}

// ENCRIPTAR MENSAJE 
function encriptarMensaje() {
    if(esCampoVacio() || !hayLetras() || verificarCaracteres() || verificarMayusculas()) {
        mensajeAlerta("error");
    } else {
        let nuevoTexto = textIngreso.value;
        nuevoTexto = nuevoTexto
            .replace(/e/gm, "enter")
            .replace(/i/gm, "imes")
            .replace(/a/gm, "ai")
            .replace(/o/gm, "ober")
            .replace(/u/gm, "ufat");
        textSalida.value = nuevoTexto;
        contSalidaSecundario.classList.add('active');
        contSalidaInicial.classList.remove('active');
        modificarTexarea()
    }
}
function desencriptarMensaje() {
    if(esCampoVacio() || !hayLetras() || verificarCaracteres() || verificarMayusculas()) {
        mensajeAlerta("error");
    } else {
        let nuevoTexto = textIngreso.value;
        nuevoTexto = nuevoTexto
            .replace(/enter/gm, "e")
            .replace(/imes/gm, "i")
            .replace(/ai/gm, "a")
            .replace(/ober/gm, "o")
            .replace(/ufat/gm, "u");
        textSalida.value = nuevoTexto;
        contSalidaSecundario.classList.add('active');
        contSalidaInicial.classList.remove('active');
        modificarTexarea()
    }
}
function mensajeAlerta(tipo) {
    if(tipo === "error") {
        swal({
            title: "Error",
            text: "No es posible hacer la traduccion, por favor intente modificando el texto",
            icon: "error",
            button: "ok",
            timer: 1500,
        });
    } else if(tipo === "copia") {
        swal({
            title: "Copiado",
            text: "El mensaje asdo copiado correctamente",
            icon: "success",
            button: "hecho",
            timer: 1500,
        });
    }
}
function cpTxtSalida() {
    navigator.clipboard.writeText(textSalida.value);
    textSalida.value = "";
    contSalidaSecundario.classList.remove('active');
    contSalidaInicial.classList.add('active');
    mensajeAlerta("copia");
}
function modificarTexarea() {
    let texto = textSalida.value;

    if(screen.width < 1050 && texto.length > 35) {
        textSalida.style.height = "150px";
    } else if (screen.width < 1050 && texto.length > 35) {
        textSalida.style.height = "200px";
    } else if (screen.width < 1050 && texto.length > 45) {
        textSalida.style.height = "250px";
    }
}

btnEncriptar.addEventListener("click", (e) => {
    e.preventDefault();
    encriptarMensaje();
});

btnDesencriptar.addEventListener("click", (e) => {
    e.preventDefault();
    desencriptarMensaje();
});

btnCopiar.addEventListener("click", (e) => {
    e.preventDefault();
    cpTxtSalida()
});