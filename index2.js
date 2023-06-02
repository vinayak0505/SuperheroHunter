const urlParams = new URLSearchParams(window.location.search);
const myParam = urlParams.get('id');

async function getKey() {
    var key = await md5(Math.floor(Date.now() / 1000) + "28257c71de0ea96da933ca450efc4b009c35fed8" + "22e3e37654e8e2e4aa6243fa7f5ff6a0");
    console.log(key);
    return key;
}

start();
async function start() {
    var key = await getKey();
    var response = await fetch(`https://gateway.marvel.com:443/v1/public/characters/${myParam}?apikey=22e3e37654e8e2e4aa6243fa7f5ff6a0&hash=${key}`);
    const jsonData = await response.json();
    // const jsonData = getData();
    console.log(jsonData);
    setData(jsonData.data.results[0]);
}

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

function addItems(data, name) {
    for (var i in data) {
        var item = data[i].name.split('#')[0];
        document.getElementById(`list-${name}`).innerHTML +=
            `
            <li>${item}</li>
            `
    }
}

function getData() {
    return {
        "code": 200,
        "status": "Ok",
        "copyright": "© 2023 MARVEL",
        "attributionText": "Data provided by Marvel. © 2023 MARVEL",
        "attributionHTML": "Data provided by Marvel. © 2023 MARVEL",
        "etag": "a0e24d410b8c2da8d79c7da95dd6b4eeeb5b2eea",
        "data": {
            "offset": 0,
            "limit": 20,
            "total": 1,
            "count": 1,
            "results": [
                {
                    "id": 1017100,
                    "name": "A-Bomb (HAS)",
                    "description": "Rick Jones has been Hulk's best bud since day one, but now he's more than a friend...he's a teammate! Transformed by a Gamma energy explosion, A-Bomb's thick, armored skin is just as strong and powerful as it is blue. And when he curls into action, he uses it like a giant bowling ball of destruction! ",
                    "modified": "2013-09-18T15:54:04-0400",
                    "thumbnail": {
                        "path": "http://i.annihil.us/u/prod/marvel/i/mg/3/20/5232158de5b16",
                        "extension": "jpg"
                    },
                    "resourceURI": "http://gateway.marvel.com/v1/public/characters/1017100",
                    "comics": {
                        "available": 4,
                        "collectionURI": "http://gateway.marvel.com/v1/public/characters/1017100/comics",
                        "items": [
                            {
                                "resourceURI": "http://gateway.marvel.com/v1/public/comics/47176",
                                "name": "FREE COMIC BOOK DAY 2013 1 (2013) #1"
                            },
                            {
                                "resourceURI": "http://gateway.marvel.com/v1/public/comics/40632",
                                "name": "Hulk (2008) #53"
                            },
                            {
                                "resourceURI": "http://gateway.marvel.com/v1/public/comics/40630",
                                "name": "Hulk (2008) #54"
                            },
                            {
                                "resourceURI": "http://gateway.marvel.com/v1/public/comics/40628",
                                "name": "Hulk (2008) #55"
                            }
                        ],
                        "returned": 4
                    },
                    "series": {
                        "available": 2,
                        "collectionURI": "http://gateway.marvel.com/v1/public/characters/1017100/series",
                        "items": [
                            {
                                "resourceURI": "http://gateway.marvel.com/v1/public/series/17765",
                                "name": "FREE COMIC BOOK DAY 2013 1 (2013)"
                            },
                            {
                                "resourceURI": "http://gateway.marvel.com/v1/public/series/3374",
                                "name": "Hulk (2008 - 2012)"
                            }
                        ],
                        "returned": 2
                    },
                    "stories": {
                        "available": 7,
                        "collectionURI": "http://gateway.marvel.com/v1/public/characters/1017100/stories",
                        "items": [
                            {
                                "resourceURI": "http://gateway.marvel.com/v1/public/stories/92078",
                                "name": "Hulk (2008) #55",
                                "type": "cover"
                            },
                            {
                                "resourceURI": "http://gateway.marvel.com/v1/public/stories/92079",
                                "name": "Interior #92079",
                                "type": "interiorStory"
                            },
                            {
                                "resourceURI": "http://gateway.marvel.com/v1/public/stories/92082",
                                "name": "Hulk (2008) #54",
                                "type": "cover"
                            },
                            {
                                "resourceURI": "http://gateway.marvel.com/v1/public/stories/92083",
                                "name": "Interior #92083",
                                "type": "interiorStory"
                            },
                            {
                                "resourceURI": "http://gateway.marvel.com/v1/public/stories/92086",
                                "name": "Hulk (2008) #53",
                                "type": "cover"
                            },
                            {
                                "resourceURI": "http://gateway.marvel.com/v1/public/stories/92087",
                                "name": "Interior #92087",
                                "type": "interiorStory"
                            },
                            {
                                "resourceURI": "http://gateway.marvel.com/v1/public/stories/105929",
                                "name": "cover from Free Comic Book Day 2013 (Avengers/Hulk) (2013) #1",
                                "type": "cover"
                            }
                        ],
                        "returned": 7
                    },
                    "events": {
                        "available": 0,
                        "collectionURI": "http://gateway.marvel.com/v1/public/characters/1017100/events",
                        "items": [],
                        "returned": 0
                    },
                    "urls": [
                        {
                            "type": "detail",
                            "url": "http://marvel.com/characters/76/a-bomb?utm_campaign=apiRef&utm_source=22e3e37654e8e2e4aa6243fa7f5ff6a0"
                        },
                        {
                            "type": "comiclink",
                            "url": "http://marvel.com/comics/characters/1017100/a-bomb_has?utm_campaign=apiRef&utm_source=22e3e37654e8e2e4aa6243fa7f5ff6a0"
                        }
                    ]
                }
            ]
        }
    };
}