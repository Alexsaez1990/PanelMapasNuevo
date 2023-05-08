/*
Panel de control para cargar y mostrar diferentes capas en mapas para análisis y predicción de incendios

Creado por: Alejandro Sáez Subero
Sección Estudios y Proyectos
Conaf
Fecha: Enero-Febrero 2023
Actualización versión móvil: Abril 2023
*/
var map1 = L.map('mapa1');
map1.setMaxBounds([[-14, -79], [-14, -63], [-56, -79], [-56, -63], [-14, -79]]);
map1.fitBounds([[-14, -79], [-14, -63], [-56, -79], [-56, -63], [-14, -79]]);
var map2 = L.map('mapa2');
map2.setMaxBounds([[-14, -79], [-14, -63], [-56, -79], [-56, -63], [-14, -79]]);
map2.fitBounds([[-14, -79], [-14, -63], [-56, -79], [-56, -63], [-14, -79]]);
var map3 = L.map('mapa3');
map3.setMaxBounds([[-14, -79], [-14, -63], [-56, -79], [-56, -63], [-14, -79]]);
map3.fitBounds([[-14, -79], [-14, -63], [-56, -79], [-56, -63], [-14, -79]]);
var map4 = L.map('mapa4');
map4.setMaxBounds([[-14, -79], [-14, -63], [-56, -79], [-56, -63], [-14, -79]]);
map4.fitBounds([[-14, -79], [-14, -63], [-56, -79], [-56, -63], [-14, -79]]);
var map5 = L.map('mapa5');
map5.setMaxBounds([[-14, -79], [-14, -63], [-56, -79], [-56, -63], [-14, -79]]);
map5.fitBounds([[-14, -79], [-14, -63], [-56, -79], [-56, -63], [-14, -79]]);

let fechaCalendario = new Date();

// Variables para control de checkboxes marcados
const checkboxes = document.querySelectorAll('input[type="checkbox"]');
const limitCheck = 2;
let checkedCount = 0;

// PROYECCIÓN EPSG:4326
var proyeccion = new L.Proj.CRS('EPSG:4326', '+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs', {
    resolutions: [2048, 1024, 512, 256, 128, 64, 32, 16, 8, 4, 2, 1, 0.5],
});
var base = L.tileLayer('https://stamen-tiles.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}.png', {
    minZoom: 3,
    maxZoom: 18,
    crs: proyeccion,
    zoomControl: false,
    //attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    ext: 'png'
}); 
L.tileLayer('https://stamen-tiles.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}.png', {
    minZoom: 3,
    maxZoom: 18,
    crs: proyeccion,
    zoomControl: false,
    //attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    ext: 'png'
}).addTo(map1);
//map1.setZoom(4)
L.tileLayer('https://stamen-tiles.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}.png', {
    minZoom: 3,
    maxZoom: 18,
    crs: proyeccion,
    zoomControl: false,
    //attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    ext: 'png'
}).addTo(map2);
L.tileLayer('https://stamen-tiles.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}.png', {
    minZoom: 3,
    maxZoom: 18,
    crs: proyeccion,
    zoomControl: false,
    //attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    ext: 'png'
}).addTo(map3);
L.tileLayer('https://stamen-tiles.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}.png', {
    minZoom: 3,
    maxZoom: 18,
    crs: proyeccion,
    zoomControl: false,
    //attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    ext: 'png'
}).addTo(map4);
L.tileLayer('https://stamen-tiles.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}.png', {
    minZoom: 3,
    maxZoom: 18,
    crs: proyeccion,
    zoomControl: false,
    //attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    ext: 'png'
}).addTo(map5);

var Stadia_AlidadeSmoothDark = L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png', {
	maxZoom: 18,
  crs: proyeccion,
	//attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
});

var Stamen_Terrain = L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}{r}.{ext}', {
	//attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	crs: proyeccion,
  maxZoom: 18,
	ext: 'png'
});

var OpenStreetMap_Mapnik = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
	maxZoom: 18,
  crs: proyeccion,
	//attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

var Esri_WorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
  maxZoom: 18,
  crs: proyeccion,	
 // attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
});

//console.log("Tamaño: " + screen.width);
if (screen.width >= 712){
  map1.setZoom(5)
  map2.setZoom(5)
  map3.setZoom(5)
  map4.setZoom(5)
  map5.setZoom(5)
} else {
  map1.setZoom(4)
  map2.setZoom(4)
  map3.setZoom(4)
  map4.setZoom(4)
  map5.setZoom(4)
}


var capaBase = {"Capa blanca": base,
                "Capa oscura": Stadia_AlidadeSmoothDark,
                "Capa terreno": Stamen_Terrain,
                "Capa street": OpenStreetMap_Mapnik,
                "Capa Tierra": Esri_WorldImagery
}; //Aquí podemos definir varias capas base para alternar entre mostrar unas u otras

// Definimos la fecha actual y fecha máxima a permitir en el calendario selector
var fechaActual = new Date();
document.getElementById("abreCalendar").value = fechaActual.toJSON().slice(0,10);
document.getElementById("abreCalendar").max = fechaActual.toJSON().slice(0,10);
document.getElementById("abreCalendar_movil").value = fechaActual.toJSON().slice(0,10);
document.getElementById("abreCalendar_movil").max = fechaActual.toJSON().slice(0,10);

// Coloco fecha inicial en los labels de cada mapa
fechaMapa();

//////////////////// Variables para GeoJSON

let arrayCapasBR = [];
let arrayCapasHCFM =[];
let arrayCapasHR = [];
let arrayCapasProbIgn = [];
let arrayCapasTemp = [];
let arrayCapasViento = [];

let arrayRutaBR = [];
let arrayRutaHCFM = [];
let arrayRutaHR = [];
let arrayRutaProbIgn = [];
let arrayRutaTemp = [];
let arrayRutaViento = [];

////////////////////

// Limpieza de checks y leyendas al seleccionar nueva fecha
function limpiaParaFecha() {             
  if(document.getElementById("cbx_br").checked) { // Comprueba si BR está checked para uncheck y eliminar capas y leyenda
    document.getElementById("cbx_br").checked = false;
    for (let i = 0; i<arrayCapasBR.length; i++) {
      arrayCapasBR[i].remove();
    }
    eliminarLeyendaBR();
  }
  if(document.getElementById("cbx_br_movil").checked) { // Comprueba si BR está checked para uncheck y eliminar capas y leyenda
    document.getElementById("cbx_br_movil").checked = false;
    for (let i = 0; i<arrayCapasBR.length; i++) {
      arrayCapasBR[i].remove();
    }
    eliminarLeyendaBR();
  }
  if(document.getElementById("cbx_hcfm").checked) { // Comprueba si HR está checked para uncheck y eliminar capas y leyenda
    document.getElementById("cbx_hcfm").checked = false;
    for (let i = 0; i<arrayCapasHCFM.length; i++) {
      arrayCapasHCFM[i].remove();
    }
    eliminarLeyendaHCFM();
  }
  if(document.getElementById("cbx_hcfm_movil").checked) { // Comprueba si HR está checked para uncheck y eliminar capas y leyenda
    document.getElementById("cbx_hcfm_movil").checked = false;
    for (let i = 0; i<arrayCapasHCFM.length; i++) {
      arrayCapasHCFM[i].remove();
    }
    eliminarLeyendaHCFM();
  }
  if(document.getElementById("cbx_hr").checked) { // Comprueba si HR está checked para uncheck y eliminar capas y leyenda
    document.getElementById("cbx_hr").checked = false;
    for (let i = 0; i<arrayCapasHR.length; i++) {
      arrayCapasHR[i].remove();
    }
    eliminarLeyendaHR();
  }
  if(document.getElementById("cbx_hr_movil").checked) { // Comprueba si HR está checked para uncheck y eliminar capas y leyenda
    document.getElementById("cbx_hr_movil").checked = false;
    for (let i = 0; i<arrayCapasHR.length; i++) {
      arrayCapasHR[i].remove();
    }
    eliminarLeyendaHR();
  }
  if(document.getElementById("cbx_probIgn").checked) { // Comprueba si ProbIgn está checked para uncheck y eliminar capas y leyenda
    document.getElementById("cbx_probIgn").checked = false;
    for (let i = 0; i<arrayCapasProbIgn.length; i++) {
      arrayCapasProbIgn[i].remove();
    }
    eliminarLeyendaProbIgnicion();
  }
  if(document.getElementById("cbx_probIgn_movil").checked) { // Comprueba si ProbIgn está checked para uncheck y eliminar capas y leyenda
    document.getElementById("cbx_probIgn_movil").checked = false;
    for (let i = 0; i<arrayCapasProbIgn.length; i++) {
      arrayCapasProbIgn[i].remove();
    }
    eliminarLeyendaProbIgnicion();
  }
  if(document.getElementById("cbx_temp").checked) { // Comprueba si Temp está checked para uncheck y eliminar capas y leyenda
    document.getElementById("cbx_temp").checked = false;
    for (let i = 0; i<arrayCapasTemp.length; i++) {
      arrayCapasTemp[i].remove();
    }
    eliminarLeyendaTemp();
  }
  if(document.getElementById("cbx_temp_movil").checked) { // Comprueba si Temp está checked para uncheck y eliminar capas y leyenda
    document.getElementById("cbx_temp_movil").checked = false;
    for (let i = 0; i<arrayCapasTemp.length; i++) {
      arrayCapasTemp[i].remove();
    }
    eliminarLeyendaTemp();
  }
  if(document.getElementById("cbx_viento").checked) { // Comprueba si VViento está checked para uncheck y eliminar capas y leyenda
    document.getElementById("cbx_viento").checked = false;
    for (let i = 0; i<arrayCapasViento.length; i++) {
      arrayCapasViento[i].remove();
    }
    eliminarLeyendaViento();
  }
  if(document.getElementById("cbx_viento_movil").checked) { // Comprueba si VViento está checked para uncheck y eliminar capas y leyenda
    document.getElementById("cbx_viento_movil").checked = false;
    for (let i = 0; i<arrayCapasViento.length; i++) {
      arrayCapasViento[i].remove();
    }
    eliminarLeyendaViento();
  }
}

/////////////////// Obtener los GeoJSON y agregarlos a sus capas

// Obtener la fecha de calendario y formatear
function obtenerFechasRequeridas() {
  try {
    var dateControl = document.querySelector('input[id="abreCalendar"]'); 
    let date = new Date(dateControl.value.replace(/-/g, '\/')); // Reemplazo guiones por barras para que convierta correctamente
    fechaCalendario = date;
    const arrayFechas = [formateaFechas(date), 
      formateaFechas(sumaDias(date, 1)), 
      formateaFechas(sumaDias(date, 2)),
      formateaFechas(sumaDias(date, 3)),
      formateaFechas(sumaDias(date, 4))
    ];
    //console.log("Muestro la fecha: " + arrayFechas[0])
    return arrayFechas;

  } catch (error) {
    console.log(error);
  }
}
function obtenerFechasRequeridas_movil() {
  try {
    var dateControl = document.querySelector('input[id="abreCalendar_movil"]'); 
    let date = new Date(dateControl.value.replace(/-/g, '\/')); // Reemplazo guiones por barras para que convierta correctamente
    fechaCalendario = date;
    const arrayFechas = [formateaFechas(date), 
      formateaFechas(sumaDias(date, 1)), 
      formateaFechas(sumaDias(date, 2)),
      formateaFechas(sumaDias(date, 3)),
      formateaFechas(sumaDias(date, 4))
    ];
    //console.log("Muestro la fecha: " + arrayFechas[0])
    return arrayFechas;

  } catch (error) {
    console.log(error);
  } 
}

// Función para agregar días a la fecha
function sumaDias(date, dias) {
  var res = new Date(date);
  res.setDate(res.getDate() + dias);
  return res;
}

// Función para formatear fecha al formato requerido para los docs
function formateaFechas(date) {
  let anioActual = date.getFullYear().toString();
  let mesActual = (date.getMonth() +1).toString();
  if (mesActual < 10) {
    mesActual = "0" + mesActual;
  }
  let diaActual = date.getDate().toString();
  if (diaActual < 10) {
    diaActual = "0" + diaActual;
  }
  return anioActual + mesActual + diaActual;
}

function fechaMapa() { // Fechas que se muestran en cada mapa. Hay que llamar en la carga de los mapas y cada vez que se cambie la fecha.
  var arrayFechas = obtenerFechasRequeridas();
  if(arrayFechas && arrayFechas.length == 5) {
    
    document.querySelector("#labelFecha1").innerHTML = arrayFechas[0].slice(6,8) + "/" + arrayFechas[0].slice(4,6) + "/" + arrayFechas[0].slice(0,4);
    document.querySelector("#labelFecha2").innerHTML = arrayFechas[1].slice(6,8) + "/" + arrayFechas[1].slice(4,6) + "/" + arrayFechas[1].slice(0,4);
    document.querySelector("#labelFecha3").innerHTML = arrayFechas[2].slice(6,8) + "/" + arrayFechas[2].slice(4,6) + "/" + arrayFechas[2].slice(0,4);
    document.querySelector("#labelFecha4").innerHTML = arrayFechas[3].slice(6,8) + "/" + arrayFechas[3].slice(4,6) + "/" + arrayFechas[3].slice(0,4);
    document.querySelector("#labelFecha5").innerHTML = arrayFechas[4].slice(6,8) + "/" + arrayFechas[4].slice(4,6) + "/" + arrayFechas[4].slice(0,4);
    //console.log(arrayFechas[0].slice(6,8) + "/" + arrayFechas[0].slice(4,6) + "/" + arrayFechas[0].slice(0,4));
  }
}

function fechaMapa_movil() { // Fechas que se muestran en cada mapa. Hay que llamar en la carga de los mapas y cada vez que se cambie la fecha.
  var arrayFechas = obtenerFechasRequeridas_movil();
  if(arrayFechas && arrayFechas.length == 5) {
    
    document.querySelector("#labelFecha1").innerHTML = arrayFechas[0].slice(6,8) + "/" + arrayFechas[0].slice(4,6) + "/" + arrayFechas[0].slice(0,4);
    document.querySelector("#labelFecha2").innerHTML = arrayFechas[1].slice(6,8) + "/" + arrayFechas[1].slice(4,6) + "/" + arrayFechas[1].slice(0,4);
    document.querySelector("#labelFecha3").innerHTML = arrayFechas[2].slice(6,8) + "/" + arrayFechas[2].slice(4,6) + "/" + arrayFechas[2].slice(0,4);
    document.querySelector("#labelFecha4").innerHTML = arrayFechas[3].slice(6,8) + "/" + arrayFechas[3].slice(4,6) + "/" + arrayFechas[3].slice(0,4);
    document.querySelector("#labelFecha5").innerHTML = arrayFechas[4].slice(6,8) + "/" + arrayFechas[4].slice(4,6) + "/" + arrayFechas[4].slice(0,4);
    //console.log(arrayFechas[0].slice(6,8) + "/" + arrayFechas[0].slice(4,6) + "/" + arrayFechas[0].slice(0,4));
  }
}

//////////////////////////////////////////////////

////////////////////// Agregar las capas de los GeoJSON a los controles LayerGroup

// Funciones para llamar a eventos de carga y descarga capas

