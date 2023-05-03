let data = {
    shown: null,
    intervalID: null
}

function hide(x) {
    console.log("Hiding box", x)
    document.getElementsByClassName("box")[x].className = "box hidden";
}
function show(x) {
    console.log("Showing box", x)
    document.getElementsByClassName("box")[x].className = "box";
}

function choose() {
    if (data.shown.length <= 0) {
        stop(data.intervalID);
        return;
    }
    hide(data.shown.pop());
}

function stop() {
    clearInterval(data.intervalID);
    document.getElementById("start").style.opacity = "1";
}

function start() {
    data.shown = [8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15, 0].sort(() => Math.random() - 0.5);
    for (var id of data.shown) {
        show(id);
    }
    document.getElementById("start").style.opacity = "0";
    setTimeout(() => {
        document.getElementById("img").setAttribute("src", "https://picsum.photos/2000/1500?" + Date.now())
        data.intervalID = setInterval(choose, 1000);
    }, 1000);
}