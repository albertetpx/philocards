// import filosofos from './filosofos.js';

window.onload = () => {
    // Importación de filósofos
    // TBD: LocalStorage?
    // Crear tarjetas
    crearTarjetas(filosofos);
    // Crear handlers para los botones de control
    let botonesOrdenar = document.querySelectorAll('.sort-btn');
    botonesOrdenar[0].addEventListener('click', ordenarNombreAZ);
    botonesOrdenar[1].addEventListener('click', ordenarNombreZA);
    let botonCrearTarjeta = document.querySelector('.create-btn');
    botonCrearTarjeta.addEventListener('click',crearNuevaTarjeta);
    let botonGuardarTarjetas = document.querySelector('.save-btn');
    botonGuardarTarjetas.addEventListener('click',guardarTarjetas);
    let botonCargarTarjetas = document.querySelector('.load-btn');
    botonCargarTarjetas.addEventListener('click',cargarTarjetas);
}

function crearTarjetas(filosofos) {
    filosofos.forEach((filosofo) => {
        // Creamos tarjeta vacía
        let tarjeta = document.createElement('div');
        tarjeta.classList.add('card');
        // Creamos imagen
        let imagen = document.createElement('img');
        imagen.src = filosofo.imagen;
        imagen.alt = `Foto de ${filosofo.nombre}`;
        imagen.classList.add("photo");
        tarjeta.append(imagen);

        // Creamos caja de informacion
        let info = document.createElement('div');
        info.classList.add('card-info');
        tarjeta.append(info);
        // Creamos título
        let titulo = document.createElement('h3');
        titulo.classList.add('nombre');
        titulo.innerHTML = filosofo.nombre;
        info.append(titulo);
        // Creamos fila de información (info-row)
        let filaInfo = document.createElement('div');
        filaInfo.classList.add('info-row');
        info.append(filaInfo);

        // Añadimos info del país a filaInfo
        let cajaPais = document.createElement('div');
        cajaPais.classList.add('info-pais');
        filaInfo.append(cajaPais);
        let bandera = document.createElement('img');
        bandera.classList.add('bandera');
        bandera.src = filosofo.pais.bandera;
        bandera.alt = `Bandera de ${filosofo.pais.nombre}`;
        cajaPais.append(bandera);
        let pais = document.createElement('span');
        pais.classList.add('pais');
        pais.innerHTML = filosofo.pais.nombre;
        cajaPais.append(pais);
        // Añadimos info de la corriente a filaInfo
        let cajaCorriente = document.createElement('div');
        cajaCorriente.classList.add('info-corriente');
        filaInfo.append(cajaCorriente);
        let corrienteTitulo = document.createElement('span');
        corrienteTitulo.innerHTML = `Corriente: `;
        cajaCorriente.append(corrienteTitulo);
        let corriente = document.createElement('span');
        corriente.classList.add('corriente');
        corriente.innerHTML = filosofo.corriente;
        cajaCorriente.append(corriente);
        // Añadimos info del arma a filaInfo
        let cajaArma = document.createElement('div');
        cajaArma.classList.add('info-arma');
        filaInfo.append(cajaArma);
        let armaTitulo = document.createElement('span');
        armaTitulo.innerHTML = `Arma: `;
        cajaArma.append(armaTitulo);
        let arma = document.createElement('span');
        arma.classList.add('arma');
        arma.innerHTML = filosofo.arma;
        cajaArma.append(arma);

        // Añadimos caja de habilidades
        let habilidades = document.createElement('div');
        habilidades.classList.add('skills');
        info.append(habilidades);
        // Añadimos una a una las habilidades
        for (let infoHabilidad of filosofo.habilidades) {
            // Añadimos una caja de habilidad
            let cajaHabilidad = document.createElement('div');
            cajaHabilidad.classList.add('skill');
            habilidades.append(cajaHabilidad);
            // Añadimos contenido caja de habilidad
            // 1.Icono de habilidad
            let iconoHabilidad = document.createElement('img');
            iconoHabilidad.src = "https://via.placeholder.com/16";
            iconoHabilidad.alt = `Icono de ${infoHabilidad.habilidad}`;
            cajaHabilidad.append(iconoHabilidad);
            // 2.Etiqueta de habilidad
            let habilidad = document.createElement('span');
            habilidad.innerHTML = infoHabilidad.habilidad;
            habilidad.classList.add('skill-name');
            cajaHabilidad.append(habilidad);
            // 2.Barra de habilidad
            let barraHabilidad = document.createElement('div');
            barraHabilidad.classList.add('skill-bar');
            cajaHabilidad.append(barraHabilidad);
            let nivelHabilidad = document.createElement('div');
            nivelHabilidad.classList.add('level');
            nivelHabilidad.style.width = `${25 * infoHabilidad.nivel}%`;
            barraHabilidad.append(nivelHabilidad);
        }

        // Añadimos botón para eliminar tarjeta
        let botonEliminar = document.createElement('div');
        botonEliminar.classList.add('botonEliminar');
        botonEliminar.innerHTML = "&#x2716;";
        botonEliminar.addEventListener('click', eliminarTarjeta)
        tarjeta.append(botonEliminar);

        // Añadimos tarjeta creada al contenedor de tarjetas
        let contenedor = document.querySelector('.cards-container');
        contenedor.append(tarjeta);
    })
}

