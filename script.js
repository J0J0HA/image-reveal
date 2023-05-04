let data = {
    shown: null,
    intervalID: null
}

function faderem(elm) {
    elm.style.opacity = "0";
    setTimeout(() => elm.style.display = "none", 1100);
}

function fadeadd(elm) {
    elm.style.display = "block";
    setTimeout(() => elm.style.opacity = "1", 200);
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
        for (let id of [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]) {
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
            for (let id of [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]) {
                show_no_outline(id);
            }
            setTimeout(() => document.getElementById("img").src = "ImageRevealFinished.png", 1000)
            setTimeout(() => {

            for (let id of [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]) {
                hide_outline(id);
            }
            }, 2000)
        }, 1000)
        return;
    }
    setTimeout(() => {
        data.shown = [8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15, 0].sort(() => Math.random() - 0.5);
        for (let id of data.shown) {
            show(id);
        }
        setTimeout(() => {
            image = data.images.pop()
            console.log(image.answer)
            document.getElementById("img").setAttribute("src", image.url)
            document.getElementById("popup-won").className = "";
            document.getElementById("popup-lost").className = "";
            setTimeout(() => {
                data.intervalID = setInterval(choose, 1000);
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
    for (let id of [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]) {
        hide_outline(id);
    }
    setTimeout(() => {
        document.getElementById("img").className = "impo";
        fadeadd(document.getElementById("start"))
    }, 5000)
}

window.addEventListener("DOMContentLoaded", async () => {
    data.images = [
        {
            url: "https://picsum.photos/2000/1500",
            answer: "landscape"
        },
        {
            url: "https://picsum.photos/1500/2000",
            answer: "portrait"
        }
    ].sort(() => Math.random() - 0.5);
    for (let image of data.images) {
        await preloadImage(image.url);
    }
    init_workspace();
})
