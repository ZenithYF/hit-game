var stage = document.getElementById("stage");
var hammer = document.getElementById("hammer");
var score = document.getElementById("score");


//hammer click down animation
stage.onmousedown = function() {
    hammer.src = "img/hammer2.png";
}

//hammer click up animation
stage.onmouseup = function() {
    hammer.src = "img/hammer1.png";
}

//hammer movement on stage 
stage.onmousemove = function(e) {
    var x = e.clientX;
    var y = e.clientY;
    hammer.style.top = y + "px";
    hammer.style.left = x + "px";

}

var scoreNum = 0;
//default score 
score.innerText = +scoreNum;

//hammer onclick on mouse
stage.onclick = function(e) {
    var x = e.clientX;
    var y = e.clientY;

    //caculate mouse area 
    var x1 = windowAry[mouseID].offsetLeft + mouseAry[mouseID].offsetLeft + stage.offsetLeft;
    var x2 = x1 + mouseAry[mouseID].offsetWidth;
    var y1 = windowAry[mouseID].offsetTop + mouseAry[mouseID].offsetTop;
    var y2 = windowAry[mouseID].offsetTop + windowAry[mouseID].offsetHeight;

    //if onclick in mouse area
    if (x > x1 && x <= x2 && y > y1 && y < y2) {
        //change mouse img
        mouseAry[mouseID].src = "img/mouse2.png";
        //score
        scoreNum += 1;
        score.innerText = +scoreNum;
    }
}


// mouse Array
var mouseID;
var windowAry = [];
var mouseAry = [];

for (i = 0; i < 9; i++) {
    windowAry[i] = document.getElementById("window" + (i + 1));
    mouseAry[i] = windowAry[i].getElementsByTagName("img")[0];
}


//game Loop
var startTop = 103;
var endTop = 0;
var nowTop = startTop;
var speed = 10;

var maxTime = 600;
var waitTime = 0;
var loopTime = 30;

var showLoop = null;

var gameLoop = setInterval(function() {
    if (lastTime == 0) {
        clearInterval(gameLoop);
        return;
    }

    if (showLoop == null) {
        //random mouse
        mouseID = parseInt(Math.random() * 9);
        mouseAry[mouseID].src = "img/mouse1.png";
        nowTop = startTop;
        waitTime = 0;
        //mouse show loop
        showLoop = setInterval(mouseShow, loopTime);
    }

}, 2000)


//mouse show
function mouseShow() {
    //show up
    if (nowTop > endTop) {
        nowTop -= speed;

    }
    if (nowTop < endTop) {
        nowTop = endTop;
    }
    if (nowTop == endTop) {
        //wait to disappear
        if (waitTime < maxTime) {
            waitTime += loopTime;
        }
        if (waitTime >= maxTime) {
            nowTop = startTop;
            clearInterval(showLoop);
            showLoop = null;
        }
    }
    //change mouse position
    mouseAry[mouseID].style.top = nowTop + "px";
    //console.log(nowTop);
}

//timer
var time = document.getElementById("time");
var lastTime = 60; //last time
var countLoop = setInterval(function() {
    if (lastTime > 10) {
        lastTime--;
        time.innerText = "0:" + lastTime;
    } else if (lastTime <= 10 && lastTime > 0) {
        lastTime--;
        time.innerText = "0:0" + lastTime;
    } else if (lastTime == 0) {
        time.innerText = "0:00";
        clearInterval(countLoop);
    }
}, 1000)

//restart
var restart = document.getElementById("restart");
restart.onclick = function() {
    window.location.reload();
}