function eliminarTarjeta() {
    this.parentElement.remove();
}

function ordenarNombreAZ() {
    let tarjetas = Array.from(document.querySelectorAll('.card'));
    let tarjetasOrdenadas = tarjetas.sort((tarjetaA, tarjetaB) => {
        let nombre1 = tarjetaA.querySelector('h3').innerHTML;
        let nombre2 = tarjetaB.querySelector('h3').innerHTML;
        return nombre1.localeCompare(nombre2);
    });
    tarjetas.forEach((tarjeta) => {
        tarjeta.remove();
    })
    let contenedor = document.querySelector('.cards-container');
    for (let tarjeta of tarjetasOrdenadas) {
        contenedor.append(tarjeta);
    }
}

function ordenarNombreZA() {
    let tarjetas = Array.from(document.querySelectorAll('.card'));
    let tarjetasOrdenadas = tarjetas.sort((tarjetaA, tarjetaB) => {
        let nombre1 = tarjetaA.querySelector('h3').innerHTML;
        let nombre2 = tarjetaB.querySelector('h3').innerHTML;
        return nombre2.localeCompare(nombre1);
    });
    tarjetas.forEach((tarjeta) => {
        tarjeta.remove();
    })
    let contenedor = document.querySelector('.cards-container');
    for (let tarjeta of tarjetasOrdenadas) {
        contenedor.append(tarjeta);
    }
}

function crearNuevaTarjeta(event){
    event.preventDefault();
    let nuevoFilosofo = {};
    nuevoFilosofo.nombre = document.querySelector('.create-card-form .nombre').value;
    nuevoFilosofo.imagen = document.querySelector('.create-card-form .foto').value;
    nuevoFilosofo.pais = {};
    nuevoFilosofo.pais.nombre = document.querySelector('.create-card-form .pais').value;
    nuevoFilosofo.pais.bandera = document.querySelector('.create-card-form .bandera').value;
    nuevoFilosofo.corriente = document.querySelector('.create-card-form .corriente').value;
    nuevoFilosofo.arma = document.querySelector('.create-card-form .arma').value;
    nuevoFilosofo.habilidades = [];
    let sabiduria = {};
    sabiduria.habilidad = "Sabiduría"
    sabiduria.nivel = document.querySelector('.create-card-form #skill1').value;
    nuevoFilosofo.habilidades.push(sabiduria);
    let oratoria = {};
    oratoria.habilidad = "Oratoria"
    oratoria.nivel = document.querySelector('.create-card-form #skill2').value;
    nuevoFilosofo.habilidades.push(oratoria);
    let logica = {};
    logica.habilidad = "Lógica"
    logica.nivel = document.querySelector('.create-card-form #skill3').value;
    nuevoFilosofo.habilidades.push(logica);
    let innovacion = {};
    innovacion.habilidad = "Innovación"
    innovacion.nivel = document.querySelector('.create-card-form #skill4').value;
    nuevoFilosofo.habilidades.push(innovacion);

    let nuevosFilosofos = [];
    nuevosFilosofos.push(nuevoFilosofo);
    crearTarjetas(nuevosFilosofos);
}

function parsearTarjetas(tarjetas){
    let filosofosParseados = [];
    for (let tarjeta of tarjetas){
        let filosofo = {};
        filosofo.nombre = tarjeta.querySelector('.nombre').innerHTML;
        filosofo.imagen = tarjeta.querySelector('.photo').src;
        filosofo.pais = {};
        filosofo.pais.nombre = tarjeta.querySelector('.pais').innerHTML;
        filosofo.pais.bandera = tarjeta.querySelector('.bandera').src;
        filosofo.corriente = tarjeta.querySelector('.corriente').innerHTML;
        filosofo.arma = tarjeta.querySelector('.arma').innerHTML;
        filosofo.habilidades = [];
        let habilidades = tarjeta.querySelectorAll('.skill');
        for (let habilidad of habilidades){
            let habilidadParaGuardar = {};
            habilidadParaGuardar.habilidad = habilidad.querySelector('.skill-name').innerHTML;
            let level = habilidad.querySelector('.level').style.width;
            if(level == '0%') habilidadParaGuardar.nivel = 0;
            if(level == '25%') habilidadParaGuardar.nivel = 1;
            if(level == '50%') habilidadParaGuardar.nivel = 2;
            if(level == '75%') habilidadParaGuardar.nivel = 3;
            if(level == '100%') habilidadParaGuardar.nivel = 4;
            filosofo.habilidades.push(habilidadParaGuardar);
        }
        filosofosParseados.push(filosofo);
    }
    return filosofosParseados;
}

