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
        for (let id of [8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15, 0]) {
            hide(id);
            hide_outline(id);
        }
        setTimeout(() => document.getElementById("img").className = "impo", 3000);
    }, 6000)
    setTimeout(() => fadeadd(document.getElementById("start")), 10000);
}

function start() {
    document.getElementById("img").className = "";
    faderem(document.getElementById("start"));
    faderem(document.getElementById("popup-won"));
    faderem(document.getElementById("popup-lost"));
    setTimeout(() => {
        data.shown = [8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15, 0].sort(() => Math.random() - 0.5);
        for (let id of data.shown) {
            show(id);
        }
        setTimeout(() => {
            document.getElementById("img").setAttribute("src", "https://picsum.photos/2000/1500?__nocache__=" + Date.now())
            document.getElementById("popup-won").className = "";
            document.getElementById("popup-lost").className = "";
            setTimeout(() => {
                data.intervalID = setInterval(choose, 1000);
                fadeadd(document.getElementById("stop"));
            }, 1000);
        }, 1000)
    }, 1000);
}