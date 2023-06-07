const urlParams = new URLSearchParams(window.location.search);
const myParam = urlParams.get('id');

async function getKey() {
    var key = await md5(Math.floor(Date.now() / 1000) + "28257c71de0ea96da933ca450efc4b009c35fed8" + "22e3e37654e8e2e4aa6243fa7f5ff6a0");
    return key;
}

start();
async function start() {
    var key = await getKey();
    var response = await fetch(`https://gateway.marvel.com:443/v1/public/characters/${myParam}?apikey=22e3e37654e8e2e4aa6243fa7f5ff6a0&hash=${key}`);
    const jsonData = await response.json();
    setData(jsonData.data.results[0]);
}


// displays all the detail data
function setData(data) {
    document.getElementById('title').innerHTML = data.name;
    document.getElementById('description').innerHTML = data.description;
    document.getElementById('image').src = data.thumbnail.path + '.'+ data.thumbnail.extension;
    document.getElementById('bg-image').style.backgroundImage = 
    `url(${data.thumbnail.path + '.'+ data.thumbnail.extension})`;
    // background-image: url('./marvel.webp');
    addSections(data, "comics");
    addSections(data, "series");
    addSections(data, "stories");
    addSections(data, "events");
}

// addes new section if available
function addSections(data, name) {
    if (data[name].available == 0) return;
    document.getElementById('about-section').innerHTML +=
        `
        <section id = "${name}">
        <h3> ${name} </h3>
            <ol id = "list-${name}">
            </ol>
        </section>
        `;
    addItems(data[name].items, name);
}

// addes items to the list inside a section
function addItems(data, name) {
    for (var i in data) {
        var item = data[i].name.split('#')[0];
        document.getElementById(`list-${name}`).innerHTML +=
            `
            <li>${item}</li>
            `
    }
}