	// Este array no se puede modificar.
    var posibilidades = ["piedra", "papel", "tijera"];
    

    // Pongo aqui los elementos del DOM que selecciono y utilizo
    var botonJugar = document.querySelector('button');
    var casillaNombre = document.querySelector('input[name="nombre"]');
    var casillaPartidas = document.querySelector('input[name="partidas"]');
    var totalPartidas = document.getElementById('total');
    var jugadasActuales = document.getElementById('actual');
    var jugador = document.getElementById('jugador');
    var maquina = document.getElementById('maquina');
    var historial = document.getElementById('historial');
    var opcionesJugador = Array.from(jugador.querySelectorAll('img'));
    var opcionMaquina = maquina.querySelector('img');
    var botonYa = document.querySelector('h2 button');

    // Declaro e inicializo jugadaActual fuera del bloque del botón "¡YA!", debido a que quiero que sea accesible desde todo el codigo
    var jugadaActual = 1;

    // Establezco las imagenes iniciales del Jugador
    opcionesJugador.forEach((opcion, index) => {
        opcion.src = `img/${posibilidades[index]}Jugador.png`;
    });
	
	// Añado funcionalidad al hacer clic en el botón "JUGAR"
    botonJugar.addEventListener('click', function () {
        casillaNombre.classList.remove('fondoRojo');
        casillaPartidas.classList.remove('fondoRojo');

        var nombre = casillaNombre.value.trim();
        var numPartidas = parseInt(casillaPartidas.value);

        if (nombre.length <= 3 || !isNaN(nombre[0])) {
            casillaNombre.classList.add('fondoRojo');
        }

        if (numPartidas <= 0) {
            casillaPartidas.classList.add('fondoRojo');
        }

        if (nombre.length > 3 && isNaN(nombre[0]) && numPartidas > 0) {
            casillaNombre.disabled = true;
            casillaPartidas.disabled = true;
            totalPartidas.textContent = numPartidas;

            // Reiniciar el contador de jugadas al iniciar una nueva serie
            jugadaActual = 0;

            // Desactivar botón "¡YA!" si ya se ha jugado el número total de partidas
            if (jugadaActual >= numPartidas) {
                botonYa.disabled = true;
            }
        }
    });
	
    // Función para verificar el resultado de la jugada
    function verificarResultado(eleccionJugador, eleccionMaquina) {
        if (eleccionJugador === eleccionMaquina) {
            return 'Empate';
        }

        var indiceJugador = posibilidades.indexOf(eleccionJugador);
        var indiceMaquina = posibilidades.indexOf(eleccionMaquina);

        return indiceJugador === (indiceMaquina + 1) % posibilidades.length ? 'Ganaste' : 'Perdiste';
    }

    

    // Añado funcionalidad al hacer clic en el botón "¡YA!"
    botonYa.addEventListener('click', function () {
        var opcionSeleccionada = jugador.querySelector('.seleccionado');
        var eleccionJugador = posibilidades[opcionesJugador.indexOf(opcionSeleccionada)];

        if (eleccionJugador && jugadaActual <= parseInt(totalPartidas.textContent)) {
            var indiceMaquina = Math.floor(Math.random() * posibilidades.length);
            var eleccionMaquina = posibilidades[indiceMaquina];

            // Cambio la imagen de la máquina
            opcionMaquina.src = `img/${eleccionMaquina}Ordenador.png`;

            // Verifico el resultado de la jugada
            var resultado = verificarResultado(eleccionJugador, eleccionMaquina);

            // Muestro el resultado en el historial
            var resultadoLi = document.createElement('li');
            let resultadoTexto = '';

            if (resultado === 'Ganaste') {
                resultadoTexto = `Gana ${casillaNombre.value}`;
            } else if (resultado === 'Perdiste') {
                resultadoTexto = 'Gana la máquina';
            } else {
                resultadoTexto = 'Empate';
            }
			
			//Actualizo y muestro el historial con los resultados de las partidas
            resultadoLi.textContent = resultadoTexto;
            historial.appendChild(resultadoLi);

            // Incremento la partida actual después de mostrar el resultado
            jugadaActual++;

            // Actualizo el contenido del elemento span actual
            jugadasActuales.textContent = jugadaActual;

            // Desactivo el botón "¡YA!" después de completar todas las tiradas
            if (jugadaActual >= parseInt(totalPartidas.textContent)) {
                botonYa.disabled = true;
                opcionesJugador.forEach(opcion => {
                    opcion.disabled = true;
                });
            }
        }
    });

    // Añado funcionalidad para la selección del jugador
    opcionesJugador.forEach(opcion => {
        opcion.addEventListener('click', function () {
            opcionesJugador.forEach(o => {
                o.classList.remove('seleccionado');
                o.classList.add('noSeleccionado');
            });

            opcion.classList.add('seleccionado');
            opcion.classList.remove('noSeleccionado');
        });
    });

    // Añado funcionalidad al hacer clic en el botón "RESET"
    document.getElementsByTagName("button")[2].addEventListener("click", function () {
        // Muestro "Nueva partida" en el historial
        var nuevaPartidaLi = document.createElement('li');
        nuevaPartidaLi.textContent = 'Nueva partida';
        historial.appendChild(nuevaPartidaLi);

        // Restablezco el juego a su estado inicial
        casillaPartidas.value = '0';
        totalPartidas.textContent = '0';
        jugadasActuales.textContent = '0';

        // Conservo las imágenes del jugador y selecciono la primera imagen
        opcionesJugador.forEach(opcion => {
            opcion.classList.remove('seleccionado');
            opcion.classList.add('noSeleccionado');
        });

        opcionesJugador[0].classList.add('seleccionado');
        opcionesJugador[0].click();

        // Pongo la imagen de la máquina por defecto
        opcionMaquina.src = 'img/defecto.png';

        jugadaActual = 1;
        botonYa.disabled = false;

        // Habilito campos de nombre y partidas pero no restablezco el valor del campo nombre 
        casillaNombre.disabled = false;
        casillaPartidas.disabled = false;
    });

	