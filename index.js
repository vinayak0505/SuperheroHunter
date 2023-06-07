// items that saved in fav
var favItems = [];

// all items the came back from marvel api
var resultItems = [];

start();

// get md5 key to pass in marvel api
async function getKey() {
    var key = await md5(Math.floor(Date.now() / 1000) + "28257c71de0ea96da933ca450efc4b009c35fed8" + "22e3e37654e8e2e4aa6243fa7f5ff6a0");
    return key;
}

async function start(value) {
    try {
        getItems();
        setScreenToLoading();
        var key = await getKey();
        var response;
        if (value)
            response = await fetch(`https://gateway.marvel.com:443/v1/public/characters?apikey=22e3e37654e8e2e4aa6243fa7f5ff6a0&hash=${key}&nameStartsWith=${value}`);
        else
            response = await fetch(`https://gateway.marvel.com:443/v1/public/characters?apikey=22e3e37654e8e2e4aa6243fa7f5ff6a0&hash=${key}`);
        const jsonData = await response.json();
        resultItems = jsonData.data.results;
        loadData(jsonData);
    } catch (error) {
        console.log(error);
        document.getElementById("list").innerHTML = "error";
    }
}

function loadData() {
    clearScreen();
    for (var i in resultItems) {
        addElement(resultItems[i]);
    }
}

function clearScreen() {
    document.getElementById("list").innerHTML = "";
}

function setScreenToLoading() {
    document.getElementById("list").innerHTML = `
    <img id = "loading" src="./assets/loading.gif"></img>
    `;
}

function addElement(data) {
    var has = favItems.some(item => item.id === data.id);
    document.getElementById("list").innerHTML += (
        `
        <button type="button" onclick="location.href='./details/index2.html?id=${data.id}'">
            <div class = "list-item">
                <img src="${data.thumbnail.path + "." + data.thumbnail.extension}" alt="Avatar">
                <div class="container">
                    <h4><b>${data.name}</b>
                    <img class ="fav-img" onclick="event.cancelBubble = true; changeFav(event,${data.id})"
                    src='${has ? "./assets/heart_selected.png" : "./assets/heart_unselected.png"}'>
                    </h4>
                    <p>${data.description}</p>
                </div>
            </div>
        </button>
        `
    );
}

let timer;
// debouncer made so that the api is not hit every time the input changes
function debounce(func, args, timeout = 1000) {
    clearTimeout(timer);
    timer = setTimeout(() => { func.call(this, args); }, timeout);
}

document.getElementById('search').addEventListener('input', (events) => {
    debounce(search, events);
});


function search(events) {
    start(document.getElementById('search').value);
}

/**
 * 
 * @param {Event} e event e to stop click even to propagrate further
 * @param {Integer} id item id that need to be toggle from fav
 * @returns void
 */
function changeFav(e, id) {
    e.stopPropagation();
    var val = favItems.find((e) => e.id == id);
    if (val) {
        deleteItem(id);
    } else {
        addItem(id);
    }

    loadData();
    return false;
}

// addes item with the given id
function addItem(id) {
    var item = resultItems.find((e) => e.id == id)
    favItems.push(item);
    localStorage.setItem("data", JSON.stringify(favItems));
}

// deletes item with the given id
function deleteItem(id) {
    favItems = favItems.filter(e => e.id != id);
    localStorage.setItem("data", JSON.stringify(favItems));
}

// get all fav items store in local storage
function getItems() {
    favItems = JSON.parse(localStorage.getItem("data")) ?? [];
}