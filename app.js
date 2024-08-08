//funcion para media query

const screen = {
    small : window.matchMedia('(max-width: 375px)'),
    medium : window.matchMedia('(max-width: 768px)'),
    large:window.matchMedia('(min-width: 769px)'),
}

//función de encriptado.

function encriptar() {

    let texto = document.querySelector("#texto").value;

    //este fragmento se encarga de verificar que si borramos el texto del area de texto y mandamos a encriptar o 
    //desencriptar el espacio vacio, nos avise que debemos ingresar algun texto en el área correspondiente. 

    if (texto.trim() === '') {
        mensajeError(true);
        return;
    }

    let textoCifrado = texto.replace(/e/gi, "enter")
                            .replace(/i/gi, "imes")
                            .replace(/a/gi, "ai")
                            .replace(/o/gi, "ober")
                            .replace(/u/gi, "ufat");
        
    if (texto.length != 0){        
        document.querySelector("#texto").value = textoCifrado;
        document.querySelector("#name").value = textoCifrado;
        document.getElementById("cajaPequena").style.display = "none";
        document.getElementById("imagenMunheco").style.display = "none"; 
        document.getElementById("cajaCopiar").style.display = "flex"; 
        document.getElementById("cajaCopiar").style.flexDirection = "column";  
    }else{
        mensajeError(indicadorSinDatos);
    }
}

//función de desencriptado.

function desencriptar() {

    let textoCifrado = document.querySelector("#texto").value;

    //este fragmento se encarga de verificar que si borramos el texto del area de texto y mandamos a encriptar o 
    //desencriptar el espacio vacio nos avise que debemos ingresar algun texto en el área correspondiente.

    if (textoCifrado.trim() === '') { 
        mensajeError(true);
        return;
    }

    let texto = textoCifrado.replace(/enter/gi, "e")
                            .replace(/imes/gi, "i")
                            .replace(/ai/gi, "a")
                            .replace(/ober/gi, "o")
                            .replace(/ufat/gi, "u");

    if (textoCifrado.length != 0){
        document.querySelector("#texto").value = texto;
        document.querySelector("#name").value = texto;
        document.getElementById("cajaPequena").style.display = "none";
        document.getElementById("imagenMunheco").style.display = "none"; 
        document.getElementById("cajaCopiar").style.display = "flex"; 
        document.getElementById("cajaCopiar").style.flexDirection = "column";          
    }else{
        mensajeError(indicadorSinDatos);
    }
}

//función que avisa si trato de encriptar o desencriptar sin agregar texto.

function mensajeError(valor){       
        alert("¡¡¡¡ Debes ingresar texto !!!!");

}

//Esta función permite copiar el texto cifrado o descifrado en el portapapeles.

function copiarTexto() {
    let input = document.querySelector("#name");
    console.log(input);
    input.select();
    input.setSelectionRange(0, 99999); // Para móviles

    navigator.clipboard.writeText(input.value)
        .then(() => {
            alert('Texto copiado al portapapeles');
        })
        .catch(err => {
            console.error('Error al copiar el texto: ', err);
        });
}

//este fragmento sincroniza el texto de entrada y salida en caso de borrar o hacer algún cambio.

document.addEventListener('DOMContentLoaded', (event) => {
    const inputText = document.getElementById('texto');
    const outputText = document.getElementById('name');
    const imagenMunheco = document.getElementById('imagenMunheco');

    // Función para ajustar la visibilidad del muñeco según el tamaño de la pantalla
    function ajustarVisibilidadMunheco() {
        if (screen.large.matches) {
            let textoCifrado = document.querySelector("#texto").value;
            if(textoCifrado.length > 0){
                imagenMunheco.style.display = 'none';
            }
            else{imagenMunheco.style.display = 'block';}
        } else {
            imagenMunheco.style.display = 'none';
        }
    }

    // Agregar un listener a los media queries para detectar cambios de tamaño de pantalla
    screen.small.addEventListener('change', ajustarVisibilidadMunheco);
    screen.medium.addEventListener('change', ajustarVisibilidadMunheco);
    screen.large.addEventListener('change', ajustarVisibilidadMunheco);

    // Llamar la función inicialmente para establecer el estado correcto
    ajustarVisibilidadMunheco();

    inputText.addEventListener('input', () => {
        outputText.value = inputText.value;

        // Si el texto en el campo de entrada se borra, también borra el texto en el campo de salida.
        if (inputText.value.trim() === '') {
            outputText.value = '';
            document.getElementById('texto').style.display = 'block';
            document.getElementById("cajaPequena").style.display = "block";
            document.getElementById('cajaCopiar').style.display = 'none';
            if(screen.large.matches){
                imagenMunheco.style.display = "block";
            }
        }
    });
});