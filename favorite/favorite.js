// fav items from local storage
var items = [];
start();
// loads data first time from the local storage
async function start() {
    try {
        getItems();
        for (var i in items) {
            addElement(items[i]);
        }
    } catch (error) {
        console.log(error);
        document.getElementById("list").innerHTML = "error";
    }
}

/**
 * 
 * @param {*} data fav item data that need to be displayed 
 */
function addElement(data) {
    document.getElementById("list").innerHTML += (
        `
        <button type="button" onclick="location.href='../details/index2.html?id=${data.id}'">
            <div class = "list-item">
                <img src="${data.thumbnail.path + "." + data.thumbnail.extension}" alt="Avatar">
                <div class="container">
                    <h4><b>${data.name}</b>
                    <img class ="fav-img" onclick="event.cancelBubble = true; changeFav(event,${data.id})"
                    src='../assets/heart_selected.png'>
                    </h4>
                    <p>${data.description}</p>
                </div>
            </div>
        </button>
        `
    );
}

// update fav items in list and screen
function changeFav(e, id) {
    e.stopPropagation();
    deleteItem(id);
    loadData();
    return false;
}

// delete fav item from localStorage
function deleteItem(id) {
    items = items.filter(e => e.id != id);
    localStorage.setItem("data", JSON.stringify(items));
}

// gets item from local storage
function getItems() {
    items = JSON.parse(localStorage.getItem("data")) ?? [];
}

// reloads item when after list is updaed
function loadData() {
    clearScreen();
    for (var i in items) {
        addElement(items[i]);
    }
}

// empty the list items screen
function clearScreen() {
    document.getElementById("list").innerHTML = "";
}