function obtenerCapaBR() {
  arrayRutaBR = [];
  arrayCapasBR = [];
  let arrayFechas = obtenerFechasRequeridas(fechaCalendario);
  //let arrayCarpetas = [];
  if(arrayFechas && arrayFechas.length == 5) {

    for (let i = 0; i<arrayFechas.length; i++) {
      arrayRutaBR.push("../Pronostico/" + arrayFechas[i] + "_BR.geojson");
    }
    //console.log("ObtenerCapaBR: " + arrayFechas + "    " +  arrayRutaBR)
  }
  try { // Crear capa BR
    if (arrayRutaBR && arrayRutaBR.length == 5) {   
      for (let i = 0; i<arrayRutaBR.length; i++) {
        var br = new L.GeoJSON.AJAX(arrayRutaBR[i], {
          style: style_BR
        });
        arrayCapasBR.push(br); 
      }  
    }
  } catch (error) {
    console.log("Error creando Capas BR JSON: " + error);
  }
}
function obtenerCapaBR_movil() {
  arrayRutaBR = [];
  arrayCapasBR = [];
  let arrayFechas = obtenerFechasRequeridas_movil(fechaCalendario);
  //let arrayCarpetas = [];
  if(arrayFechas && arrayFechas.length == 5) {

    for (let i = 0; i<arrayFechas.length; i++) {
      arrayRutaBR.push("../Pronostico/" + arrayFechas[i] + "_BR.geojson");
    }
    console.log("ObtenerCapaBR: " + arrayFechas + "    " +  arrayRutaBR)
  }
  try { // Crear capa BR
    if (arrayRutaBR && arrayRutaBR.length == 5) {   
      for (let i = 0; i<arrayRutaBR.length; i++) {
        var br = new L.GeoJSON.AJAX(arrayRutaBR[i], {
          style: style_BR
        });
        arrayCapasBR.push(br); 
      }  
    }
  } catch (error) {
    console.log("Error creando Capas BR JSON: " + error);
  }
}
 // Cargamos la capa y controlamos que no haya más de dos capas cargadas previamente
function cargaBR() {
  if(validacionCheckbox()<=limitCheck) {
    let checkBR = document.getElementById("cbx_br")
    if (!checkBR.checked) {
      for (let i = 0; i<arrayCapasBR.length; i++) {
        arrayCapasBR[i].remove();
      }
      eliminarLeyendaBR();
    }
    try {
      if(document.getElementById("cbx_br").checked == true && arrayCapasBR) {
        obtenerCapaBR();
        arrayCapasBR[0].addTo(map1);
        arrayCapasBR[1].addTo(map2);
        arrayCapasBR[2].addTo(map3);
        arrayCapasBR[3].addTo(map4);
        arrayCapasBR[4].addTo(map5);
        //crearLeyendaBR(); // No se usa leyenda en BR por ahora
      } else {
        for (let i = 0; i<arrayCapasBR.length; i++) {
          arrayCapasBR[i].remove();
        }
        eliminarLeyendaBR();
      }
    } catch (error) {
      console.log(error);
    }
  } else {
    document.getElementById("cbx_br").checked = false;
  }
}
function cargaBR_movil() {
  if(validacionCheckbox()<=limitCheck) {
    let checkBR = document.getElementById("cbx_br_movil")
    if (!checkBR.checked) {
      for (let i = 0; i<arrayCapasBR.length; i++) {
        arrayCapasBR[i].remove();
      }
      eliminarLeyendaBR();
    }
    try {
      if(document.getElementById("cbx_br_movil").checked == true && arrayCapasBR) {
        obtenerCapaBR_movil();
        arrayCapasBR[0].addTo(map1);
        arrayCapasBR[1].addTo(map2);
        arrayCapasBR[2].addTo(map3);
        arrayCapasBR[3].addTo(map4);
        arrayCapasBR[4].addTo(map5);
        //crearLeyendaBR(); // No se usa leyenda en BR por ahora
      } else {
        for (let i = 0; i<arrayCapasBR.length; i++) {
          arrayCapasBR[i].remove();
        }
        //eliminarLeyendaBR();
      }
    } catch (error) {
      console.log(error);
    }
  } else {
    document.getElementById("cbx_br_movil").checked = false;
  }
}
// Crear leyenda de BR de forma dinámica           COMENTAR EL CÓDIGO
                                                // ver estilos
/*function crearLeyendaBR() {
  var divLeyendaBR = document.createElement("div");
  divLeyendaBR.classList.add("leyendaBR");

  document.querySelector('.leyenda').appendChild(divLeyendaBR);
  divLeyendaBR.setAttribute("id", "leyendaBR");

  var divLeyendaBR1 = document.createElement("div");
  var divLeyendaBR1Texto = document.createElement("div");
  divLeyendaBR1.classList.add("BR1");
  document.querySelector('.leyendaBR').appendChild(divLeyendaBR1);
  divLeyendaBR1Texto.textContent = " Texto 1";
  divLeyendaBR1Texto.classList.add("leyendaTexto");
  document.querySelector('.leyendaBR').appendChild(divLeyendaBR1Texto);
  document.querySelector('.leyendaBR').appendChild(document.createElement("br"));

  var divLeyendaBR2 = document.createElement("div");
  var divLeyendaBR2Texto = document.createElement("div");
  divLeyendaBR2.classList.add("BR2");
  document.querySelector('.leyendaBR').appendChild(divLeyendaBR2);
  divLeyendaBR2Texto.textContent = " Texto 2";
  divLeyendaBR2Texto.classList.add("leyendaTexto");
  document.querySelector('.leyendaBR').appendChild(divLeyendaBR2Texto);
  document.querySelector('.leyendaBR').appendChild(document.createElement("br"));

  var divLeyendaBR3 = document.createElement("div");
  var divLeyendaBR3Texto = document.createElement("div");
  divLeyendaBR3.classList.add("BR3");
  document.querySelector('.leyendaBR').appendChild(divLeyendaBR3);
  divLeyendaBR3Texto.textContent = " Texto 3";
  divLeyendaBR3Texto.classList.add("leyendaTexto");
  document.querySelector('.leyendaBR').appendChild(divLeyendaBR3Texto);
  document.querySelector('.leyendaBR').appendChild(document.createElement("br"));

  var divLeyendaBR4 = document.createElement("div");
  var divLeyendaBR4Texto = document.createElement("div");
  divLeyendaBR4.classList.add("BR4");
  document.querySelector('.leyendaBR').appendChild(divLeyendaBR4);
  divLeyendaBR4Texto.textContent = " Texto 4";
  divLeyendaBR4Texto.classList.add("leyendaTexto");
  document.querySelector('.leyendaBR').appendChild(divLeyendaBR4Texto);
  document.querySelector('.leyendaBR').appendChild(document.createElement("br"));

  var divLeyendaBR5 = document.createElement("div");
  var divLeyendaBR5Texto = document.createElement("div");
  divLeyendaBR5.classList.add("BR5");
  document.querySelector('.leyendaBR').appendChild(divLeyendaBR5);
  divLeyendaBR5Texto.textContent = " Texto 5";
  divLeyendaBR5Texto.classList.add("leyendaTexto");
  document.querySelector('.leyendaBR').appendChild(divLeyendaBR5Texto);
  document.querySelector('.leyendaBR').appendChild(document.createElement("br"));
}

function eliminarLeyendaBR(){
  try {
    console.log(document.getElementById('leyendaBR'))
    document.getElementById('leyendaBR').remove();
  } catch (error) {
    console.log(error);
  }
}*/

function obtenerCapaHCFM() {
  arrayRutaHCFM = [];
  arrayCapasHCFM = [];
  let arrayFechas = obtenerFechasRequeridas(fechaCalendario);
  //let arrayCarpetas = [];
  if(arrayFechas && arrayFechas.length == 5) {

    for (let i = 0; i<arrayFechas.length; i++) {
      arrayRutaHCFM.push("../Pronostico/" + arrayFechas[i] + "_HCFM.geojson");
    }
  }
  try { // Crear capa HCFM
    if (arrayRutaHCFM && arrayRutaHCFM.length == 5) {   
      for (let i = 0; i<arrayRutaHCFM.length; i++) {
        var hcfm = new L.GeoJSON.AJAX(arrayRutaHCFM[i], {
          style: style_HCFM
        });
        arrayCapasHCFM.push(hcfm); 
      }  
    }
  } catch (error) {
    console.log("Error creando Capas HCFM JSON: " + error);
  }
}
function obtenerCapaHCFM_movil() {
  arrayRutaHCFM = [];
  arrayCapasHCFM = [];
  let arrayFechas = obtenerFechasRequeridas_movil(fechaCalendario);
  //let arrayCarpetas = [];
  if(arrayFechas && arrayFechas.length == 5) {

    for (let i = 0; i<arrayFechas.length; i++) {
      arrayRutaHCFM.push("../Pronostico/" + arrayFechas[i] + "_HCFM.geojson");
    }
  }
  try { // Crear capa HCFM
    if (arrayRutaHCFM && arrayRutaHCFM.length == 5) {   
      for (let i = 0; i<arrayRutaHCFM.length; i++) {
        var hcfm = new L.GeoJSON.AJAX(arrayRutaHCFM[i], {
          style: style_HCFM
        });
        arrayCapasHCFM.push(hcfm); 
      }  
    }
  } catch (error) {
    console.log("Error creando Capas HCFM JSON: " + error);
  }
}

 // Cargamos la capa y controlamos que no haya más de dos capas cargadas previamente
function cargaHCFM() {
  if(validacionCheckbox()<=limitCheck) {
    let checkHCFM = document.getElementById("cbx_hcfm")
    if (!checkHCFM.checked) {
      for (let i = 0; i<arrayCapasHCFM.length; i++) {
        arrayCapasHCFM[i].remove();
      }
      eliminarLeyendaHCFM();
    }

    try { 
      if(document.getElementById("cbx_hcfm").checked == true && arrayCapasHCFM) {
        obtenerCapaHCFM();
        arrayCapasHCFM[0].addTo(map1);
        arrayCapasHCFM[1].addTo(map2);
        arrayCapasHCFM[2].addTo(map3);
        arrayCapasHCFM[3].addTo(map4);
        arrayCapasHCFM[4].addTo(map5);
        crearLeyendaHCFM();
      } else {
          for (let i = 0; i<arrayCapasHCFM.length; i++) {
            arrayCapasHCFM[i].remove();
          }
          eliminarLeyendaHCFM();
      }  
    } catch (error) {
      console.log(error);
    }
  }else {
    document.getElementById("cbx_hcfm").checked = false;
  }
}
function cargaHCFM_movil() {
  if(validacionCheckbox()<=limitCheck) {
    let checkHCFM = document.getElementById("cbx_hcfm_movil")
    if (!checkHCFM.checked) {
      for (let i = 0; i<arrayCapasHCFM.length; i++) {
        arrayCapasHCFM[i].remove();
      }
      eliminarLeyendaHCFM();
    }

    try { 
      if(document.getElementById("cbx_hcfm_movil").checked == true && arrayCapasHCFM) {
        obtenerCapaHCFM_movil();
        arrayCapasHCFM[0].addTo(map1);
        arrayCapasHCFM[1].addTo(map2);
        arrayCapasHCFM[2].addTo(map3);
        arrayCapasHCFM[3].addTo(map4);
        arrayCapasHCFM[4].addTo(map5);
        crearLeyendaHCFM_movil();
      } else {
          for (let i = 0; i<arrayCapasHCFM.length; i++) {
            arrayCapasHCFM[i].remove();
          }
          eliminarLeyendaHCFM();
      }  
    } catch (error) {
      console.log(error);
    }
  }else {
    document.getElementById("cbx_hcfm_movil").checked = false;
  }
}

function crearLeyendaHCFM() {
  var divLeyendaHCFM = document.createElement("div");
  divLeyendaHCFM.classList.add("leyendaHCFM");

  document.querySelector('.leyenda').appendChild(divLeyendaHCFM);
  divLeyendaHCFM.setAttribute("id", "leyendaHCFM");

  var divLeyendaHCFM1 = document.createElement("div");
  var divLeyendaHCFM1Texto = document.createElement("div");
  divLeyendaHCFM1.classList.add("HCFM1");
  document.querySelector('.leyendaHCFM').appendChild(divLeyendaHCFM1);
  divLeyendaHCFM1Texto.textContent = " 0 - 2%";
  divLeyendaHCFM1Texto.classList.add("leyendaTexto");
  document.querySelector('.leyendaHCFM').appendChild(divLeyendaHCFM1Texto);
  document.querySelector('.leyendaHCFM').appendChild(document.createElement("br"));

  var divLeyendaHCFM2 = document.createElement("div");
  var divLeyendaHCFM2Texto = document.createElement("div");
  divLeyendaHCFM2.classList.add("HCFM2");
  document.querySelector('.leyendaHCFM').appendChild(divLeyendaHCFM2);
  divLeyendaHCFM2Texto.textContent = " 2 - 4%";
  divLeyendaHCFM2Texto.classList.add("leyendaTexto");
  document.querySelector('.leyendaHCFM').appendChild(divLeyendaHCFM2Texto);
  document.querySelector('.leyendaHCFM').appendChild(document.createElement("br"));

  var divLeyendaHCFM3 = document.createElement("div");
  var divLeyendaHCFM3Texto = document.createElement("div");
  divLeyendaHCFM3.classList.add("HCFM3");
  document.querySelector('.leyendaHCFM').appendChild(divLeyendaHCFM3);
  divLeyendaHCFM3Texto.textContent = " 4 - 6%";
  divLeyendaHCFM3Texto.classList.add("leyendaTexto");
  document.querySelector('.leyendaHCFM').appendChild(divLeyendaHCFM3Texto);
  document.querySelector('.leyendaHCFM').appendChild(document.createElement("br"));

  var divLeyendaHCFM4 = document.createElement("div");
  var divLeyendaHCFM4Texto = document.createElement("div");
  divLeyendaHCFM4.classList.add("HCFM4");
  document.querySelector('.leyendaHCFM').appendChild(divLeyendaHCFM4);
  divLeyendaHCFM4Texto.textContent = " 6 - 8%";
  divLeyendaHCFM4Texto.classList.add("leyendaTexto");
  document.querySelector('.leyendaHCFM').appendChild(divLeyendaHCFM4Texto);
  document.querySelector('.leyendaHCFM').appendChild(document.createElement("br"));

  var divLeyendaHCFM5 = document.createElement("div");
  var divLeyendaHCFM5Texto = document.createElement("div");
  divLeyendaHCFM5.classList.add("HCFM5");
  document.querySelector('.leyendaHCFM').appendChild(divLeyendaHCFM5);
  divLeyendaHCFM5Texto.textContent = " 8 - 10%";
  divLeyendaHCFM5Texto.classList.add("leyendaTexto");
  document.querySelector('.leyendaHCFM').appendChild(divLeyendaHCFM5Texto);
  document.querySelector('.leyendaHCFM').appendChild(document.createElement("br"));

  var divLeyendaHCFM6 = document.createElement("div");
  var divLeyendaHCFM6Texto = document.createElement("div");
  divLeyendaHCFM6.classList.add("HCFM6");
  document.querySelector('.leyendaHCFM').appendChild(divLeyendaHCFM6);
  divLeyendaHCFM6Texto.textContent = " 10 - 12%";
  divLeyendaHCFM6Texto.classList.add("leyendaTexto");
  document.querySelector('.leyendaHCFM').appendChild(divLeyendaHCFM6Texto);
  document.querySelector('.leyendaHCFM').appendChild(document.createElement("br"));

  var divLeyendaHCFM7 = document.createElement("div");
  var divLeyendaHCFM7Texto = document.createElement("div");
  divLeyendaHCFM7.classList.add("HCFM7");
  document.querySelector('.leyendaHCFM').appendChild(divLeyendaHCFM7);
  divLeyendaHCFM7Texto.textContent = " 12 - 15%";
  divLeyendaHCFM7Texto.classList.add("leyendaTexto");
  document.querySelector('.leyendaHCFM').appendChild(divLeyendaHCFM7Texto);
  document.querySelector('.leyendaHCFM').appendChild(document.createElement("br"));

  var divLeyendaHCFM8 = document.createElement("div");
  var divLeyendaHCFM8Texto = document.createElement("div");
  divLeyendaHCFM8.classList.add("HCFM8");
  document.querySelector('.leyendaHCFM').appendChild(divLeyendaHCFM8);
  divLeyendaHCFM8Texto.textContent = " 15 - 20%";
  divLeyendaHCFM8Texto.classList.add("leyendaTexto");
  document.querySelector('.leyendaHCFM').appendChild(divLeyendaHCFM8Texto);
  document.querySelector('.leyendaHCFM').appendChild(document.createElement("br"));

  var divLeyendaHCFM9 = document.createElement("div");
  var divLeyendaHCFM9Texto = document.createElement("div");
  divLeyendaHCFM9.classList.add("HCFM9");
  document.querySelector('.leyendaHCFM').appendChild(divLeyendaHCFM9);
  divLeyendaHCFM9Texto.textContent = " 20 - 25%";
  divLeyendaHCFM9Texto.classList.add("leyendaTexto");
  document.querySelector('.leyendaHCFM').appendChild(divLeyendaHCFM9Texto);
  document.querySelector('.leyendaHCFM').appendChild(document.createElement("br"));

  var divLeyendaHCFM10 = document.createElement("div");
  var divLeyendaHCFM10Texto = document.createElement("div");
  divLeyendaHCFM10.classList.add("HCFM10");
  document.querySelector('.leyendaHCFM').appendChild(divLeyendaHCFM10);
  divLeyendaHCFM10Texto.textContent = " > 25%";
  divLeyendaHCFM10Texto.classList.add("leyendaTexto");
  document.querySelector('.leyendaHCFM').appendChild(divLeyendaHCFM10Texto);
  document.querySelector('.leyendaHCFM').appendChild(document.createElement("br"));
}

