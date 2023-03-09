import data from "./data.js"

let eventcard = document.getElementById("cardcontainer");

let eventsarray = data.events;

const fragment = document.createDocumentFragment();

/*INSERT CARD */
function armarCard(array, container) {
    container.innerHTML = "";
    for (let nuevacard of array) {
        let div = document.createElement("div")
        div.className = "card"
        div.innerHTML += `<img src="${nuevacard.image}" class="card-img-top"
        alt="...">
    <div class="card-body">
        <h5 class="card-title">${nuevacard.name}</h5>
        <p class="card-text">${nuevacard.category}</p>
        <p>$ ${nuevacard.price}.00</p>
        <a href="../pages/details.html?id=${nuevacard._id}" class="btn btn-primary">Go to event</a>
    </div>`
        fragment.appendChild(div);
    }
    container.appendChild(fragment);
}

armarCard(eventsarray, eventcard);
/**CATEGORIES ARRAY + CHECKBOXES */
const $checkboxes = document.getElementById("checkboxes");

const createCategories = (array) => {
    let categories = array.map(category => category.category)
    let categoriesUnrepeat = [...(new Set(categories))]
    return categoriesUnrepeat
}

let categories = createCategories(eventsarray);

const createCheck = (categories, $checkboxes) => {
    categories.forEach(category => {
        let div = document.createElement('div')
        div.className = `form-check`
        div.innerHTML = `
        <input class="form-check-input" type="checkbox" value="${category}" id="${category}" name="categories">
        <label class="form-check-label" for="${category}">${category}</label>
        `
        $checkboxes.appendChild(div)
    })
}

createCheck(categories, $checkboxes)

const filterCheck = (array) => {
    let checked = Array.from(document.querySelectorAll('input[type="checkbox"]:checked'));
    let reChecked = checked.map(e => e.id.toLocaleLowerCase())
    let filterChecks = array.filter(element => reChecked.includes(element.category.toLowerCase()))
    console.log(filterChecks);
    if (filterChecks.length > 0) {
        return filterChecks
    } else {
        return array
    }
}
/**FILTRO SEARCH */
const $search = document.getElementById("search");

const filterSearch = (array, value) => {
    let filteredArray = array.filter(e => e.name.toLowerCase().includes(value.toLocaleLowerCase()))
    return filteredArray
}

/**FUNCION FILTROS CONJUNTOS */

const filterAndPrint = (array) => {
    let newArray = filterCheck(array)
    newArray = filterSearch(newArray, $search.value)
    return newArray
}

/**EVENTOS  */
$checkboxes.addEventListener('change', () => {
    let filterData = filterAndPrint(eventsarray)
    if (filterData.length === 0) {
        eventcard.innerHTML =
            `
        <h4>No se encontraron resultados</h4>
        `
    } else {
        eventcard.innerHTML = "";
        armarCard(filterData, eventcard);
    }
})

$search.addEventListener('keyup', (e) => {
    let filterData = filterAndPrint(eventsarray)
    if (filterData.length === 0) {
        eventcard.innerHTML =
            `
        <h4>No se encontraron resultados</h4>
        `
    } else {
        eventcard.innerHTML = "";
        armarCard(filterData, eventcard);
    }
})

