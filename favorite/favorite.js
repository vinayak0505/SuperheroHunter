start();
var items = [];
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
    document.getElementById("list").innerHTML += (
        `
        <div class = "list-item">
            <img src="${data.thumbnail.path + "." + data.thumbnail.extension}" alt="Avatar">
            <div class="container">
                <h4><b>${data.name}</b></h4>
                <p>${data.description}</p>
            </div>
        </div>
        `
    );
}

function addItem(data) {
    items.push(data);
    localStorage.setItem("data", JSON.stringify(items));
}

function getItems() {
    items = JSON.parse(localStorage.getItem("data"));
}