function guardarTarjetas(){
    let tarjetas = Array.from(document.querySelectorAll('.card'));
    localStorage.setItem('tarjetas',JSON.stringify(parsearTarjetas(tarjetas)));
}

function cargarTarjetas(){
    let filosofosParaCargar = JSON.parse(localStorage.getItem('tarjetas'));   
    crearTarjetas(filosofosParaCargar);
}

const filosofos = [
    {
        nombre: "Platón",
        imagen: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Plato_Pio-Clemetino_Inv305.jpg/1200px-Plato_Pio-Clemetino_Inv305.jpg",
        pais: {
            nombre: "Grecia",
            bandera: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Flag_of_Greece.svg/640px-Flag_of_Greece.svg.png"
        },
        corriente: "Idealismo",
        arma: "Dialéctica",
        habilidades: [{
            habilidad: "Sabiduría",
            nivel: 4
        },
        {
            habilidad: "Oratoria",
            nivel: 4
        },
        {
            habilidad: "Lógica",
            nivel: 3
        },
        {
            habilidad: "Innovación",
            nivel: 4
        }
        ]
    },
    {
        nombre: "Aristóteles",
        imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdXUwy_fFGOJ2vwOMpwtJPyXc9HVb06HSRsbembn7IPKq6D1YitIra2WFM4Gu2rm6yHRs&usqp=CAU",
        pais: {
            nombre: "Grecia",
            bandera: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Flag_of_Greece.svg/640px-Flag_of_Greece.svg.png"
        },
        corriente: "Naturalismo",
        arma: "Lógica",
        habilidades: [{
            habilidad: "Sabiduría",
            nivel: 4
        },
        {
            habilidad: "Oratoria",
            nivel: 3
        },
        {
            habilidad: "Lógica",
            nivel: 4
        },
        {
            habilidad: "Innovación",
            nivel: 3
        }
        ]
    },
    {
        nombre: "Descartes",
        imagen: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Frans_Hals_-_Portret_van_Ren%C3%A9_Descartes.jpg/800px-Frans_Hals_-_Portret_van_Ren%C3%A9_Descartes.jpg",
        pais: {
            nombre: "Francia",
            bandera: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Flag_of_France.svg/1280px-Flag_of_France.svg.png"
        },
        corriente: "Racionalismo",
        arma: "Meditación",
        habilidades: [{
            habilidad: "Sabiduría",
            nivel: 3
        },
        {
            habilidad: "Oratoria",
            nivel: 3
        },
        {
            habilidad: "Lógica",
            nivel: 2
        },
        {
            habilidad: "Innovación",
            nivel: 3
        }
        ]
    },
    {
        nombre: "Kant",
        imagen: "https://i.pinimg.com/736x/20/89/7f/20897f915acb5124893a278c395382ed.jpg",
        pais: {
            nombre: "Alemania",
            bandera: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Flag_of_Germany.svg/255px-Flag_of_Germany.svg.png"
        },
        corriente: "Trascendentalismo",
        arma: "Crítica",
        habilidades: [{
            habilidad: "Sabiduría",
            nivel: 3
        },
        {
            habilidad: "Oratoria",
            nivel: 2
        },
        {
            habilidad: "Lógica",
            nivel: 3
        },
        {
            habilidad: "Innovación",
            nivel: 3
        }
        ]
    },
    {
        nombre: "Hume",
        imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiFZYg2MiOQSXbkBvFP-T3vW9pnhLW5qDioA&s",
        pais: {
            nombre: "Escocia",
            bandera: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Flag_of_Scotland.svg/640px-Flag_of_Scotland.svg.png"
        },
        corriente: "Empirismo",
        arma: "Escepticismo",
        habilidades: [{
            habilidad: "Sabiduría",
            nivel: 3
        },
        {
            habilidad: "Oratoria",
            nivel: 3
        },
        {
            habilidad: "Lógica",
            nivel: 3
        },
        {
            habilidad: "Innovación",
            nivel: 3
        }
        ]
    },
    {
        nombre: "Arendt",
        imagen: "https://efeminista.com/wp-content/uploads/2021/09/Arendt-Hannah-1-e1576158475623.jpg",
        pais: {
            nombre: "Alemania",
            bandera: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Flag_of_Germany.svg/255px-Flag_of_Germany.svg.png"
        },
        corriente: "Fenomenología",
        arma: "Parresía",
        habilidades: [{
            habilidad: "Sabiduría",
            nivel: 3
        },
        {
            habilidad: "Oratoria",
            nivel: 2
        },
        {
            habilidad: "Lógica",
            nivel: 2
        },
        {
            habilidad: "Innovación",
            nivel: 3
        }
        ]
    }
]