function crearLeyendaHCFM_movil() {
  var divLeyendaHCFM = document.createElement("div");
  divLeyendaHCFM.classList.add("leyendaHCFM");

  document.querySelector('.leyenda_movil').appendChild(divLeyendaHCFM);
  divLeyendaHCFM.setAttribute("id", "leyendaHCFM");

  var divLeyendaTituloHCFM = document.createElement("div");
  divLeyendaTituloHCFM.classList.add("HCFMLeyendaTitulo");
  divLeyendaTituloHCFM.textContent = " HCFM ";
  divLeyendaTituloHCFM.classList.add("leyendaTexto");
  document.querySelector('.leyendaHCFM').appendChild(divLeyendaTituloHCFM);
  document.querySelector('.leyendaHCFM').appendChild(document.createElement("br"));
  
  var divLeyendaHCFM0Texto = document.createElement("div");
  divLeyendaHCFM0Texto.textContent = " 0% ";
  divLeyendaHCFM0Texto.classList.add("leyendaTexto");
  document.querySelector('.leyendaHCFM').appendChild(divLeyendaHCFM0Texto);

  var divLeyendaHCFM1 = document.createElement("div");
  //var divLeyendaHCFM1Texto = document.createElement("div");
  divLeyendaHCFM1.classList.add("HCFM1");
  document.querySelector('.leyendaHCFM').appendChild(divLeyendaHCFM1);
  //divLeyendaHCFM1Texto.textContent = " 0 - 2%";
  //divLeyendaHCFM1Texto.classList.add("leyendaTexto");
  //document.querySelector('.leyendaHCFM').appendChild(divLeyendaHCFM1Texto);
  document.querySelector('.leyendaHCFM').appendChild(document.createElement("br"));

  var divLeyendaHCFM2 = document.createElement("div");
  //var divLeyendaHCFM2Texto = document.createElement("div");
  divLeyendaHCFM2.classList.add("HCFM2");
  document.querySelector('.leyendaHCFM').appendChild(divLeyendaHCFM2);
  //divLeyendaHCFM2Texto.textContent = " 2 - 4%";
  //divLeyendaHCFM2Texto.classList.add("leyendaTexto");
  //document.querySelector('.leyendaHCFM').appendChild(divLeyendaHCFM2Texto);
  document.querySelector('.leyendaHCFM').appendChild(document.createElement("br"));

  var divLeyendaHCFM3 = document.createElement("div");
  //var divLeyendaHCFM3Texto = document.createElement("div");
  divLeyendaHCFM3.classList.add("HCFM3");
  document.querySelector('.leyendaHCFM').appendChild(divLeyendaHCFM3);
  //divLeyendaHCFM3Texto.textContent = " 4 - 6%";
  //divLeyendaHCFM3Texto.classList.add("leyendaTexto");
  //document.querySelector('.leyendaHCFM').appendChild(divLeyendaHCFM3Texto);
  document.querySelector('.leyendaHCFM').appendChild(document.createElement("br"));

  var divLeyendaHCFM4 = document.createElement("div");
  //var divLeyendaHCFM4Texto = document.createElement("div");
  divLeyendaHCFM4.classList.add("HCFM4");
  document.querySelector('.leyendaHCFM').appendChild(divLeyendaHCFM4);
  //divLeyendaHCFM4Texto.textContent = " 6 - 8%";
  //divLeyendaHCFM4Texto.classList.add("leyendaTexto");
  //document.querySelector('.leyendaHCFM').appendChild(divLeyendaHCFM4Texto);
  document.querySelector('.leyendaHCFM').appendChild(document.createElement("br"));

  var divLeyendaHCFM5 = document.createElement("div");
  //var divLeyendaHCFM5Texto = document.createElement("div");
  divLeyendaHCFM5.classList.add("HCFM5");
  document.querySelector('.leyendaHCFM').appendChild(divLeyendaHCFM5);
  //divLeyendaHCFM5Texto.textContent = " 8 - 10%";
  //divLeyendaHCFM5Texto.classList.add("leyendaTexto");
  //document.querySelector('.leyendaHCFM').appendChild(divLeyendaHCFM5Texto);
  document.querySelector('.leyendaHCFM').appendChild(document.createElement("br"));

  var divLeyendaHCFM6 = document.createElement("div");
  //var divLeyendaHCFM6Texto = document.createElement("div");
  divLeyendaHCFM6.classList.add("HCFM6");
  document.querySelector('.leyendaHCFM').appendChild(divLeyendaHCFM6);
  //divLeyendaHCFM6Texto.textContent = " 10 - 12%";
  //divLeyendaHCFM6Texto.classList.add("leyendaTexto");
  //document.querySelector('.leyendaHCFM').appendChild(divLeyendaHCFM6Texto);
  document.querySelector('.leyendaHCFM').appendChild(document.createElement("br"));

  var divLeyendaHCFM7 = document.createElement("div");
  //var divLeyendaHCFM7Texto = document.createElement("div");
  divLeyendaHCFM7.classList.add("HCFM7");
  document.querySelector('.leyendaHCFM').appendChild(divLeyendaHCFM7);
  //divLeyendaHCFM7Texto.textContent = " 12 - 15%";
  //divLeyendaHCFM7Texto.classList.add("leyendaTexto");
  //document.querySelector('.leyendaHCFM').appendChild(divLeyendaHCFM7Texto);
  document.querySelector('.leyendaHCFM').appendChild(document.createElement("br"));

  var divLeyendaHCFM8 = document.createElement("div");
  //var divLeyendaHCFM8Texto = document.createElement("div");
  divLeyendaHCFM8.classList.add("HCFM8");
  document.querySelector('.leyendaHCFM').appendChild(divLeyendaHCFM8);
  //divLeyendaHCFM8Texto.textContent = " 15 - 20%";
  //divLeyendaHCFM8Texto.classList.add("leyendaTexto");
  //document.querySelector('.leyendaHCFM').appendChild(divLeyendaHCFM8Texto);
  document.querySelector('.leyendaHCFM').appendChild(document.createElement("br"));

  var divLeyendaHCFM9 = document.createElement("div");
  //var divLeyendaHCFM9Texto = document.createElement("div");
  divLeyendaHCFM9.classList.add("HCFM9");
  document.querySelector('.leyendaHCFM').appendChild(divLeyendaHCFM9);
  //divLeyendaHCFM9Texto.textContent = " 20 - 25%";
  //divLeyendaHCFM9Texto.classList.add("leyendaTexto");
  //document.querySelector('.leyendaHCFM').appendChild(divLeyendaHCFM9Texto);
  document.querySelector('.leyendaHCFM').appendChild(document.createElement("br"));

  var divLeyendaHCFM10 = document.createElement("div");
  //var divLeyendaHCFM10Texto = document.createElement("div");
  divLeyendaHCFM10.classList.add("HCFM10");
  document.querySelector('.leyendaHCFM').appendChild(divLeyendaHCFM10);
  //divLeyendaHCFM10Texto.textContent = " > 25%";
  //divLeyendaHCFM10Texto.classList.add("leyendaTexto");
  //document.querySelector('.leyendaHCFM').appendChild(divLeyendaHCFM10Texto);
  document.querySelector('.leyendaHCFM').appendChild(document.createElement("br"));


  var divLeyendaHCFM11Texto = document.createElement("div");
  divLeyendaHCFM11Texto.textContent = " >25%";
  divLeyendaHCFM11Texto.classList.add("leyendaTexto");
  document.querySelector('.leyendaHCFM').appendChild(divLeyendaHCFM11Texto);
}

function eliminarLeyendaHCFM(){
  try {
    document.getElementById('leyendaHCFM').remove();
  } catch (error) {
    console.log(error);
  }
}

function obtenerCapaHR() {
  arrayRutaHR = [];
  arrayCapasHR = [];
  let arrayFechas = obtenerFechasRequeridas(fechaCalendario);
  if(arrayFechas && arrayFechas.length == 5) {

    for (let i = 0; i<arrayFechas.length; i++) {
      arrayRutaHR.push("../Pronostico/" + arrayFechas[i] + "_HR.geojson");
    }
  }
  try { // Crear capa HR
    if (arrayRutaHR && arrayRutaHR.length == 5) {   
      for (let i = 0; i<arrayRutaHR.length; i++) {
        var hr = new L.GeoJSON.AJAX(arrayRutaHR[i], {
          style: style_HR
        });
        arrayCapasHR.push(hr); 
      }  
    }
  } catch (error) {
    console.log("Error creando Capas HR JSON: " + error);
  }
}
function obtenerCapaHR_movil() {
  arrayRutaHR = [];
  arrayCapasHR = [];
  let arrayFechas = obtenerFechasRequeridas_movil(fechaCalendario);
  if(arrayFechas && arrayFechas.length == 5) {

    for (let i = 0; i<arrayFechas.length; i++) {
      arrayRutaHR.push("../Pronostico/" + arrayFechas[i] + "_HR.geojson");
    }
  }
  try { // Crear capa HR
    if (arrayRutaHR && arrayRutaHR.length == 5) {   
      for (let i = 0; i<arrayRutaHR.length; i++) {
        var hr = new L.GeoJSON.AJAX(arrayRutaHR[i], {
          style: style_HR
        });
        arrayCapasHR.push(hr); 
      }  
    }
  } catch (error) {
    console.log("Error creando Capas HR JSON: " + error);
  }
}

function cargaHR() {
  if(validacionCheckbox() <= limitCheck) {
    let checkHR = document.getElementById("cbx_hr")
    if (!checkHR.checked) {
      for (let i = 0; i<arrayCapasHR.length; i++) {
        arrayCapasHR[i].remove();
      }
      eliminarLeyendaHR();
    }
    
    try {
      if(checkHR.checked == true && arrayCapasHR) {
        obtenerCapaHR();
        arrayCapasHR[0].addTo(map1);
        arrayCapasHR[1].addTo(map2);
        arrayCapasHR[2].addTo(map3);
        arrayCapasHR[3].addTo(map4);
        arrayCapasHR[4].addTo(map5);
        crearLeyendaHR();
      } else {
        for (let i = 0; i<arrayCapasHR.length; i++) {
          arrayCapasHR[i].remove();
        }
        eliminarLeyendaHR();
      }  
    } catch (error) {
      console.log(error);
    }
  }else {
    document.getElementById("cbx_hr").checked = false;
  } 
}
function cargaHR_movil() {
  if(validacionCheckbox() <= limitCheck) {
    let checkHR = document.getElementById("cbx_hr_movil")
    if (!checkHR.checked) {
      for (let i = 0; i<arrayCapasHR.length; i++) {
        arrayCapasHR[i].remove();
      }
      eliminarLeyendaHR();
    }
    
    try {
      if(checkHR.checked == true && arrayCapasHR) {
        obtenerCapaHR_movil();
        arrayCapasHR[0].addTo(map1);
        arrayCapasHR[1].addTo(map2);
        arrayCapasHR[2].addTo(map3);
        arrayCapasHR[3].addTo(map4);
        arrayCapasHR[4].addTo(map5);
        crearLeyendaHR_movil();
      } else {
        for (let i = 0; i<arrayCapasHR.length; i++) {
          arrayCapasHR[i].remove();
        }
        eliminarLeyendaHR();
      }  
    } catch (error) {
      console.log(error);
    }
  }else {
    document.getElementById("cbx_hr_movil").checked = false;
  } 
}

