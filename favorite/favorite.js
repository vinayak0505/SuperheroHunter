var items = [];
start();

async function start() {
    try {
        getItems();
        console.log(items);
        for (var i in items) {
            addElement(items[i]);
        }
    } catch (error) {
        console.log(error);
        document.getElementById("list").innerHTML = "error";
    }
}

function addElement(data) {
    console.log(data);
    document.getElementById("list").innerHTML += (
        `
        <button type="button" onclick="location.href='../index2.html?id=${data.id}'">
            <div class = "list-item">
                <img src="${data.thumbnail.path + "." + data.thumbnail.extension}" alt="Avatar">
                <div class="container">
                    <h4><b>${data.name}</b>
                    <img class ="fav-img" onclick="event.cancelBubble = true; changeFav(event,${data.id})"
                    src='../heart_selected.png'>
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
    deleteItem(id);
    loadData();
    return false;
}

function deleteItem(id) {
    console.log(id);
    console.log(items);
    items = items.filter(e => e.id != id);
    console.log(items);
    localStorage.setItem("data", JSON.stringify(items));
}


function getItems() {
    items = JSON.parse(localStorage.getItem("data")) ?? [];
}

function loadData() {
    clearScreen();
    for (var i in items) {
        addElement(items[i]);
    }
}

function clearScreen() {
    document.getElementById("list").innerHTML = "";
}