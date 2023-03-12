let container = document.getElementById("cardcontainer");

let categories = [];

let eventsarray = [];

const fragment = document.createDocumentFragment();

const $checkboxes = document.getElementById("checkboxes");

/*API CONNECT */

async function getData() {
    try {
        let apiUrl = './assets/js/amazingevents.json'
        let response = await fetch(apiUrl);
        let data = await response.json();
        eventsarray = data.events;
        categories = createCategories(eventsarray);
        armarCard(eventsarray, container);
        createCheck(categories, $checkboxes);
    }
    catch (error) {
        console.log(error);
    }
}

getData()


/**CATEGORIES ARRAY + CHECKBOXES */


const createCategories = (data) => {
    let categories = data.map(category => category.category)
    let categoriesUnrepeat = [...(new Set(categories))]
    return categoriesUnrepeat
}



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

const filterCheck = (array) => {
    let checked = Array.from(document.querySelectorAll('input[type="checkbox"]:checked'));
    let reChecked = checked.map(e => e.value.toLocaleLowerCase())
    let filterChecks = array.filter(element => reChecked.includes(element.category.toLowerCase()))
    console.log(filterChecks);
    if (filterChecks.length > 0) {
        return filterChecks
    } else {
        return array
    }
}

/*INSERT CARD */

function armarCard(eventsarray, eventcard) {
    eventcard.innerHTML = "";
    for (let nuevacard of eventsarray) {
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

armarCard(eventsarray, container);

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
        container.innerHTML =
            `
        <h4>No se encontraron resultados</h4>
        `
    } else {
        container.innerHTML = "";
        armarCard(filterData, container);
    }
})

$search.addEventListener('keyup', (e) => {
    let filterData = filterAndPrint(eventsarray)
    if (filterData.length === 0) {
        container.innerHTML =
            `
        <h4>No se encontraron resultados</h4>
        `
    } else {
        container.innerHTML = "";
        armarCard(filterData, container);
    }
})