function crearLeyendaHR() {
  var divLeyendaHR = document.createElement("div");
  divLeyendaHR.classList.add("leyendaHR");

  document.querySelector('.leyenda').appendChild(divLeyendaHR);
  divLeyendaHR.setAttribute("id", "leyendaHR");

  var divLeyendaHR1 = document.createElement("div");
  var divLeyendaHR1Texto = document.createElement("div");
  divLeyendaHR1.classList.add("HR1");
  document.querySelector('.leyendaHR').appendChild(divLeyendaHR1);
  divLeyendaHR1Texto.textContent = " 0 - 10%";
  divLeyendaHR1Texto.classList.add("leyendaTexto");
  document.querySelector('.leyendaHR').appendChild(divLeyendaHR1Texto);
  document.querySelector('.leyendaHR').appendChild(document.createElement("br"));

  var divLeyendaHR2 = document.createElement("div");
  var divLeyendaHR2Texto = document.createElement("div");
  divLeyendaHR2.classList.add("HR2");
  document.querySelector('.leyendaHR').appendChild(divLeyendaHR2);
  divLeyendaHR2Texto.textContent = " 10 - 20%";
  divLeyendaHR2Texto.classList.add("leyendaTexto");
  document.querySelector('.leyendaHR').appendChild(divLeyendaHR2Texto);
  document.querySelector('.leyendaHR').appendChild(document.createElement("br"));

  var divLeyendaHR3 = document.createElement("div");
  var divLeyendaHR3Texto = document.createElement("div");
  divLeyendaHR3.classList.add("HR3");
  document.querySelector('.leyendaHR').appendChild(divLeyendaHR3);
  divLeyendaHR3Texto.textContent = " 20 - 30%";
  divLeyendaHR3Texto.classList.add("leyendaTexto");
  document.querySelector('.leyendaHR').appendChild(divLeyendaHR3Texto);
  document.querySelector('.leyendaHR').appendChild(document.createElement("br"));

  var divLeyendaHR4 = document.createElement("div");
  var divLeyendaHR4Texto = document.createElement("div");
  divLeyendaHR4.classList.add("HR4");
  document.querySelector('.leyendaHR').appendChild(divLeyendaHR4);
  divLeyendaHR4Texto.textContent = " 30 - 40%";
  divLeyendaHR4Texto.classList.add("leyendaTexto");
  document.querySelector('.leyendaHR').appendChild(divLeyendaHR4Texto);
  document.querySelector('.leyendaHR').appendChild(document.createElement("br"));

  var divLeyendaHR5 = document.createElement("div");
  var divLeyendaHR5Texto = document.createElement("div");
  divLeyendaHR5.classList.add("HR5");
  document.querySelector('.leyendaHR').appendChild(divLeyendaHR5);
  divLeyendaHR5Texto.textContent = " 40 - 50%";
  divLeyendaHR5Texto.classList.add("leyendaTexto");
  document.querySelector('.leyendaHR').appendChild(divLeyendaHR5Texto);
  document.querySelector('.leyendaHR').appendChild(document.createElement("br"));

  var divLeyendaHR6 = document.createElement("div");
  var divLeyendaHR6Texto = document.createElement("div");
  divLeyendaHR6.classList.add("HR6");
  document.querySelector('.leyendaHR').appendChild(divLeyendaHR6);
  divLeyendaHR6Texto.textContent = " 50 - 60%";
  divLeyendaHR6Texto.classList.add("leyendaTexto");
  document.querySelector('.leyendaHR').appendChild(divLeyendaHR6Texto);
  document.querySelector('.leyendaHR').appendChild(document.createElement("br"));

  var divLeyendaHR7 = document.createElement("div");
  var divLeyendaHR7Texto = document.createElement("div");
  divLeyendaHR7.classList.add("HR7");
  document.querySelector('.leyendaHR').appendChild(divLeyendaHR7);
  divLeyendaHR7Texto.textContent = " 60 - 70%";
  divLeyendaHR7Texto.classList.add("leyendaTexto");
  document.querySelector('.leyendaHR').appendChild(divLeyendaHR7Texto);
  document.querySelector('.leyendaHR').appendChild(document.createElement("br"));

  var divLeyendaHR8 = document.createElement("div");
  var divLeyendaHR8Texto = document.createElement("div");
  divLeyendaHR8.classList.add("HR8");
  document.querySelector('.leyendaHR').appendChild(divLeyendaHR8);
  divLeyendaHR8Texto.textContent = " 70 - 80%";
  divLeyendaHR8Texto.classList.add("leyendaTexto");
  document.querySelector('.leyendaHR').appendChild(divLeyendaHR8Texto);
  document.querySelector('.leyendaHR').appendChild(document.createElement("br"));

  var divLeyendaHR9 = document.createElement("div");
  var divLeyendaHR9Texto = document.createElement("div");
  divLeyendaHR9.classList.add("HR9");
  document.querySelector('.leyendaHR').appendChild(divLeyendaHR9);
  divLeyendaHR9Texto.textContent = " 80 - 90%";
  divLeyendaHR9Texto.classList.add("leyendaTexto");
  document.querySelector('.leyendaHR').appendChild(divLeyendaHR9Texto);
  document.querySelector('.leyendaHR').appendChild(document.createElement("br"));

  var divLeyendaHR10 = document.createElement("div");
  var divLeyendaHR10Texto = document.createElement("div");
  divLeyendaHR10.classList.add("HR10");
  document.querySelector('.leyendaHR').appendChild(divLeyendaHR10);
  divLeyendaHR10Texto.textContent = " 90 - 100%";
  divLeyendaHR10Texto.classList.add("leyendaTexto");
  document.querySelector('.leyendaHR').appendChild(divLeyendaHR10Texto);
  document.querySelector('.leyendaHR').appendChild(document.createElement("br"));
}
function crearLeyendaHR_movil() {
  var divLeyendaHR = document.createElement("div");
  divLeyendaHR.classList.add("leyendaHR");

  document.querySelector('.leyenda_movil').appendChild(divLeyendaHR);
  divLeyendaHR.setAttribute("id", "leyendaHR");

  var divLeyendaTituloHR = document.createElement("div");
  divLeyendaTituloHR.classList.add("HRLeyendaTitulo");
  divLeyendaTituloHR.textContent = " HR ";
  divLeyendaTituloHR.classList.add("leyendaTexto");
  document.querySelector('.leyendaHR').appendChild(divLeyendaTituloHR);
  document.querySelector('.leyendaHR').appendChild(document.createElement("br"));
  
  var divLeyendaHR0Texto = document.createElement("div");
  divLeyendaHR0Texto.textContent = " 0% ";
  divLeyendaHR0Texto.classList.add("leyendaTexto");
  document.querySelector('.leyendaHR').appendChild(divLeyendaHR0Texto);

  var divLeyendaHR1 = document.createElement("div");
  //var divLeyendaHR1Texto = document.createElement("div");
  divLeyendaHR1.classList.add("HR1");
  document.querySelector('.leyendaHR').appendChild(divLeyendaHR1);
  //divLeyendaHR1Texto.textContent = " 0 - 10%";
  //divLeyendaHR1Texto.classList.add("leyendaTexto");
  //document.querySelector('.leyendaHR').appendChild(divLeyendaHR1Texto);
  document.querySelector('.leyendaHR').appendChild(document.createElement("br"));

  var divLeyendaHR2 = document.createElement("div");
  //var divLeyendaHR2Texto = document.createElement("div");
  divLeyendaHR2.classList.add("HR2");
  document.querySelector('.leyendaHR').appendChild(divLeyendaHR2);
  //divLeyendaHR2Texto.textContent = " 10 - 20%";
  //divLeyendaHR2Texto.classList.add("leyendaTexto");
  //document.querySelector('.leyendaHR').appendChild(divLeyendaHR2Texto);
  document.querySelector('.leyendaHR').appendChild(document.createElement("br"));

  var divLeyendaHR3 = document.createElement("div");
  //var divLeyendaHR3Texto = document.createElement("div");
  divLeyendaHR3.classList.add("HR3");
  document.querySelector('.leyendaHR').appendChild(divLeyendaHR3);
  //divLeyendaHR3Texto.textContent = " 20 - 30%";
  //divLeyendaHR3Texto.classList.add("leyendaTexto");
  //document.querySelector('.leyendaHR').appendChild(divLeyendaHR3Texto);
  document.querySelector('.leyendaHR').appendChild(document.createElement("br"));

  var divLeyendaHR4 = document.createElement("div");
  //var divLeyendaHR4Texto = document.createElement("div");
  divLeyendaHR4.classList.add("HR4");
  document.querySelector('.leyendaHR').appendChild(divLeyendaHR4);
  //divLeyendaHR4Texto.textContent = " 30 - 40%";
  //divLeyendaHR4Texto.classList.add("leyendaTexto");
  //document.querySelector('.leyendaHR').appendChild(divLeyendaHR4Texto);
  document.querySelector('.leyendaHR').appendChild(document.createElement("br"));

  var divLeyendaHR5 = document.createElement("div");
  //var divLeyendaHR5Texto = document.createElement("div");
  divLeyendaHR5.classList.add("HR5");
  document.querySelector('.leyendaHR').appendChild(divLeyendaHR5);
  //divLeyendaHR5Texto.textContent = " 40 - 50%";
  //divLeyendaHR5Texto.classList.add("leyendaTexto");
  //document.querySelector('.leyendaHR').appendChild(divLeyendaHR5Texto);
  document.querySelector('.leyendaHR').appendChild(document.createElement("br"));

  var divLeyendaHR6 = document.createElement("div");
  //var divLeyendaHR6Texto = document.createElement("div");
  divLeyendaHR6.classList.add("HR6");
  document.querySelector('.leyendaHR').appendChild(divLeyendaHR6);
  //divLeyendaHR6Texto.textContent = " 50 - 60%";
  //divLeyendaHR6Texto.classList.add("leyendaTexto");
  //document.querySelector('.leyendaHR').appendChild(divLeyendaHR6Texto);
  document.querySelector('.leyendaHR').appendChild(document.createElement("br"));

  var divLeyendaHR7 = document.createElement("div");
  //var divLeyendaHR7Texto = document.createElement("div");
  divLeyendaHR7.classList.add("HR7");
  document.querySelector('.leyendaHR').appendChild(divLeyendaHR7);
  //divLeyendaHR7Texto.textContent = " 60 - 70%";
  //divLeyendaHR7Texto.classList.add("leyendaTexto");
  //document.querySelector('.leyendaHR').appendChild(divLeyendaHR7Texto);
  document.querySelector('.leyendaHR').appendChild(document.createElement("br"));

  var divLeyendaHR8 = document.createElement("div");
  //var divLeyendaHR8Texto = document.createElement("div");
  divLeyendaHR8.classList.add("HR8");
  document.querySelector('.leyendaHR').appendChild(divLeyendaHR8);
  //divLeyendaHR8Texto.textContent = " 70 - 80%";
  //divLeyendaHR8Texto.classList.add("leyendaTexto");
  //document.querySelector('.leyendaHR').appendChild(divLeyendaHR8Texto);
  document.querySelector('.leyendaHR').appendChild(document.createElement("br"));

  var divLeyendaHR9 = document.createElement("div");
  //var divLeyendaHR9Texto = document.createElement("div");
  divLeyendaHR9.classList.add("HR9");
  document.querySelector('.leyendaHR').appendChild(divLeyendaHR9);
  //divLeyendaHR9Texto.textContent = " 80 - 90%";
  //divLeyendaHR9Texto.classList.add("leyendaTexto");
  //document.querySelector('.leyendaHR').appendChild(divLeyendaHR9Texto);
  document.querySelector('.leyendaHR').appendChild(document.createElement("br"));

  var divLeyendaHR10 = document.createElement("div");
  //var divLeyendaHR10Texto = document.createElement("div");
  divLeyendaHR10.classList.add("HR10");
  document.querySelector('.leyendaHR').appendChild(divLeyendaHR10);
  //divLeyendaHR10Texto.textContent = " 90 - 100%";
  //divLeyendaHR10Texto.classList.add("leyendaTexto");
  //document.querySelector('.leyendaHR').appendChild(divLeyendaHR10Texto);
  document.querySelector('.leyendaHR').appendChild(document.createElement("br"));

  var divLeyendaHR11Texto = document.createElement("div");
  divLeyendaHR11Texto.textContent = " 100%";
  divLeyendaHR11Texto.classList.add("leyendaTexto");
  document.querySelector('.leyendaHR').appendChild(divLeyendaHR11Texto);
}

function eliminarLeyendaHR(){
  try {
    document.getElementById('leyendaHR').remove();
  } catch (error) {
    console.log(error);
  }
}

function obtenerCapaProbIgnicion() {
  arrayRutaProbIgn = [];
  arrayCapasProbIgn = [];
  let arrayFechas = obtenerFechasRequeridas(fechaCalendario);
  if(arrayFechas && arrayFechas.length == 5) {

    for (let i = 0; i<arrayFechas.length; i++) {
      arrayRutaProbIgn.push("../Pronostico/" + arrayFechas[i] + "_ProbIgnicion.geojson");
    }
  }
  try { // Crear capa ProbIgnicion
    if (arrayRutaProbIgn && arrayRutaProbIgn.length == 5) {   
      for (let i = 0; i<arrayRutaProbIgn.length; i++) {
        var probIgnicion = new L.GeoJSON.AJAX(arrayRutaProbIgn[i], {
          style: style_ProbIgnicion
        });
        arrayCapasProbIgn.push(probIgnicion); 
      }  
    }
  } catch (error) {
    console.log("Error creando Capas ProbIgn JSON: " + error);
  }
}
function obtenerCapaProbIgnicion_movil() {
  arrayRutaProbIgn = [];
  arrayCapasProbIgn = [];
  let arrayFechas = obtenerFechasRequeridas_movil(fechaCalendario);
  if(arrayFechas && arrayFechas.length == 5) {

    for (let i = 0; i<arrayFechas.length; i++) {
      arrayRutaProbIgn.push("../Pronostico/" + arrayFechas[i] + "_ProbIgnicion.geojson");
    }
  }
  try { // Crear capa ProbIgnicion
    if (arrayRutaProbIgn && arrayRutaProbIgn.length == 5) {   
      for (let i = 0; i<arrayRutaProbIgn.length; i++) {
        var probIgnicion = new L.GeoJSON.AJAX(arrayRutaProbIgn[i], {
          style: style_ProbIgnicion
        });
        arrayCapasProbIgn.push(probIgnicion); 
      }  
    }
  } catch (error) {
    console.log("Error creando Capas ProbIgn JSON: " + error);
  }
}

function cargaProbIgnicion() {
  if(validacionCheckbox() <= limitCheck) {
    let checkProbIgnicion = document.getElementById("cbx_probIgn")
    if (!checkProbIgnicion.checked) {
      for (let i = 0; i<arrayCapasProbIgn.length; i++) {
        arrayCapasProbIgn[i].remove();
      }
      eliminarLeyendaProbIgnicion();
    }
    
    try {
      if(document.getElementById("cbx_probIgn").checked == true && arrayCapasProbIgn) {
        obtenerCapaProbIgnicion();
        arrayCapasProbIgn[0].addTo(map1);
        arrayCapasProbIgn[1].addTo(map2);
        arrayCapasProbIgn[2].addTo(map3);
        arrayCapasProbIgn[3].addTo(map4);
        arrayCapasProbIgn[4].addTo(map5);
        crearLeyendaProbIgnicion();
      } else {
        for (let i = 0; i<arrayCapasProbIgn.length; i++) {
          arrayCapasProbIgn[i].remove();
        }
        eliminarLeyendaProbIgnicion();
      }  
    } catch (error) {
      console.log(error);
    }
  }else {
    document.getElementById("cbx_probIgn").checked = false;
  } 
}
function cargaProbIgnicion_movil() {
  if(validacionCheckbox() <= limitCheck) {
    let checkProbIgnicion = document.getElementById("cbx_probIgn_movil")
    if (!checkProbIgnicion.checked) {
      for (let i = 0; i<arrayCapasProbIgn.length; i++) {
        arrayCapasProbIgn[i].remove();
      }
      eliminarLeyendaProbIgnicion();
    }
    
    try {
      if(document.getElementById("cbx_probIgn_movil").checked == true && arrayCapasProbIgn) {
        obtenerCapaProbIgnicion_movil();
        arrayCapasProbIgn[0].addTo(map1);
        arrayCapasProbIgn[1].addTo(map2);
        arrayCapasProbIgn[2].addTo(map3);
        arrayCapasProbIgn[3].addTo(map4);
        arrayCapasProbIgn[4].addTo(map5);
        crearLeyendaProbIgnicion_movil();
      } else {
        for (let i = 0; i<arrayCapasProbIgn.length; i++) {
          arrayCapasProbIgn[i].remove();
        }
        eliminarLeyendaProbIgnicion();
      }  
    } catch (error) {
      console.log(error);
    }
  }else {
    document.getElementById("cbx_probIgn_movil").checked = false;
  }
}

