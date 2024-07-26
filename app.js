let numeroSecretoVariables = 0;
let contador = 0;
let numerosSorteados = [];

//podriamos pensar que hay algún problema si dejo el mismo nombre como acá con respecto al nombre de la
//varible de abajo que está en la función pero está variable es de tipo global y la de la función es de tipo bloque, pero aunque no afecte
//debemos de igual forma cambiar el nombre de alguna de las dos variables para evitar confusiones.
function asignarTextoElemento(elemento, texto) {
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML = texto;
    return;
}

function verificarIntento(){
    let numeroUsuario = parseInt(document.getElementById('valorUsuario').value);//debemos de especificar que dato queremos sacar de ese elemento cuando colocamos getelementbyid
    //en este caso el número que introducimo es un string entonces debemos de cambiarlo con parseint para que sea numerico y además podemos verificar el tipo de dato con consele.log(typeof(numeroUsuario))
    if (contador >= 3 && numeroUsuario != numeroSecretoVariables){
        asignarTextoElemento('p','Has llegado al número máximo de intentos');
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else if (numeroUsuario < numeroSecretoVariables) {
        asignarTextoElemento('p','El número secreto es mayor, intenta otra vez, te quedan ' + (3 - contador ) + ' intentos');
        }  else { if (numeroUsuario === numeroSecretoVariables){
            asignarTextoElemento('p','Acertaste el número secreto en '+ contador + ((contador === 1) ? ' intento' : ' intentos')); //Aquí hago uso del operador terniario "?" esto significando si es que se cumple eso y ":" significando else
            document.getElementById('reiniciar').removeAttribute('disabled');
        }       else
                 asignarTextoElemento('p', 'El número secreto es menor, te quedan ' + (3 - contador) + ' intentos');
    }
    contador++;
    if(numeroUsuario != numeroSecretoVariables){
        limpiarCampo()
    };
    return;
}

function limpiarCampo(){
    let valorCaja = document.querySelector('#valorUsuario');
    valorCaja.value = ''; 
    //podemos acortarlo, let valorCaja = document.querySelector('#valorUsuario').value = '';
}

function generarNumeroSecreto(){
    let numeroGenerado = Math.floor(Math.random()*10)+1; 
    console.log(numeroGenerado);
    console.log(numerosSorteados);

    if (numerosSorteados.includes(numeroGenerado)){
        return generarNumeroSecreto();
    } else {
        numerosSorteados.push(numeroGenerado);
        return numeroGenerado;
    }
}   //Para recordar unas cosas Math.floor es para que 
    //devuelva el número entero que se generó en Math.random porque recordemos que eso genera un número decimal de 0 a 1
    //y el +1 que coloque es básicamente un truquito para que inicie de 1 en vez de 0

function condicionesIniciales(){
    asignarTextoElemento('h1','Juego del número secreto');
    asignarTextoElemento('p', 'Ingrese un número del 1 al 10, por favor');
    numeroSecretoVariables = generarNumeroSecreto();
    contador = 1;
}

function reiniciarJuego(){
    //Here we have to do a lot of things only with the purpose to restart the game with the button "reiniciar juego"
    //1. Clean the box
    //2. Indicate game instructions
    //3. Generate the random number
    //4. Disable the new game button
    //5. Reset the number of tries
    limpiarCampo();
    condicionesIniciales();
    document.getElementById('reiniciar').setAttribute('disabled','true');
}

condicionesIniciales();
