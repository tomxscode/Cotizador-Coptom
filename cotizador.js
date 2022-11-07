// Cotizador DOM
const 
    monto = document.querySelector("#monto"),
    titulo = document.querySelector("#tituloFormulario"),
    formularios = document.querySelectorAll("#formularioOpciones");
    siguienteBtn = document.querySelector("#siguienteBtn"),
    cotTexto = document.querySelector("#cotTexto")
    //datoOculto = document.querySelector("#inputOculto")
    ;

// precios
// formateos
let precioFormateo = 10000;

// Cotizador variables
let actual = "inicial";
let siguiente = null;
let montoParcial = 0;
let selecciono = false;
let seleccionada = 0;
let cotizacion = "";
// Oculta todos los formularios
for (let i = 0; i < formularios.length; i ++) {
    formularios[i].style.display = "none";
}

function reset() {
    monto.innerHTML = "$0";
    actual = "inicial";
    selecciono = false;
}

// OBSOLETO.
function mostrarFormulario(form) {
    switch (form) {
        case "inicial":
            // Reinicia las variables
            reset();
            // Establece título
            titulo.innerHTML = "Seleccione su servicio";
            formularios[0].style.display = "block";
            actual = "inicial";
            break;
        case "formateo1":
            titulo.innerHTML = "Seleccione el sistema operativo";
            formularios[0].style.display = "none";
            formularios[1].style.display = "block";
            actual = "formateo1";
        default:
            return 1;
    }
    actual = form;
}

function mostrarFormularioPorClase(clase) {
    formularios.forEach(e => {
        if (e.classList == clase) {
            e.style.display = "block";
        }
    });
    actual = clase;
}

function ocultarFormularioPorClase(clase) {
    formularios.forEach(e => {
        if (e.classList == clase) {
            e.style.display = "none";
        }
    });
}

// Eventos
siguienteBtn.addEventListener("click", function() {
    if (actual == "inicial") {
        let servicioActivo = document.querySelector('input[name="servicio"]:checked');
        if (servicioActivo) {
            switch (servicioActivo.value) {
                case "formateo":
                    montoParcial = precioFormateo;
                    mostrarFormularioPorClase("formateo1");
                    ocultarFormularioPorClase("inicial");
                    //cotizacion += "Formateo: $" + precioFormateo + "\n";
                    cotizacion += `Formateo: $${precioFormateo}\n`;
                    titulo.innerHTML = "Seleccione el sistema operativo (rec. Windows 10)";
                    break;
                case "mantencion":
                    break;
            }
        } else {
            alert("Debe seleccionar un servicio para continuar!");
        }
    } else if (actual == "formateo1") {
        let sisOpActivo = document.querySelector('input[name="sisOperativo"]:checked');
        if (sisOpActivo) {
            montoParcial += 5000;
            mostrarFormularioPorClase("formateo2");
            titulo.innerHTML = "Seleccione su software";
            ocultarFormularioPorClase("formateo1");
            cotizacion += `Sistema operativo ${sisOpActivo.value}: $5000\n`;
        } else {
            alert("Debe seleccionar un sistema operativo, si no sabe cual escoger seleccione Windows 10");
        }
    } else if (actual == "formateo2") {
        let softActivo = document.querySelector('input[name="software"]:checked');
        if (softActivo) {
            switch (softActivo.value) {
                case "basico":
                    montoParcial += 0;
                    cotizacion += "Plan de software básico: $0\n";
                    break;
                case "completo":
                    montoParcial += 3000;
                    cotizacion += "Plan de software completo: $3000\n";
                    break;
                case "custom":
                    montoParcial += 5000;
                    cotizacion += "Plan de software custom: $5000\n";
                    break;
            }
            mostrarFormularioPorClase("formateo3");
            titulo.innerHTML = "¿Necesita respaldo?";
            ocultarFormularioPorClase("formateo2");
        } else {
            alert("Debe seleccionar un plan de software");
        }
    } else if (actual == "formateo3") {
        let respaldoActivo = document.querySelector('input[name="respaldo"]:checked');
        if (respaldoActivo) {
            switch (respaldoActivo.value) {
                case "norespaldo":
                    montoParcial += 0;
                    cotizacion += "Sin respaldo\n";
                    break;
                case "men100":
                    montoParcial += 1000;
                    cotizacion += "Respaldo (menos de 100GB): $1.000\n";
                    break;
                case "mas100":
                    montoParcial += 3000;
                    cotizacion += "Respaldo (entre 100 y 500GB): $3.000\n";
                    break;
            }
            mostrarFormularioPorClase("final");
            titulo.innerHTML = "Pantalla final";
            ocultarFormularioPorClase("formateo3");
        } else {
            alert("Debe seleccionar si necesita respaldo o no");
        }
    } else if (actual == "final") {
        // Mostrar cotizacion actual
    }
    console.log(cotizacion)
    cotTexto.innerHTML = cotizacion;
    //datoOculto.innerHTML = cotizacion;
    monto.innerHTML = `$${montoParcial}`;
})

//datoOculto.value = "hola\ncomo\nestas";
mostrarFormularioPorClase("inicial");
reset();