function crearLeyendaProbIgnicion() {
  var divLeyendaProbIgnicion = document.createElement("div");
  divLeyendaProbIgnicion.classList.add("leyendaProbIgnicion");

  document.querySelector('.leyenda').appendChild(divLeyendaProbIgnicion);
  divLeyendaProbIgnicion.setAttribute("id", "leyendaProbIgnicion");

  var divLeyendaProbIgnicion1 = document.createElement("div");
  var divLeyendaProbIgnicion1Texto = document.createElement("div");
  divLeyendaProbIgnicion1.classList.add("ProbIgnicion1");
  document.querySelector('.leyendaProbIgnicion').appendChild(divLeyendaProbIgnicion1);
  divLeyendaProbIgnicion1Texto.textContent = " 0 - 10%";
  divLeyendaProbIgnicion1Texto.classList.add("leyendaTexto");
  document.querySelector('.leyendaProbIgnicion').appendChild(divLeyendaProbIgnicion1Texto);
  document.querySelector('.leyendaProbIgnicion').appendChild(document.createElement("br"));

  var divLeyendaProbIgnicion2 = document.createElement("div");
  var divLeyendaProbIgnicion2Texto = document.createElement("div");
  divLeyendaProbIgnicion2.classList.add("ProbIgnicion2");
  document.querySelector('.leyendaProbIgnicion').appendChild(divLeyendaProbIgnicion2);
  divLeyendaProbIgnicion2Texto.textContent = " 10 - 20%";
  divLeyendaProbIgnicion2Texto.classList.add("leyendaTexto");
  document.querySelector('.leyendaProbIgnicion').appendChild(divLeyendaProbIgnicion2Texto);
  document.querySelector('.leyendaProbIgnicion').appendChild(document.createElement("br"));

  var divLeyendaProbIgnicion3 = document.createElement("div");
  var divLeyendaProbIgnicion3Texto = document.createElement("div");
  divLeyendaProbIgnicion3.classList.add("ProbIgnicion3");
  document.querySelector('.leyendaProbIgnicion').appendChild(divLeyendaProbIgnicion3);
  divLeyendaProbIgnicion3Texto.textContent = " 20 - 30%";
  divLeyendaProbIgnicion3Texto.classList.add("leyendaTexto");
  document.querySelector('.leyendaProbIgnicion').appendChild(divLeyendaProbIgnicion3Texto);
  document.querySelector('.leyendaProbIgnicion').appendChild(document.createElement("br"));

  var divLeyendaProbIgnicion4 = document.createElement("div");
  var divLeyendaProbIgnicion4Texto = document.createElement("div");
  divLeyendaProbIgnicion4.classList.add("ProbIgnicion4");
  document.querySelector('.leyendaProbIgnicion').appendChild(divLeyendaProbIgnicion4);
  divLeyendaProbIgnicion4Texto.textContent = " 30 - 40%";
  divLeyendaProbIgnicion4Texto.classList.add("leyendaTexto");
  document.querySelector('.leyendaProbIgnicion').appendChild(divLeyendaProbIgnicion4Texto);
  document.querySelector('.leyendaProbIgnicion').appendChild(document.createElement("br"));

  var divLeyendaProbIgnicion5 = document.createElement("div");
  var divLeyendaProbIgnicion5Texto = document.createElement("div");
  divLeyendaProbIgnicion5.classList.add("ProbIgnicion5");
  document.querySelector('.leyendaProbIgnicion').appendChild(divLeyendaProbIgnicion5);
  divLeyendaProbIgnicion5Texto.textContent = " 40 - 50%";
  divLeyendaProbIgnicion5Texto.classList.add("leyendaTexto");
  document.querySelector('.leyendaProbIgnicion').appendChild(divLeyendaProbIgnicion5Texto);
  document.querySelector('.leyendaProbIgnicion').appendChild(document.createElement("br"));

  var divLeyendaProbIgnicion6 = document.createElement("div");
  var divLeyendaProbIgnicion6Texto = document.createElement("div");
  divLeyendaProbIgnicion6.classList.add("ProbIgnicion6");
  document.querySelector('.leyendaProbIgnicion').appendChild(divLeyendaProbIgnicion6);
  divLeyendaProbIgnicion6Texto.textContent = " 50 - 60%";
  divLeyendaProbIgnicion6Texto.classList.add("leyendaTexto");
  document.querySelector('.leyendaProbIgnicion').appendChild(divLeyendaProbIgnicion6Texto);
  document.querySelector('.leyendaProbIgnicion').appendChild(document.createElement("br"));

  var divLeyendaProbIgnicion7 = document.createElement("div");
  var divLeyendaProbIgnicion7Texto = document.createElement("div");
  divLeyendaProbIgnicion7.classList.add("ProbIgnicion7");
  document.querySelector('.leyendaProbIgnicion').appendChild(divLeyendaProbIgnicion7);
  divLeyendaProbIgnicion7Texto.textContent = " 60 - 70%";
  divLeyendaProbIgnicion7Texto.classList.add("leyendaTexto");
  document.querySelector('.leyendaProbIgnicion').appendChild(divLeyendaProbIgnicion7Texto);
  document.querySelector('.leyendaProbIgnicion').appendChild(document.createElement("br"));

  var divLeyendaProbIgnicion8 = document.createElement("div");
  var divLeyendaProbIgnicion8Texto = document.createElement("div");
  divLeyendaProbIgnicion8.classList.add("ProbIgnicion8");
  document.querySelector('.leyendaProbIgnicion').appendChild(divLeyendaProbIgnicion8);
  divLeyendaProbIgnicion8Texto.textContent = " 70 - 80%";
  divLeyendaProbIgnicion8Texto.classList.add("leyendaTexto");
  document.querySelector('.leyendaProbIgnicion').appendChild(divLeyendaProbIgnicion8Texto);
  document.querySelector('.leyendaProbIgnicion').appendChild(document.createElement("br"));

  var divLeyendaProbIgnicion9 = document.createElement("div");
  var divLeyendaProbIgnicion9Texto = document.createElement("div");
  divLeyendaProbIgnicion9.classList.add("ProbIgnicion9");
  document.querySelector('.leyendaProbIgnicion').appendChild(divLeyendaProbIgnicion9);
  divLeyendaProbIgnicion9Texto.textContent = " 80 - 90%";
  divLeyendaProbIgnicion9Texto.classList.add("leyendaTexto");
  document.querySelector('.leyendaProbIgnicion').appendChild(divLeyendaProbIgnicion9Texto);
  document.querySelector('.leyendaProbIgnicion').appendChild(document.createElement("br"));

  var divLeyendaProbIgnicion10 = document.createElement("div");
  var divLeyendaProbIgnicion10Texto = document.createElement("div");
  divLeyendaProbIgnicion10.classList.add("ProbIgnicion10");
  document.querySelector('.leyendaProbIgnicion').appendChild(divLeyendaProbIgnicion10);
  divLeyendaProbIgnicion10Texto.textContent = " 90 - 100%";
  divLeyendaProbIgnicion10Texto.classList.add("leyendaTexto");
  document.querySelector('.leyendaProbIgnicion').appendChild(divLeyendaProbIgnicion10Texto);
  document.querySelector('.leyendaProbIgnicion').appendChild(document.createElement("br"));
}
function crearLeyendaProbIgnicion_movil() {
  var divLeyendaProbIgnicion = document.createElement("div");
  divLeyendaProbIgnicion.classList.add("leyendaProbIgnicion");

  document.querySelector('.leyenda_movil').appendChild(divLeyendaProbIgnicion);
  divLeyendaProbIgnicion.setAttribute("id", "leyendaProbIgnicion");

  var divLeyendaTituloProbIgnicion = document.createElement("div");
  divLeyendaTituloProbIgnicion.classList.add("ProbIgnicionLeyendaTitulo");
  divLeyendaTituloProbIgnicion.textContent = " Prob. Ignición ";
  divLeyendaTituloProbIgnicion.classList.add("leyendaTexto");
  document.querySelector('.leyendaProbIgnicion').appendChild(divLeyendaTituloProbIgnicion);
  document.querySelector('.leyendaProbIgnicion').appendChild(document.createElement("br"));
  
  var divLeyendaProbIgnicion0Texto = document.createElement("div");
  divLeyendaProbIgnicion0Texto.textContent = " 0% ";
  divLeyendaProbIgnicion0Texto.classList.add("leyendaTexto");
  document.querySelector('.leyendaProbIgnicion').appendChild(divLeyendaProbIgnicion0Texto);

  var divLeyendaProbIgnicion1 = document.createElement("div");
  //var divLeyendaProbIgnicion1Texto = document.createElement("div");
  divLeyendaProbIgnicion1.classList.add("ProbIgnicion1");
  document.querySelector('.leyendaProbIgnicion').appendChild(divLeyendaProbIgnicion1);
  //divLeyendaProbIgnicion1Texto.textContent = " 0 - 10%";
  //divLeyendaProbIgnicion1Texto.classList.add("leyendaTexto");
  //document.querySelector('.leyendaProbIgnicion').appendChild(divLeyendaProbIgnicion1Texto);
  document.querySelector('.leyendaProbIgnicion').appendChild(document.createElement("br"));

  var divLeyendaProbIgnicion2 = document.createElement("div");
  //var divLeyendaProbIgnicion2Texto = document.createElement("div");
  divLeyendaProbIgnicion2.classList.add("ProbIgnicion2");
  document.querySelector('.leyendaProbIgnicion').appendChild(divLeyendaProbIgnicion2);
  //divLeyendaProbIgnicion2Texto.textContent = " 10 - 20%";
  //divLeyendaProbIgnicion2Texto.classList.add("leyendaTexto");
  //document.querySelector('.leyendaProbIgnicion').appendChild(divLeyendaProbIgnicion2Texto);
  document.querySelector('.leyendaProbIgnicion').appendChild(document.createElement("br"));

  var divLeyendaProbIgnicion3 = document.createElement("div");
  //var divLeyendaProbIgnicion3Texto = document.createElement("div");
  divLeyendaProbIgnicion3.classList.add("ProbIgnicion3");
  document.querySelector('.leyendaProbIgnicion').appendChild(divLeyendaProbIgnicion3);
  //divLeyendaProbIgnicion3Texto.textContent = " 20 - 30%";
  //divLeyendaProbIgnicion3Texto.classList.add("leyendaTexto");
  //document.querySelector('.leyendaProbIgnicion').appendChild(divLeyendaProbIgnicion3Texto);
  document.querySelector('.leyendaProbIgnicion').appendChild(document.createElement("br"));

  var divLeyendaProbIgnicion4 = document.createElement("div");
  //var divLeyendaProbIgnicion4Texto = document.createElement("div");
  divLeyendaProbIgnicion4.classList.add("ProbIgnicion4");
  document.querySelector('.leyendaProbIgnicion').appendChild(divLeyendaProbIgnicion4);
  //divLeyendaProbIgnicion4Texto.textContent = " 30 - 40%";
  //divLeyendaProbIgnicion4Texto.classList.add("leyendaTexto");
  //document.querySelector('.leyendaProbIgnicion').appendChild(divLeyendaProbIgnicion4Texto);
  document.querySelector('.leyendaProbIgnicion').appendChild(document.createElement("br"));

  var divLeyendaProbIgnicion5 = document.createElement("div");
  //var divLeyendaProbIgnicion5Texto = document.createElement("div");
  divLeyendaProbIgnicion5.classList.add("ProbIgnicion5");
  document.querySelector('.leyendaProbIgnicion').appendChild(divLeyendaProbIgnicion5);
  //divLeyendaProbIgnicion5Texto.textContent = " 40 - 50%";
  //divLeyendaProbIgnicion5Texto.classList.add("leyendaTexto");
  //document.querySelector('.leyendaProbIgnicion').appendChild(divLeyendaProbIgnicion5Texto);
  document.querySelector('.leyendaProbIgnicion').appendChild(document.createElement("br"));

  var divLeyendaProbIgnicion6 = document.createElement("div");
  //var divLeyendaProbIgnicion6Texto = document.createElement("div");
  divLeyendaProbIgnicion6.classList.add("ProbIgnicion6");
  document.querySelector('.leyendaProbIgnicion').appendChild(divLeyendaProbIgnicion6);
  //divLeyendaProbIgnicion6Texto.textContent = " 50 - 60%";
  //divLeyendaProbIgnicion6Texto.classList.add("leyendaTexto");
  //document.querySelector('.leyendaProbIgnicion').appendChild(divLeyendaProbIgnicion6Texto);
  document.querySelector('.leyendaProbIgnicion').appendChild(document.createElement("br"));

  var divLeyendaProbIgnicion7 = document.createElement("div");
  //var divLeyendaProbIgnicion7Texto = document.createElement("div");
  divLeyendaProbIgnicion7.classList.add("ProbIgnicion7");
  document.querySelector('.leyendaProbIgnicion').appendChild(divLeyendaProbIgnicion7);
  //divLeyendaProbIgnicion7Texto.textContent = " 60 - 70%";
  //divLeyendaProbIgnicion7Texto.classList.add("leyendaTexto");
  //document.querySelector('.leyendaProbIgnicion').appendChild(divLeyendaProbIgnicion7Texto);
  document.querySelector('.leyendaProbIgnicion').appendChild(document.createElement("br"));

  var divLeyendaProbIgnicion8 = document.createElement("div");
  //var divLeyendaProbIgnicion8Texto = document.createElement("div");
  divLeyendaProbIgnicion8.classList.add("ProbIgnicion8");
  document.querySelector('.leyendaProbIgnicion').appendChild(divLeyendaProbIgnicion8);
  //divLeyendaProbIgnicion8Texto.textContent = " 70 - 80%";
  //divLeyendaProbIgnicion8Texto.classList.add("leyendaTexto");
  //document.querySelector('.leyendaProbIgnicion').appendChild(divLeyendaProbIgnicion8Texto);
  document.querySelector('.leyendaProbIgnicion').appendChild(document.createElement("br"));

  var divLeyendaProbIgnicion9 = document.createElement("div");
  //var divLeyendaProbIgnicion9Texto = document.createElement("div");
  divLeyendaProbIgnicion9.classList.add("ProbIgnicion9");
  document.querySelector('.leyendaProbIgnicion').appendChild(divLeyendaProbIgnicion9);
  //divLeyendaProbIgnicion9Texto.textContent = " 80 - 90%";
  //divLeyendaProbIgnicion9Texto.classList.add("leyendaTexto");
  //document.querySelector('.leyendaProbIgnicion').appendChild(divLeyendaProbIgnicion9Texto);
  document.querySelector('.leyendaProbIgnicion').appendChild(document.createElement("br"));

  var divLeyendaProbIgnicion10 = document.createElement("div");
  //var divLeyendaProbIgnicion10Texto = document.createElement("div");
  divLeyendaProbIgnicion10.classList.add("ProbIgnicion10");
  document.querySelector('.leyendaProbIgnicion').appendChild(divLeyendaProbIgnicion10);
  //divLeyendaProbIgnicion10Texto.textContent = " 90 - 100%";
  //divLeyendaProbIgnicion10Texto.classList.add("leyendaTexto");
  //document.querySelector('.leyendaProbIgnicion').appendChild(divLeyendaProbIgnicion10Texto);
  document.querySelector('.leyendaProbIgnicion').appendChild(document.createElement("br"));

  var divLeyendaProbIgnicion11Texto = document.createElement("div");
  divLeyendaProbIgnicion11Texto.textContent = " 100%";
  divLeyendaProbIgnicion11Texto.classList.add("leyendaTexto");
  document.querySelector('.leyendaProbIgnicion').appendChild(divLeyendaProbIgnicion11Texto);
}


function eliminarLeyendaProbIgnicion(){
  try {
    document.getElementById('leyendaProbIgnicion').remove();
  } catch (error) {
    console.log(error);
  }
}

function obtenerCapaTemp() {
  arrayRutaTemp = [];
  arrayCapasTemp = [];
  let arrayFechas = obtenerFechasRequeridas(fechaCalendario);
  if(arrayFechas && arrayFechas.length == 5) {

    for (let i = 0; i<arrayFechas.length; i++) {
      arrayRutaTemp.push("../Pronostico/" + arrayFechas[i] + "_Temp.geojson");
    }
  }
  try { // Crear capa Temp
    if (arrayRutaTemp && arrayRutaTemp.length == 5) {   
      for (let i = 0; i<arrayRutaTemp.length; i++) {
        var temp = new L.GeoJSON.AJAX(arrayRutaTemp[i], {
          style: style_Temp
        });
        arrayCapasTemp.push(temp); 
      }  
    }
  } catch (error) {
    console.log("Error creando Capas Temp JSON: " + error);
  }
}
function obtenerCapaTemp_movil() {
  arrayRutaTemp = [];
  arrayCapasTemp = [];
  let arrayFechas = obtenerFechasRequeridas_movil(fechaCalendario);
  if(arrayFechas && arrayFechas.length == 5) {

    for (let i = 0; i<arrayFechas.length; i++) {
      arrayRutaTemp.push("../Pronostico/" + arrayFechas[i] + "_Temp.geojson");
    }
  }
  try { // Crear capa Temp
    if (arrayRutaTemp && arrayRutaTemp.length == 5) {   
      for (let i = 0; i<arrayRutaTemp.length; i++) {
        var temp = new L.GeoJSON.AJAX(arrayRutaTemp[i], {
          style: style_Temp
        });
        arrayCapasTemp.push(temp); 
      }  
    }
  } catch (error) {
    console.log("Error creando Capas Temp JSON: " + error);
  }
}

function cargaTemp() {
  if(validacionCheckbox() <= limitCheck) {
    let checkTemp = document.getElementById("cbx_temp")
    if (!checkTemp.checked) {
      for (let i = 0; i<arrayCapasTemp.length; i++) {
        arrayCapasTemp[i].remove();
      }
      eliminarLeyendaTemp();
    }
    
    try {
      if(document.getElementById("cbx_temp").checked == true && arrayCapasTemp) {
        obtenerCapaTemp();
        arrayCapasTemp[0].addTo(map1);
        arrayCapasTemp[1].addTo(map2);
        arrayCapasTemp[2].addTo(map3);
        arrayCapasTemp[3].addTo(map4);
        arrayCapasTemp[4].addTo(map5);
        crearLeyendaTemp();
      } else {
        for (let i = 0; i<arrayCapasViento.length; i++) {
          arrayCapasTemp[i].remove();
        }
        eliminarLeyendaTemp();
      }  
    } catch (error) {
      console.log(error);
    } 
  } else {
    document.getElementById("cbx_temp").checked = false;
  }
}
function cargaTemp_movil() {
  if(validacionCheckbox() <= limitCheck) {
    let checkTemp = document.getElementById("cbx_temp_movil")
    if (!checkTemp.checked) {
      for (let i = 0; i<arrayCapasTemp.length; i++) {
        arrayCapasTemp[i].remove();
      }
      eliminarLeyendaTemp();
    }
    
    try {
      if(document.getElementById("cbx_temp_movil").checked == true && arrayCapasTemp) {
        obtenerCapaTemp_movil();
        arrayCapasTemp[0].addTo(map1);
        arrayCapasTemp[1].addTo(map2);
        arrayCapasTemp[2].addTo(map3);
        arrayCapasTemp[3].addTo(map4);
        arrayCapasTemp[4].addTo(map5);
        crearLeyendaTemp_movil();
      } else {
        for (let i = 0; i<arrayCapasViento.length; i++) {
          arrayCapasTemp[i].remove();
        }
        eliminarLeyendaTemp();
      }  
    } catch (error) {
      console.log(error);
    } 
  } else {
    document.getElementById("cbx_temp_movil").checked = false;
  }
}

