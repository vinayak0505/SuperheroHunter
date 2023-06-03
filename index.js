var items = [];
var listData = [];

async function getKey() {
    var key = await md5(Math.floor(Date.now() / 1000) + "28257c71de0ea96da933ca450efc4b009c35fed8" + "22e3e37654e8e2e4aa6243fa7f5ff6a0");
    console.log(key);
    return key;
}

getItems();
start();

function sleep(milliseconds) {
    return new Promise(resolve => {
        setTimeout(resolve, milliseconds);
    });
}
async function start(value) {
    try {
        setScreenToLoading();
        var key = await getKey();
        var response;
        if (value)
            response = await fetch(`https://gateway.marvel.com:443/v1/public/characters?apikey=22e3e37654e8e2e4aa6243fa7f5ff6a0&hash=${key}&nameStartsWith=${value}`);
        else
            response = await fetch(`https://gateway.marvel.com:443/v1/public/characters?apikey=22e3e37654e8e2e4aa6243fa7f5ff6a0&hash=${key}`);
        const jsonData = await response.json();
        listData = jsonData.data.results;
        loadData(jsonData);
    } catch (error) {
        document.getElementById("test").innerHTML = "error";
    }
}

function loadData() {
    clearScreen();
    for (var i in listData) {
        addElement(listData[i]);
    }
}

function addElement(data) {
    var has = items.some(item => item.id === data.id);
    document.getElementById("list").innerHTML += (
        `
        <button type="button" onclick="location.href='./index2.html?id=${data.id}'">
            <div class = "list-item">
                <img src="${data.thumbnail.path + "." + data.thumbnail.extension}" alt="Avatar">
                <div class="container">
                    <h4><b>${data.name}</b>
                    <img class ="fav-img" onclick="event.cancelBubble = true; changeFav(event,${data.id})"
                    src='${has ? "./heart_selected.png" : "./heart_unselected.png"}'>
                    </h4>
                    <p>${data.description}</p>
                </div>
            </div>
        </button>
        `
    );
}

function changeFav(e, id) {
    e.stopPropagation();
    var item = listData.find((e) => e.id == id)
    addItem(item);
    loadData();
    return false;
}

function clearScreen() {
    document.getElementById("list").innerHTML = "";
}
function setScreenToLoading() {
    document.getElementById("list").innerHTML = `
    <img id = "loading" src="./loading.gif"></img>
    `;
}

let timer;
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

function addItem(data) {
    items.push(data);
    localStorage.setItem("data", JSON.stringify(items));
}

function getItems() {
    items = JSON.parse(localStorage.getItem("data"));
}