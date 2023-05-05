let data = {
    shown: null,
    intervalID: null,
    images: null,
    status: null,
    paused: false,
    speed: null,
}

const ordered_ids = [9, 6, 5, 10, 14, 2, 4, 7, 1, 11, 8, 13, 0, 15, 3, 12];

function faderem(elm) {
    if (elm.id == "start" || elm.id == "stop") data.status = "off";
    elm.style.opacity = "0";
    setTimeout(() => elm.style.display = "none", 1100);
}

function fadeadd(elm) {
    if (elm.id == "start" || elm.id == "stop") data.status = elm.id;
    elm.style.display = "block";
    setTimeout(() => elm.style.opacity = "1", 200);
}

function hide_tlo() {
    console.log("Hiding top level outline")
    document.getElementById("cover").className = "covers hidden-outline";
}
function show_tlo() {
    console.log("Showing top level outline")
    document.getElementById("cover").className = "covers";
}

function hide(x) {
    console.log("Hiding box", x)
    document.getElementsByClassName("box")[x].className = "box hidden";
}
function hide_outline(x) {
    console.log("Hiding outline", x)
    document.getElementsByClassName("box")[x].className = "box hidden hidden-outline";
}
function show(x) {
    console.log("Showing box", x)
    document.getElementsByClassName("box")[x].className = "box";
}
function show_no_outline(x) {
    console.log("Showing box", x)
    document.getElementsByClassName("box")[x].className = "box hidden-outline";
}
function show_half(x) {
    console.log("Half-showing box", x)
    document.getElementsByClassName("box")[x].className = "box half";
}

function choose() {
    if (data.paused) {
        return;
    }
    if (data.shown.length <= 0) {
        stop_automated();
        return;
    }
    hide(data.shown.pop());
}

function stop_manual() {
    stop();
    for (let id of data.shown) {
        show_half(id);
    }
    document.getElementById("popup-won").innerText = data.shown.length;
    setTimeout(() => fadeadd(document.getElementById("popup-won")), 1500);
}

function stop_automated() {
    stop();
    setTimeout(() => fadeadd(document.getElementById("popup-lost")), 1500);
}

function stop() {
    clearInterval(data.intervalID);
    faderem(document.getElementById("stop"));
    setTimeout(() => {
        document.getElementById("popup-won").className = "less";
        document.getElementById("popup-lost").className = "less";
    }, 4000)
    setTimeout(() => {
        hide_tlo()
        for (let id of ordered_ids) {
            hide_outline(id);
        }
        setTimeout(() => document.getElementById("img").className = "impo", 3000);
    }, 6000)
    setTimeout(() => fadeadd(document.getElementById("start")), 10000);
}

function start() {
    faderem(document.getElementById("start"));
    faderem(document.getElementById("popup-won"));
    faderem(document.getElementById("popup-lost"));
    document.getElementById("img").className = "";
    if (data.images.length == 0) {
        setTimeout(() => {
            hide_tlo()
            for (let id of ordered_ids) {
                show_no_outline(id);
            }
            setTimeout(() => document.getElementById("img").src = "ImageRevealFinished.png", 1000)
            setTimeout(() => {
                hide_tlo()
                for (let id of ordered_ids) {
                    hide_outline(id);
                }
            }, 2000)
        }, 1000)
        return;
    }
    setTimeout(() => {
        data.shown = [...ordered_ids].sort(() => Math.random() - 0.5);
        show_tlo();
        for (let id of data.shown) {
            show(id);
        }
        setTimeout(() => {
            let image = data.images.pop()
            console.log(image.answer)
            document.getElementById("imgid").innerText = image.id + " | "
            document.getElementById("img").setAttribute("src", image.url)
            document.getElementById("popup-won").className = "";
            document.getElementById("popup-lost").className = "";
            setTimeout(() => {
                data.intervalID = setInterval(choose, data.speed || 1000);
                fadeadd(document.getElementById("stop"));
            }, 1000);
        }, 1000)
    }, 1000);
}

function preloadImage(url) {
    return new Promise((resolve, reject) => {
        let img = new Image();
        img.src = url;
        img.onload = () => {
            resolve(img);
        };
        img.onerror = reject;
    })
}

function init_workspace() {
    hide_tlo()
    for (let id of ordered_ids) {
        hide_outline(id);
    }
    setTimeout(() => {
        document.getElementById("img").className = "impo";
        fadeadd(document.getElementById("start"))
    }, 1000)
}

window.addEventListener("DOMContentLoaded", async () => {
    window.fetch(prompt("Images List:")).then(async (resp) => {
        let json = await resp.json();
        data.images = json["images"].sort(() => Math.random() - 0.5);
        data.speed = json["speed"];
        await Promise.all(data.images.map(x => preloadImage(x.url)))
        init_workspace();
    }).catch((reason) => {
        alert(`Failed: ${reason}`)
    })
})

document.addEventListener('keyup', (e) => {
    switch (e.code) {
        case "KeyK":
        case "Space":
            switch (data.status) {
                case "start":
                    start();
                    break;
                case "stop":
                    stop_manual();
                    break;
                default:
                    console.log("Unknown state.")
            }
            break;
        case "KeyB":
        case "KeyP":
            data.paused = !data.paused;
            break;
        default:
            console.log("Invalid Key.")
    }
});