function crearLeyendaTemp() {
  var divLeyendaTemp = document.createElement("div");
  divLeyendaTemp.classList.add("leyendaTemp");

  document.querySelector('.leyenda').appendChild(divLeyendaTemp);
  divLeyendaTemp.setAttribute("id", "leyendaTemp");

  var divLeyendaTemp1 = document.createElement("div");
  var divLeyendaTemp1Texto = document.createElement("div");
  divLeyendaTemp1.classList.add("Temp1");
  document.querySelector('.leyendaTemp').appendChild(divLeyendaTemp1);
  divLeyendaTemp1Texto.textContent = " < 0°";
  divLeyendaTemp1Texto.classList.add("leyendaTexto");
  document.querySelector('.leyendaTemp').appendChild(divLeyendaTemp1Texto);
  document.querySelector('.leyendaTemp').appendChild(document.createElement("br"));

  var divLeyendaTemp2 = document.createElement("div");
  var divLeyendaTemp2Texto = document.createElement("div");
  divLeyendaTemp2.classList.add("Temp2");
  document.querySelector('.leyendaTemp').appendChild(divLeyendaTemp2);
  divLeyendaTemp2Texto.textContent = " 0° - 5°";
  divLeyendaTemp2Texto.classList.add("leyendaTexto");
  document.querySelector('.leyendaTemp').appendChild(divLeyendaTemp2Texto);
  document.querySelector('.leyendaTemp').appendChild(document.createElement("br"));

  var divLeyendaTemp3 = document.createElement("div");
  var divLeyendaTemp3Texto = document.createElement("div");
  divLeyendaTemp3.classList.add("Temp3");
  document.querySelector('.leyendaTemp').appendChild(divLeyendaTemp3);
  divLeyendaTemp3Texto.textContent = " 5° - 10°";
  divLeyendaTemp3Texto.classList.add("leyendaTexto");
  document.querySelector('.leyendaTemp').appendChild(divLeyendaTemp3Texto);
  document.querySelector('.leyendaTemp').appendChild(document.createElement("br"));

  var divLeyendaTemp4 = document.createElement("div");
  var divLeyendaTemp4Texto = document.createElement("div");
  divLeyendaTemp4.classList.add("Temp4");
  document.querySelector('.leyendaTemp').appendChild(divLeyendaTemp4);
  divLeyendaTemp4Texto.textContent = " 10° - 15°";
  divLeyendaTemp4Texto.classList.add("leyendaTexto");
  document.querySelector('.leyendaTemp').appendChild(divLeyendaTemp4Texto);
  document.querySelector('.leyendaTemp').appendChild(document.createElement("br"));

  var divLeyendaTemp5 = document.createElement("div");
  var divLeyendaTemp5Texto = document.createElement("div");
  divLeyendaTemp5.classList.add("Temp5");
  document.querySelector('.leyendaTemp').appendChild(divLeyendaTemp5);
  divLeyendaTemp5Texto.textContent = " 15° - 20°";
  divLeyendaTemp5Texto.classList.add("leyendaTexto");
  document.querySelector('.leyendaTemp').appendChild(divLeyendaTemp5Texto);
  document.querySelector('.leyendaTemp').appendChild(document.createElement("br"));

  var divLeyendaTemp6 = document.createElement("div");
  var divLeyendaTemp6Texto = document.createElement("div");
  divLeyendaTemp6.classList.add("Temp6");
  document.querySelector('.leyendaTemp').appendChild(divLeyendaTemp6);
  divLeyendaTemp6Texto.textContent = " 20° - 25°";
  divLeyendaTemp6Texto.classList.add("leyendaTexto");
  document.querySelector('.leyendaTemp').appendChild(divLeyendaTemp6Texto);
  document.querySelector('.leyendaTemp').appendChild(document.createElement("br"));

  var divLeyendaTemp7 = document.createElement("div");
  var divLeyendaTemp7Texto = document.createElement("div");
  divLeyendaTemp7.classList.add("Temp7");
  document.querySelector('.leyendaTemp').appendChild(divLeyendaTemp7);
  divLeyendaTemp7Texto.textContent = " 25° - 30°";
  divLeyendaTemp7Texto.classList.add("leyendaTexto");
  document.querySelector('.leyendaTemp').appendChild(divLeyendaTemp7Texto);
  document.querySelector('.leyendaTemp').appendChild(document.createElement("br"));

  var divLeyendaTemp8 = document.createElement("div");
  var divLeyendaTemp8Texto = document.createElement("div");
  divLeyendaTemp8.classList.add("Temp8");
  document.querySelector('.leyendaTemp').appendChild(divLeyendaTemp8);
  divLeyendaTemp8Texto.textContent = " 30° - 35°";
  divLeyendaTemp8Texto.classList.add("leyendaTexto");
  document.querySelector('.leyendaTemp').appendChild(divLeyendaTemp8Texto);
  document.querySelector('.leyendaTemp').appendChild(document.createElement("br"));

  var divLeyendaTemp9 = document.createElement("div");
  var divLeyendaTemp9Texto = document.createElement("div");
  divLeyendaTemp9.classList.add("Temp9");
  document.querySelector('.leyendaTemp').appendChild(divLeyendaTemp9);
  divLeyendaTemp9Texto.textContent = " > 35°";
  divLeyendaTemp9Texto.classList.add("leyendaTexto");
  document.querySelector('.leyendaTemp').appendChild(divLeyendaTemp9Texto);
  document.querySelector('.leyendaTemp').appendChild(document.createElement("br"));
}
function crearLeyendaTemp_movil() {
  var divLeyendaTemp = document.createElement("div");
  divLeyendaTemp.classList.add("leyendaTemp");

  document.querySelector('.leyenda_movil').appendChild(divLeyendaTemp);
  divLeyendaTemp.setAttribute("id", "leyendaTemp");

  var divLeyendaTituloTemp = document.createElement("div");
  divLeyendaTituloTemp.classList.add("TempLeyendaTitulo");
  divLeyendaTituloTemp.textContent = " Temp. ";
  divLeyendaTituloTemp.classList.add("leyendaTexto");
  document.querySelector('.leyendaTemp').appendChild(divLeyendaTituloTemp);
  document.querySelector('.leyendaTemp').appendChild(document.createElement("br"));
  
  var divLeyendaTemp0Texto = document.createElement("div");
  divLeyendaTemp0Texto.textContent = " <0° ";
  divLeyendaTemp0Texto.classList.add("leyendaTexto");
  document.querySelector('.leyendaTemp').appendChild(divLeyendaTemp0Texto);

  var divLeyendaTemp1 = document.createElement("div");
  //var divLeyendaTemp1Texto = document.createElement("div");
  divLeyendaTemp1.classList.add("Temp1");
  document.querySelector('.leyendaTemp').appendChild(divLeyendaTemp1);
  //divLeyendaTemp1Texto.textContent = " < 0°";
  //divLeyendaTemp1Texto.classList.add("leyendaTexto");
  //document.querySelector('.leyendaTemp').appendChild(divLeyendaTemp1Texto);
  document.querySelector('.leyendaTemp').appendChild(document.createElement("br"));

  var divLeyendaTemp2 = document.createElement("div");
  //var divLeyendaTemp2Texto = document.createElement("div");
  divLeyendaTemp2.classList.add("Temp2");
  document.querySelector('.leyendaTemp').appendChild(divLeyendaTemp2);
  //divLeyendaTemp2Texto.textContent = " 0° - 5°";
  //divLeyendaTemp2Texto.classList.add("leyendaTexto");
  //document.querySelector('.leyendaTemp').appendChild(divLeyendaTemp2Texto);
  document.querySelector('.leyendaTemp').appendChild(document.createElement("br"));

  var divLeyendaTemp3 = document.createElement("div");
  //var divLeyendaTemp3Texto = document.createElement("div");
  divLeyendaTemp3.classList.add("Temp3");
  document.querySelector('.leyendaTemp').appendChild(divLeyendaTemp3);
  //divLeyendaTemp3Texto.textContent = " 5° - 10°";
  //divLeyendaTemp3Texto.classList.add("leyendaTexto");
  //document.querySelector('.leyendaTemp').appendChild(divLeyendaTemp3Texto);
  document.querySelector('.leyendaTemp').appendChild(document.createElement("br"));

  var divLeyendaTemp4 = document.createElement("div");
  //var divLeyendaTemp4Texto = document.createElement("div");
  divLeyendaTemp4.classList.add("Temp4");
  document.querySelector('.leyendaTemp').appendChild(divLeyendaTemp4);
  //divLeyendaTemp4Texto.textContent = " 10° - 15°";
  //divLeyendaTemp4Texto.classList.add("leyendaTexto");
  //document.querySelector('.leyendaTemp').appendChild(divLeyendaTemp4Texto);
  document.querySelector('.leyendaTemp').appendChild(document.createElement("br"));

  var divLeyendaTemp5 = document.createElement("div");
  //var divLeyendaTemp5Texto = document.createElement("div");
  divLeyendaTemp5.classList.add("Temp5");
  document.querySelector('.leyendaTemp').appendChild(divLeyendaTemp5);
  //divLeyendaTemp5Texto.textContent = " 15° - 20°";
  //divLeyendaTemp5Texto.classList.add("leyendaTexto");
  //document.querySelector('.leyendaTemp').appendChild(divLeyendaTemp5Texto);
  document.querySelector('.leyendaTemp').appendChild(document.createElement("br"));

  var divLeyendaTemp6 = document.createElement("div");
  //var divLeyendaTemp6Texto = document.createElement("div");
  divLeyendaTemp6.classList.add("Temp6");
  document.querySelector('.leyendaTemp').appendChild(divLeyendaTemp6);
  //divLeyendaTemp6Texto.textContent = " 20° - 25°";
  //divLeyendaTemp6Texto.classList.add("leyendaTexto");
  //document.querySelector('.leyendaTemp').appendChild(divLeyendaTemp6Texto);
  document.querySelector('.leyendaTemp').appendChild(document.createElement("br"));

  var divLeyendaTemp7 = document.createElement("div");
  //var divLeyendaTemp7Texto = document.createElement("div");
  divLeyendaTemp7.classList.add("Temp7");
  document.querySelector('.leyendaTemp').appendChild(divLeyendaTemp7);
  //divLeyendaTemp7Texto.textContent = " 25° - 30°";
  //divLeyendaTemp7Texto.classList.add("leyendaTexto");
  //document.querySelector('.leyendaTemp').appendChild(divLeyendaTemp7Texto);
  document.querySelector('.leyendaTemp').appendChild(document.createElement("br"));

  var divLeyendaTemp8 = document.createElement("div");
  //var divLeyendaTemp8Texto = document.createElement("div");
  divLeyendaTemp8.classList.add("Temp8");
  document.querySelector('.leyendaTemp').appendChild(divLeyendaTemp8);
  //divLeyendaTemp8Texto.textContent = " 30° - 35°";
  //divLeyendaTemp8Texto.classList.add("leyendaTexto");
  //document.querySelector('.leyendaTemp').appendChild(divLeyendaTemp8Texto);
  document.querySelector('.leyendaTemp').appendChild(document.createElement("br"));

  var divLeyendaTemp9 = document.createElement("div");
  //var divLeyendaTemp9Texto = document.createElement("div");
  divLeyendaTemp9.classList.add("Temp9");
  document.querySelector('.leyendaTemp').appendChild(divLeyendaTemp9);
  //divLeyendaTemp9Texto.textContent = " > 35°";
  //divLeyendaTemp9Texto.classList.add("leyendaTexto");
  //document.querySelector('.leyendaTemp').appendChild(divLeyendaTemp9Texto);
  document.querySelector('.leyendaTemp').appendChild(document.createElement("br"));

  var divLeyendaTemp11Texto = document.createElement("div");
  divLeyendaTemp11Texto.textContent = " >35°";
  divLeyendaTemp11Texto.classList.add("leyendaTexto");
  document.querySelector('.leyendaTemp').appendChild(divLeyendaTemp11Texto);
}

function eliminarLeyendaTemp(){
  try {
    document.getElementById('leyendaTemp').remove();
  } catch (error) {
    console.log(error);
  }
}

function obtenerCapaViento() {
  arrayRutaViento = [];
  arrayCapasViento = [];
  let arrayFechas = obtenerFechasRequeridas(fechaCalendario);
  if(arrayFechas && arrayFechas.length == 5) {

    for (let i = 0; i<arrayFechas.length; i++) {
      arrayRutaViento.push("../Pronostico/" + arrayFechas[i] + "_VViento.geojson");
    }
  }
  try { // Crear capa Viento
    if (arrayRutaViento && arrayRutaViento.length == 5) {   
      for (let i = 0; i<arrayRutaViento.length; i++) {
        var viento = new L.GeoJSON.AJAX(arrayRutaViento[i], {
          style: style_VViento
        });
        arrayCapasViento.push(viento); 
      }  
    }
  } catch (error) {
    console.log("Error creando Capas Viento JSON: " + error);
  }
}
function obtenerCapaViento_movil() {
  arrayRutaViento = [];
  arrayCapasViento = [];
  let arrayFechas = obtenerFechasRequeridas_movil(fechaCalendario);
  if(arrayFechas && arrayFechas.length == 5) {

    for (let i = 0; i<arrayFechas.length; i++) {
      arrayRutaViento.push("../Pronostico/" + arrayFechas[i] + "_VViento.geojson");
    }
  }
  try { // Crear capa Viento
    if (arrayRutaViento && arrayRutaViento.length == 5) {   
      for (let i = 0; i<arrayRutaViento.length; i++) {
        var viento = new L.GeoJSON.AJAX(arrayRutaViento[i], {
          style: style_VViento
        });
        arrayCapasViento.push(viento); 
      }  
    }
  } catch (error) {
    console.log("Error creando Capas Viento JSON: " + error);
  }
}

function cargaViento() {
  if(validacionCheckbox() <= limitCheck) {
    let checkViento = document.getElementById("cbx_viento")
    if (!checkViento.checked) {
      for (let i = 0; i<arrayCapasViento.length; i++) {
        arrayCapasViento[i].remove();
      }
      eliminarLeyendaViento();
    }
  
    try {
      if(document.getElementById("cbx_viento").checked == true && arrayCapasViento) {
        obtenerCapaViento();
        arrayCapasViento[0].addTo(map1);
        arrayCapasViento[1].addTo(map2);
        arrayCapasViento[2].addTo(map3);
        arrayCapasViento[3].addTo(map4);
        arrayCapasViento[4].addTo(map5);
        crearLeyendaViento();
      } else {
        for (let i = 0; i<arrayCapasViento.length; i++) {
          arrayCapasViento[i].remove();
        }
        eliminarLeyendaViento();
      }  
    } catch (error) {
      console.log(error);
    } 
  } else {
    document.getElementById("cbx_viento").checked = false;
  }
}
function cargaViento_movil() {
  if(validacionCheckbox() <= limitCheck) {
    let checkViento = document.getElementById("cbx_viento_movil")
    if (!checkViento.checked) {
      for (let i = 0; i<arrayCapasViento.length; i++) {
        arrayCapasViento[i].remove();
      }
      eliminarLeyendaViento();
    }
  
    try {
      if(document.getElementById("cbx_viento_movil").checked == true && arrayCapasViento) {
        obtenerCapaViento_movil();
        arrayCapasViento[0].addTo(map1);
        arrayCapasViento[1].addTo(map2);
        arrayCapasViento[2].addTo(map3);
        arrayCapasViento[3].addTo(map4);
        arrayCapasViento[4].addTo(map5);
        crearLeyendaViento_movil();
      } else {
        for (let i = 0; i<arrayCapasViento.length; i++) {
          arrayCapasViento[i].remove();
        }
        eliminarLeyendaViento();
      }  
    } catch (error) {
      console.log(error);
    } 
  } else {
    document.getElementById("cbx_viento_movil").checked = false;
  }
}

