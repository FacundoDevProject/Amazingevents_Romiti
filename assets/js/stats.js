let categories = [];

let eventsarray = [];

async function getData() {
    try {
        let apiUrl = '../assets/js/amazingevents.json'
        let response = await fetch(apiUrl);
        let data = await response.json();
        console.log(data);
        eventsarray = data.events;
        categories = createCategories(eventsarray);
    }
    catch (error) {
        console.log(error);
    }
}
getData()
/* Necesario para que funcion Get Data */
const createCategories = (data) => {
    let categories = data.map(category => category.category)
    let categoriesUnrepeat = [...(new Set(categories))]
    return categoriesUnrepeat
}

/* PRIMERA TABLA
EN PRIMER COLUMNA: EVENTO CON MAYOR PORCENTAJE DE ASISTENCIA DEL ARRAY DE TODOS LOS EVENTOS.
SORT() Y QUE ENTREGUE EL PRIMER VALOR (ORDENANDO DE MAYOR A MENOR)

SEGUNDA COLUMNA: EVENTO CON MENOR PORCENTAJE DE ASISTENCIA DEL ARRAY DE TODOS LOS EVENTOS
SORT() Y QUE ENTREGUE EL PRIMER VALOR (ORDENANDO DE MENOR A MAYOR)

TERCER COLUMNA: EVENTO CON MAYOR CAPACIDAD DE TODOS.
SORT() A CAPACITY Y MISMA FUNCION QUE COLUMNA 1
*/

/* SEGUNDA Y TERCER TABLA:
CON LOS ARRAY DE UPCOMING EVENTS Y PAST EVENTS RESPECTIVAMENTE, O CON EL ARRAY TOTAL FILTRADO POR FECHA ">" "<"
REALIZAR
PRIMER COLUMNA: COLOCAR UN TODAS LAS CATEGORIAS
SEGUNDA COLUMNA: USAR UN ACUMULADOR PARA SUMAR LAS GANANCIAS DE EVENTOS POR CATEGORIA
TERCER COLUMNA: MISMO QUE DOS PERO CON ASISTENCIA */

/* function crearTable() {
    let body = document.getElementsByTagName("body")[0];
    let table = document.createElement("table");
    body.appendChild(table);

    let tblBody = document.createElement("tbody");
    table.appendChild(tblBody);

    for (let i = 0; i < 3; i++) {
        let hilera = document.createElement("tr");
        for (let j = 0; j < 3; j++) {
            let celda = document.createElement("td");
            let textoCelda = document.createTextNode("Texto a completar" + j);
            celda.appendChild(textoCelda);
            hilera.appendChild(celda);
        }
        tblBody.appendChild(hilera);
    }
    let cell1 = document.createElement("td");
    let maxAttendanceEvent = eventsarray.sort((a, b) => ((b.assistance) / (b.capacity)) - ((a.assistance) / (a.capacity))[0]);
    let maxAttendanceText = document.createTextNode(maxAttendanceEvent.name);
    cell1.appendChild(maxAttendanceText);
    hilera.appendChild(cell1);
    table.setAttribute("border", "2");
}

crearTable(); */

function crearTable() {
    let body = document.getElementsByTagName("body")[0];
    let table = document.createElement("table");
    body.appendChild(table);

    let tblBody = document.createElement("tbody");
    table.appendChild(tblBody);

    let row1 = document.createElement("tr");
    let cell1 = document.createElement("td");
    let maxAttendanceEvent = eventsarray.sort((a, b) => ((b.assistance) / (b.capacity)) - ((a.assistance) / (a.capacity)))[0];
    let maxAttendanceText = document.createTextNode(maxAttendanceEvent.name);
    cell1.appendChild(maxAttendanceText);
    row1.appendChild(cell1);


}


