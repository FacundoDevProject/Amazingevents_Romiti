import data from "./data.js"

let eventcard = document.getElementById("cardcontainer");
/**RUTA */
const queryString = location.search
/*PARAMETRO */
const params = new URLSearchParams(queryString)
/*ID */
const id = params.get("id")
const selectedEvent = data.events.find(event => event._id == id)

function armarCard(card, container) {
    container.innerHTML = "";
    let div = document.createElement("div")
    div.classList = 'card-big'
    div.className = "card-big"
    div.innerHTML += `
    <img src="${card.image}" class="card-img-top"
        alt="...">
    <div class="card-body">
        <h4 class="card-title"><h4>Name of the event: </h4>${card.name}</h4>
        <p class="card-text"><h4>Classification: </h4>${card.category}</p>
        <p class="card-text"></p><h4>Event location: </h4>${card.place}
        <p class="card-text"></p><h4>Estimated date: </h4>${card.date}
        <p class="card-text"><h4>About event: </h4>${card.description}</p>
        <p class="card-text"><h4>Attendance crowd average: </h4>${card.capacity}</p>
        <p><h4>Cost of event: </h4>$${card.price}</p>
    </div>
    `
    container.appendChild(div);
}

armarCard(selectedEvent, eventcard);