function crearLeyendaViento() {
  var divLeyendaViento = document.createElement("div");
  divLeyendaViento.classList.add("leyendaViento");

  document.querySelector('.leyenda').appendChild(divLeyendaViento);
  divLeyendaViento.setAttribute("id", "leyendaViento");

  var divLeyendaViento1 = document.createElement("div");
  var divLeyendaViento1Texto = document.createElement("div");
  divLeyendaViento1.classList.add("Viento1");
  document.querySelector('.leyendaViento').appendChild(divLeyendaViento1);
  divLeyendaViento1Texto.textContent = " < 3 km/h";
  divLeyendaViento1Texto.classList.add("leyendaTexto");
  document.querySelector('.leyendaViento').appendChild(divLeyendaViento1Texto);
  document.querySelector('.leyendaViento').appendChild(document.createElement("br"));

  var divLeyendaViento2 = document.createElement("div");
  var divLeyendaViento2Texto = document.createElement("div");
  divLeyendaViento2.classList.add("Viento2");
  document.querySelector('.leyendaViento').appendChild(divLeyendaViento2);
  divLeyendaViento2Texto.textContent = " 3 a 5 km/h";
  divLeyendaViento2Texto.classList.add("leyendaTexto");
  document.querySelector('.leyendaViento').appendChild(divLeyendaViento2Texto);
  document.querySelector('.leyendaViento').appendChild(document.createElement("br"));

  var divLeyendaViento3 = document.createElement("div");
  var divLeyendaViento3Texto = document.createElement("div");
  divLeyendaViento3.classList.add("Viento3");
  document.querySelector('.leyendaViento').appendChild(divLeyendaViento3);
  divLeyendaViento3Texto.textContent = " 5 a 10 km/h";
  divLeyendaViento3Texto.classList.add("leyendaTexto");
  document.querySelector('.leyendaViento').appendChild(divLeyendaViento3Texto);
  document.querySelector('.leyendaViento').appendChild(document.createElement("br"));

  var divLeyendaViento4 = document.createElement("div");
  var divLeyendaViento4Texto = document.createElement("div");
  divLeyendaViento4.classList.add("Viento4");
  document.querySelector('.leyendaViento').appendChild(divLeyendaViento4);
  divLeyendaViento4Texto.textContent = " 10 a 15 km/h";
  divLeyendaViento4Texto.classList.add("leyendaTexto");
  document.querySelector('.leyendaViento').appendChild(divLeyendaViento4Texto);
  document.querySelector('.leyendaViento').appendChild(document.createElement("br"));

  var divLeyendaViento5 = document.createElement("div");
  var divLeyendaViento5Texto = document.createElement("div");
  divLeyendaViento5.classList.add("Viento5");
  document.querySelector('.leyendaViento').appendChild(divLeyendaViento5);
  divLeyendaViento5Texto.textContent = " 15 a 20 km/h";
  divLeyendaViento5Texto.classList.add("leyendaTexto");
  document.querySelector('.leyendaViento').appendChild(divLeyendaViento5Texto);
  document.querySelector('.leyendaViento').appendChild(document.createElement("br"));

  var divLeyendaViento6 = document.createElement("div");
  var divLeyendaViento6Texto = document.createElement("div");
  divLeyendaViento6.classList.add("Viento6");
  document.querySelector('.leyendaViento').appendChild(divLeyendaViento6);
  divLeyendaViento6Texto.textContent = " 20 a 25 km/h";
  divLeyendaViento6Texto.classList.add("leyendaTexto");
  document.querySelector('.leyendaViento').appendChild(divLeyendaViento6Texto);
  document.querySelector('.leyendaViento').appendChild(document.createElement("br"));

  var divLeyendaViento7 = document.createElement("div");
  var divLeyendaViento7Texto = document.createElement("div");
  divLeyendaViento7.classList.add("Viento7");
  document.querySelector('.leyendaViento').appendChild(divLeyendaViento7);
  divLeyendaViento7Texto.textContent = " 25 a 30 km/h";
  divLeyendaViento7Texto.classList.add("leyendaTexto");
  document.querySelector('.leyendaViento').appendChild(divLeyendaViento7Texto);
  document.querySelector('.leyendaViento').appendChild(document.createElement("br"));

  var divLeyendaViento8 = document.createElement("div");
  var divLeyendaViento8Texto = document.createElement("div");
  divLeyendaViento8.classList.add("Viento8");
  document.querySelector('.leyendaViento').appendChild(divLeyendaViento8);
  divLeyendaViento8Texto.textContent = " > 30 km/h";
  divLeyendaViento8Texto.classList.add("leyendaTexto");
  document.querySelector('.leyendaViento').appendChild(divLeyendaViento8Texto);
  document.querySelector('.leyendaViento').appendChild(document.createElement("br"));
}
function crearLeyendaViento_movil() {
  var divLeyendaViento = document.createElement("div");
  divLeyendaViento.classList.add("leyendaViento");

  document.querySelector('.leyenda_movil').appendChild(divLeyendaViento);
  divLeyendaViento.setAttribute("id", "leyendaViento");

  var divLeyendaTituloViento = document.createElement("div");
  divLeyendaTituloViento.classList.add("VientoLeyendaTitulo");
  divLeyendaTituloViento.textContent = " Viento ";
  divLeyendaTituloViento.classList.add("leyendaTexto");
  document.querySelector('.leyendaViento').appendChild(divLeyendaTituloViento);
  document.querySelector('.leyendaViento').appendChild(document.createElement("br"));
  
  var divLeyendaViento0Texto = document.createElement("div");
  divLeyendaViento0Texto.textContent = " <3 km/h ";
  divLeyendaViento0Texto.classList.add("leyendaTexto");
  document.querySelector('.leyendaViento').appendChild(divLeyendaViento0Texto);

  var divLeyendaViento1 = document.createElement("div");
  //var divLeyendaViento1Texto = document.createElement("div");
  divLeyendaViento1.classList.add("Viento1");
  document.querySelector('.leyendaViento').appendChild(divLeyendaViento1);
  //divLeyendaViento1Texto.textContent = " CALMO";
  //divLeyendaViento1Texto.classList.add("leyendaTexto");
  //document.querySelector('.leyendaViento').appendChild(divLeyendaViento1Texto);
  document.querySelector('.leyendaViento').appendChild(document.createElement("br"));

  var divLeyendaViento2 = document.createElement("div");
  //var divLeyendaViento2Texto = document.createElement("div");
  divLeyendaViento2.classList.add("Viento2");
  document.querySelector('.leyendaViento').appendChild(divLeyendaViento2);
  //divLeyendaViento2Texto.textContent = " 3 a 5 km/h";
  //divLeyendaViento2Texto.classList.add("leyendaTexto");
  //document.querySelector('.leyendaViento').appendChild(divLeyendaViento2Texto);
  document.querySelector('.leyendaViento').appendChild(document.createElement("br"));

  var divLeyendaViento3 = document.createElement("div");
  //var divLeyendaViento3Texto = document.createElement("div");
  divLeyendaViento3.classList.add("Viento3");
  document.querySelector('.leyendaViento').appendChild(divLeyendaViento3);
  //divLeyendaViento3Texto.textContent = " 5 a 10 km/h";
  //divLeyendaViento3Texto.classList.add("leyendaTexto");
  //document.querySelector('.leyendaViento').appendChild(divLeyendaViento3Texto);
  document.querySelector('.leyendaViento').appendChild(document.createElement("br"));

  var divLeyendaViento4 = document.createElement("div");
  //var divLeyendaViento4Texto = document.createElement("div");
  divLeyendaViento4.classList.add("Viento4");
  document.querySelector('.leyendaViento').appendChild(divLeyendaViento4);
  //divLeyendaViento4Texto.textContent = " 10 a 15 km/h";
  //divLeyendaViento4Texto.classList.add("leyendaTexto");
  //document.querySelector('.leyendaViento').appendChild(divLeyendaViento4Texto);
  document.querySelector('.leyendaViento').appendChild(document.createElement("br"));

  var divLeyendaViento5 = document.createElement("div");
  //var divLeyendaViento5Texto = document.createElement("div");
  divLeyendaViento5.classList.add("Viento5");
  document.querySelector('.leyendaViento').appendChild(divLeyendaViento5);
  //divLeyendaViento5Texto.textContent = " 15 a 20 km/h";
  //divLeyendaViento5Texto.classList.add("leyendaTexto");
  //document.querySelector('.leyendaViento').appendChild(divLeyendaViento5Texto);
  document.querySelector('.leyendaViento').appendChild(document.createElement("br"));

  var divLeyendaViento6 = document.createElement("div");
  //var divLeyendaViento6Texto = document.createElement("div");
  divLeyendaViento6.classList.add("Viento6");
  document.querySelector('.leyendaViento').appendChild(divLeyendaViento6);
  //divLeyendaViento6Texto.textContent = " 20 a 25 km/h";
  //divLeyendaViento6Texto.classList.add("leyendaTexto");
  //document.querySelector('.leyendaViento').appendChild(divLeyendaViento6Texto);
  document.querySelector('.leyendaViento').appendChild(document.createElement("br"));

  var divLeyendaViento7 = document.createElement("div");
  //var divLeyendaViento7Texto = document.createElement("div");
  divLeyendaViento7.classList.add("Viento7");
  document.querySelector('.leyendaViento').appendChild(divLeyendaViento7);
  //divLeyendaViento7Texto.textContent = " 25 a 30 km/h";
  //divLeyendaViento7Texto.classList.add("leyendaTexto");
  //document.querySelector('.leyendaViento').appendChild(divLeyendaViento7Texto);
  document.querySelector('.leyendaViento').appendChild(document.createElement("br"));

  var divLeyendaViento8 = document.createElement("div");
  //var divLeyendaViento8Texto = document.createElement("div");
  divLeyendaViento8.classList.add("Viento8");
  document.querySelector('.leyendaViento').appendChild(divLeyendaViento8);
  //divLeyendaViento8Texto.textContent = " > 30 km/h";
  //divLeyendaViento8Texto.classList.add("leyendaTexto");
  //document.querySelector('.leyendaViento').appendChild(divLeyendaViento8Texto);
  document.querySelector('.leyendaViento').appendChild(document.createElement("br"));

  var divLeyendaViento9Texto = document.createElement("div");
  divLeyendaViento9Texto.textContent = " >30 km/h";
  divLeyendaViento9Texto.classList.add("leyendaTexto");
  document.querySelector('.leyendaViento').appendChild(divLeyendaViento9Texto);
}

function eliminarLeyendaViento(){
  try {
    document.getElementById('leyendaViento').remove();
  } catch (error) {
    console.log(error);
  }
}

// Función para limitar la cantidad de checkboxes que pueden estar seleccionados al mismo tiempo en la página (limite de capas a mostrar a la vez)
function validacionCheckbox() { 
  //const limitCheck = 1;
  checkedCount = 0;

  checkboxes.forEach(checkbox => {
    if (checkbox.checked) {
      checkedCount++;
      /*if (checkedCount > limitCheck) {
        checkbox.checked = false;
        checkedCount--;
      }*/
    } /*else {
      checkedCount--;
    }*/
  });
  return checkedCount;
}  

// Cargamos en el control las capas base con las Superposiciones en sus respectivos mapas
  L.control.layers(capaBase).addTo(map1);
  //L.control.layers(capaBase).addTo(map2);
  //L.control.layers(capaBase).addTo(map3);
  //L.control.layers(capaBase).addTo(map4);
  //L.control.layers(capaBase).addTo(map5);

// Función que comprueba qué capa base está en el mapa 1 y lo carga en el resto de mapas, eliminando las capas base anteriores. Es llamada como evento onChange en el mapa 1
function compruebaCapaBase() { 
  if (map1.hasLayer(Stadia_AlidadeSmoothDark)) {
    L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png', {
      maxZoom: 18,
      crs: proyeccion,
      //attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
    }).addTo(map1);
    L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png', {
      maxZoom: 18,
      crs: proyeccion,
      //attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
    }).addTo(map2);
    L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png', {
      maxZoom: 18,
      crs: proyeccion,
      //attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
    }).addTo(map3);
    L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png', {
      maxZoom: 18,
      crs: proyeccion,
     // attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
    }).addTo(map4);
    L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png', {
      maxZoom: 18,
      crs: proyeccion,
      //attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
    }).addTo(map5);
    map1.removeLayer(base);
    map2.removeLayer(base);
    map3.removeLayer(base);
    map4.removeLayer(base);
    map5.removeLayer(base);
    map1.removeLayer(Stamen_Terrain);
    map2.removeLayer(Stamen_Terrain);
    map3.removeLayer(Stamen_Terrain);
    map4.removeLayer(Stamen_Terrain);
    map5.removeLayer(Stamen_Terrain);
    map1.removeLayer(OpenStreetMap_Mapnik);
    map2.removeLayer(OpenStreetMap_Mapnik);
    map3.removeLayer(OpenStreetMap_Mapnik);
    map4.removeLayer(OpenStreetMap_Mapnik);
    map5.removeLayer(OpenStreetMap_Mapnik);
    map1.removeLayer(Esri_WorldImagery);
    map2.removeLayer(Esri_WorldImagery);
    map3.removeLayer(Esri_WorldImagery);
    map4.removeLayer(Esri_WorldImagery);
    map5.removeLayer(Esri_WorldImagery);
    
  }
  if (map1.hasLayer(base)) {
    L.tileLayer('https://stamen-tiles.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}.png', {
      maxZoom: 18,
      crs: proyeccion,
      //attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      ext: 'png'
    }).addTo(map2);
    L.tileLayer('https://stamen-tiles.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}.png', {
        maxZoom: 18,
        crs: proyeccion,
        //attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        ext: 'png'
    }).addTo(map3);
    L.tileLayer('https://stamen-tiles.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}.png', {
        maxZoom: 18,
        crs: proyeccion,
        //attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        ext: 'png'
    }).addTo(map4);
    L.tileLayer('https://stamen-tiles.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}.png', {
        maxZoom: 18,
        crs: proyeccion,
        //attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        ext: 'png'
    }).addTo(map5);
    map1.removeLayer(Stadia_AlidadeSmoothDark);
    map2.removeLayer(Stadia_AlidadeSmoothDark);
    map3.removeLayer(Stadia_AlidadeSmoothDark);
    map4.removeLayer(Stadia_AlidadeSmoothDark);
    map5.removeLayer(Stadia_AlidadeSmoothDark);
    map1.removeLayer(Stamen_Terrain);
    map2.removeLayer(Stamen_Terrain);
    map3.removeLayer(Stamen_Terrain);
    map4.removeLayer(Stamen_Terrain);
    map5.removeLayer(Stamen_Terrain);
    map1.removeLayer(OpenStreetMap_Mapnik);
    map2.removeLayer(OpenStreetMap_Mapnik);
    map3.removeLayer(OpenStreetMap_Mapnik);
    map4.removeLayer(OpenStreetMap_Mapnik);
    map5.removeLayer(OpenStreetMap_Mapnik);
    map1.removeLayer(Esri_WorldImagery);
    map2.removeLayer(Esri_WorldImagery);
    map3.removeLayer(Esri_WorldImagery);
    map4.removeLayer(Esri_WorldImagery);
    map5.removeLayer(Esri_WorldImagery);
  }
  if(map1.hasLayer(Stamen_Terrain)) {
    L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}{r}.{ext}', {
      //attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      crs: proyeccion,
      maxZoom: 18,
      ext: 'png'
    }).addTo(map2);
    L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}{r}.{ext}', {
      //attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      crs: proyeccion,
      maxZoom: 18,
      ext: 'png'
    }).addTo(map3);
    L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}{r}.{ext}', {
      //attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      crs: proyeccion,
      maxZoom: 18,
      ext: 'png'
    }).addTo(map4);
    L.tileLayer('https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}{r}.{ext}', {
      //attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      crs: proyeccion,
      maxZoom: 18,
      ext: 'png'
    }).addTo(map5);
    map1.removeLayer(Stadia_AlidadeSmoothDark);
    map2.removeLayer(Stadia_AlidadeSmoothDark);
    map3.removeLayer(Stadia_AlidadeSmoothDark);
    map4.removeLayer(Stadia_AlidadeSmoothDark);
    map5.removeLayer(Stadia_AlidadeSmoothDark);
    map1.removeLayer(base);
    map2.removeLayer(base);
    map3.removeLayer(base);
    map4.removeLayer(base);
    map5.removeLayer(base);
    map1.removeLayer(OpenStreetMap_Mapnik);
    map2.removeLayer(OpenStreetMap_Mapnik);
    map3.removeLayer(OpenStreetMap_Mapnik);
    map4.removeLayer(OpenStreetMap_Mapnik);
    map5.removeLayer(OpenStreetMap_Mapnik);
    map1.removeLayer(Esri_WorldImagery);
    map2.removeLayer(Esri_WorldImagery);
    map3.removeLayer(Esri_WorldImagery);
    map4.removeLayer(Esri_WorldImagery);
    map5.removeLayer(Esri_WorldImagery);
  }
  if(map1.hasLayer(OpenStreetMap_Mapnik)) {
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      crs: proyeccion,
      //attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map2);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      crs: proyeccion,
      //attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map3);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      crs: proyeccion,
      //attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map4);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      crs: proyeccion,
      //attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map5);
    map1.removeLayer(Stadia_AlidadeSmoothDark);
    map2.removeLayer(Stadia_AlidadeSmoothDark);
    map3.removeLayer(Stadia_AlidadeSmoothDark);
    map4.removeLayer(Stadia_AlidadeSmoothDark);
    map5.removeLayer(Stadia_AlidadeSmoothDark);
    map1.removeLayer(base);
    map2.removeLayer(base);
    map3.removeLayer(base);
    map4.removeLayer(base);
    map5.removeLayer(base);
    map1.removeLayer(Stamen_Terrain);
    map2.removeLayer(Stamen_Terrain);
    map3.removeLayer(Stamen_Terrain);
    map4.removeLayer(Stamen_Terrain);
    map5.removeLayer(Stamen_Terrain);
    map1.removeLayer(Esri_WorldImagery);
    map2.removeLayer(Esri_WorldImagery);
    map3.removeLayer(Esri_WorldImagery);
    map4.removeLayer(Esri_WorldImagery);
    map5.removeLayer(Esri_WorldImagery);
  }
  if(map1.hasLayer(Esri_WorldImagery)) {
    L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
      maxZoom: 18,
      crs: proyeccion,	
      //attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
    }).addTo(map2);
    L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
      maxZoom: 18,
      crs: proyeccion,	
      //attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
    }).addTo(map3);
    L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
      maxZoom: 18,
      crs: proyeccion,	
      //attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
    }).addTo(map4);
    L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
      maxZoom: 18,
      crs: proyeccion,	
      //attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
    }).addTo(map5);
    map1.removeLayer(Stadia_AlidadeSmoothDark);
    map2.removeLayer(Stadia_AlidadeSmoothDark);
    map3.removeLayer(Stadia_AlidadeSmoothDark);
    map4.removeLayer(Stadia_AlidadeSmoothDark);
    map5.removeLayer(Stadia_AlidadeSmoothDark);
    map1.removeLayer(base);
    map2.removeLayer(base);
    map3.removeLayer(base);
    map4.removeLayer(base);
    map5.removeLayer(base);
    map1.removeLayer(Stamen_Terrain);
    map2.removeLayer(Stamen_Terrain);
    map3.removeLayer(Stamen_Terrain);
    map4.removeLayer(Stamen_Terrain);
    map5.removeLayer(Stamen_Terrain);
    map1.removeLayer(OpenStreetMap_Mapnik);
    map2.removeLayer(OpenStreetMap_Mapnik);
    map3.removeLayer(OpenStreetMap_Mapnik);
    map4.removeLayer(OpenStreetMap_Mapnik);
    map5.removeLayer(OpenStreetMap_Mapnik);
  }
}


// Sincronizar mapas
map1.sync(map2);
map1.sync(map3);
map1.sync(map4);
map1.sync(map5);
/*map2.sync(map1);
map2.sync(map3);
map2.sync(map4);
map2.sync(map5);
map3.sync(map1);
map3.sync(map2);
map3.sync(map4);
map3.sync(map5);
map4.sync(map1);
map4.sync(map2);
map4.sync(map3);
map4.sync(map5);
map5.sync(map1);
map5.sync(map2);
map5.sync(map3);
map5.sync(map4);*/

// Creamos los estilos, para cada capa, en función de variables ya definidas en los GeoJSON

function style_BR(feature) {
  /*switch(String(feature.properties['label'])) {
      case '1':*/
          return {
      stroke: false, 
      fill: true,
      fillOpacity: 1,
      fillColor: '#FF00EE',
      interactive: true,
  }
      /*    break;
      case '2':
          return {
      stroke: false, 
      fill: true,
      fillOpacity: 1,
      fillColor: 'rgba(252,190,165,1.0)',
      interactive: true,
  }
          break;
      case '3':
          return {
      stroke: false, 
      fill: true,
      fillOpacity: 1,
      fillColor: 'rgba(251,112,80,1.0)',
      interactive: true,
  }
          break;
      case '4':
          return {
      stroke: false, 
      fill: true,
      fillOpacity: 1,
      fillColor: 'rgba(211,32,32,1.0)',
      interactive: true,
  }
          break;
      case '5':
          return {
      stroke: false, 
      fill: true,
      fillOpacity: 1,
      fillColor: 'rgba(103,0,13,1.0)',
      interactive: true,
  }*/
  /*        break;
  }*/
}

function style_ProbIgnicion(feature) {
  switch(String(feature.properties['label'])) {
      case '10':
          return {
      stroke: false, 
      fill: true,
      fillOpacity: 1,
      fillColor: 'rgba(193,120,229,1.0)',
      interactive: true,
  }
          break;
      case '20':
          return {
      stroke: false, 
      fill: true,
      fillOpacity: 1,
      fillColor: 'rgba(0,114,255,1.0)',
      interactive: true,
  }
          break;
      case '30':
          return {
      stroke: false, 
      fill: true,
      fillOpacity: 1,
      fillColor: 'rgba(0,175,255,1.0)',
      interactive: true,
  }
          break;
      case '40':
          return {
      stroke: false, 
      fill: true,
      fillOpacity: 1,
      fillColor: 'rgba(0,237,255,1.0)',
      interactive: true,
  }
          break;
      case '50':
          return {
      stroke: false, 
      fill: true,
      fillOpacity: 1,
      fillColor: 'rgba(34,154,0,1.0)',
      interactive: true,
  }
          break;
      case '60':
          return {
      stroke: false, 
      fill: true,
      fillOpacity: 1,
      fillColor: 'rgba(247,255,0,1.0)',
      interactive: true,
  }
          break;
      case '70':
          return {
      stroke: false, 
      fill: true,
      fillOpacity: 1,
      fillColor: 'rgba(255,204,0,1.0)',
      interactive: true,
  }
          break;
      case '80':
          return {
      stroke: false, 
      fill: true,
      fillOpacity: 1,
      fillColor: 'rgba(255,153,0,1.0)',
      interactive: true,
  }
          break;
      case '90':
          return {
      stroke: false, 
      fill: true,
      fillOpacity: 1,
      fillColor: 'rgba(255,102,0,1.0)',
      interactive: true,
  }
          break;
      case '100':
          return {
      stroke: false, 
      fill: true,
      fillOpacity: 1,
      fillColor: 'rgba(241,24,16,1.0)',
      interactive: true,
  }
          break;
  }
}

function style_VViento(feature) {
  switch(String(feature.properties['label'])) {
      case '1':
          return {
      stroke: false, 
      fill: true,
      fillOpacity: 1,
      fillColor: 'rgba(92,162,209,1.0)',
      interactive: true,
  }
          break;
      case '2':
          return {
      stroke: false, 
      fill: true,
      fillOpacity: 1,
      fillColor: 'rgba(5,93,0,1.0)',
      interactive: true,
  }
          break;
      case '3':
          return {
      stroke: false, 
      fill: true,
      fillOpacity: 1,
      fillColor: 'rgba(34,154,0,1.0)',
      interactive: true,
  }
          break;
      case '4':
          return {
      stroke: false, 
      fill: true,
      fillOpacity: 1,
      fillColor: 'rgba(178,223,138,1.0)',
      interactive: true,
  }
          break;
      case '5':
          return {
      stroke: false, 
      fill: true,
      fillOpacity: 1,
      fillColor: 'rgba(255,247,0,1.0)',
      interactive: true,
  }
          break;
      case '6':
          return {
      stroke: false, 
      fill: true,
      fillOpacity: 1,
      fillColor: 'rgba(255,204,0,1.0)',
      interactive: true,
  }
          break;
      case '7':
          return {
      stroke: false, 
      fill: true,
      fillOpacity: 1,
      fillColor: 'rgba(249,157,89,1.0)',
      interactive: true,
  }
          break;
      case '8':
          return {
      stroke: false, 
      fill: true,
      fillOpacity: 1,
      fillColor: 'rgba(227,26,28,1.0)',
      interactive: true,
  }
          break;
  }
}

function style_HCFM(feature) {
  switch(String(feature.properties['label'])) {
      case '1':
          return {
      stroke: false, 
      fill: true,
      fillOpacity: 1,
      fillColor: 'rgba(255,0,197,1.0)',
      interactive: true,
  }
          break;
      case '2':
          return {
      stroke: false, 
      fill: true,
      fillOpacity: 1,
      fillColor: 'rgba(168,0,0,1.0)',
      interactive: true,
  }
          break;
      case '3':
          return {
      stroke: false, 
      fill: true,
      fillOpacity: 1,
      fillColor: 'rgba(255,0,0,1.0)',
      interactive: true,
  }
          break;
      case '4':
          return {
      stroke: false, 
      fill: true,
      fillOpacity: 1,
      fillColor: 'rgba(255,188,0,1.0)',
      interactive: true,
  }
          break;
      case '5':
          return {
      stroke: false, 
      fill: true,
      fillOpacity: 1,
      fillColor: 'rgba(255,255,0,1.0)',
      interactive: true,
  }
          break;
      case '6':
          return {
      stroke: false, 
      fill: true,
      fillOpacity: 1,
      fillColor: 'rgba(163,255,115,1.0)',
      interactive: true,
  }
          break;
      case '7':
          return {
      stroke: false, 
      fill: true,
      fillOpacity: 1,
      fillColor: 'rgba(76,230,0,1.0)',
      interactive: true,
  }
          break;
      case '8':
          return {
      stroke: false, 
      fill: true,
      fillOpacity: 1,
      fillColor: 'rgba(38,115,0,1.0)',
      interactive: true,
  }
          break;
      case '9':
          return {
      stroke: false, 
      fill: true,
      fillOpacity: 1,
      fillColor: 'rgba(115,178,255,1.0)',
      interactive: true,
  }
          break;
      case '10':
          return {
      stroke: false, 
      fill: true,
      fillOpacity: 1,
      fillColor: 'rgba(0,9,255,1.0)',
      interactive: true,
  }
          break;
  }
}

function style_HR(feature) {
  switch(String(feature.properties['label'])) {
      case '1':
          return {
      stroke: false, 
      fill: true,
      fillOpacity: 1,
      fillColor: 'rgba(255,0,197,1.0)',
      interactive: true,
  }
          break;
      case '2':
          return {
      stroke: false, 
      fill: true,
      fillOpacity: 1,
      fillColor: 'rgba(133,2,0,1.0)',
      interactive: true,
  }
          break;
      case '3':
          return {
      stroke: false, 
      fill: true,
      fillOpacity: 1,
      fillColor: 'rgba(255,0,0,1.0)',
      interactive: true,
  }
          break;
      case '4':
          return {
      stroke: false, 
      fill: true,
      fillOpacity: 1,
      fillColor: 'rgba(255,188,0,1.0)',
      interactive: true,
  }
          break;
      case '5':
          return {
      stroke: false, 
      fill: true,
      fillOpacity: 1,
      fillColor: 'rgba(255,255,0,1.0)',
      interactive: true,
  }
          break;
      case '6':
          return {
      stroke: false, 
      fill: true,
      fillOpacity: 1,
      fillColor: 'rgba(163,255,115,1.0)',
      interactive: true,
  }
          break;
      case '7':
          return {
      stroke: false, 
      fill: true,
      fillOpacity: 1,
      fillColor: 'rgba(76,230,0,1.0)',
      interactive: true,
  }
          break;
      case '8':
          return {
      stroke: false, 
      fill: true,
      fillOpacity: 1,
      fillColor: 'rgba(38,115,0,1.0)',
      interactive: true,
  }
          break;
      case '9':
          return {
      stroke: false, 
      fill: true,
      fillOpacity: 1,
      fillColor: 'rgba(115,178,255,1.0)',
      interactive: true,
  }
          break;
      case '10':
          return {
      stroke: false, 
      fill: true,
      fillOpacity: 1,
      fillColor: 'rgba(0,53,255,1.0)',
      interactive: true,
  }
          break;
  }
}

function style_Temp(feature) {
  switch(String(feature.properties['label'])) {
      case '1':
          return {
      stroke: false, 
      fill: true,
      fillOpacity: 1,
      fillColor: 'rgba(0,53,255,1.0)',
      interactive: true,
  }
          break;
      case '2':
          return {
      stroke: false, 
      fill: true,
      fillOpacity: 1,
      fillColor: 'rgba(92,162,209,1.0)',
      interactive: true,
  }
          break;
      case '3':
          return {
      stroke: false, 
      fill: true,
      fillOpacity: 1,
      fillColor: 'rgba(5,93,0,1.0)',
      interactive: true,
  }
          break;
      case '4':
          return {
      stroke: false, 
      fill: true,
      fillOpacity: 1,
      fillColor: 'rgba(48,196,7,1.0)',
      interactive: true,
  }
          break;
      case '5':
          return {
      stroke: false, 
      fill: true,
      fillOpacity: 1,
      fillColor: 'rgba(255,247,0,1.0)',
      interactive: true,
  }
          break;
      case '6':
          return {
      stroke: false, 
      fill: true,
      fillOpacity: 1,
      fillColor: 'rgba(255,204,0,1.0)',
      interactive: true,
  }
          break;
      case '7':
          return {
      stroke: false, 
      fill: true,
      fillOpacity: 1,
      fillColor: 'rgba(255,102,0,1.0)',
      interactive: true,
  }
          break;
      case '8':
          return {
      stroke: false, 
      fill: true,
      fillOpacity: 1,
      fillColor: 'rgba(227,26,28,1.0)',
      interactive: true,
  }
          break;
      case '9':
          return {
      stroke: false, 
      fill: true,
      fillOpacity: 1,
      fillColor: 'rgba(133,2,0,1.0)',
      interactive: true,
  }
          break;
  }
}

// MENÚ MÓVIL /////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//  seleccionamos los dos elementos que serán clickables

const toggleButton = document.getElementById("button-menu");
const navWrapper = document.getElementById("main-navigation");

/* 
  cada vez que se haga click en el botón 
  agrega y quita las clases necesarias 
  para que el menú se muestre.
*/
toggleButton.addEventListener("click", () => {
  toggleButton.classList.toggle("close");
  navWrapper.classList.toggle("show");
});

/* 
  Cuándo se haga click fuera del contenedor de enlaces 
  el menú debe esconderse.
*/

navWrapper.addEventListener("click", e => {
  if (e.target.id === "main-navigation") {
    navWrapper.classList.remove("show");
    toggleButton.classList.remove("close");
  }
});