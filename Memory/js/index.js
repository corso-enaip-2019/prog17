var cards = [];
var firstId = -1;
var secondId = -1;
var pairsFound = 0;
var beginTime;
var timer;
for (let i = 0; i < 8; i++){
    cards.push(`img/card${i % 4}.png`);
}

function start(){
    shuffleCards();
    for (let i = 0; i < 8; i++){
        let card = document.getElementById(`card${i}`);
        let img = document.createElement("img");
        img.classList.add("card-img-top");
        img.src = "img/card-back.png";
        card.onclick = function() { flip(i) };
        card.appendChild(img);
    }
    document.getElementById("btn-start").setAttribute("disabled", true);
    beginTime = new Date().getTime();
    timer = setInterval(function() { updateTimer(); }, 1000);
}

function shuffleCards(){
    for (let i = cards.length - 1; i > 0; i--){
        let rnd = Math.floor(Math.random() * (i+1));
        let temp = cards[i];
        cards[i] = cards[rnd];
        cards[rnd] = temp;
    }
}

function flip(cardId){
    if (firstId == cardId ||
        document.getElementById(`card${cardId}`).getAttribute("noclick") == "true" ||
        document.getElementById("card-box").getAttribute("noclick") == "true")
        return;
    
    document.getElementById(`card${cardId}`).firstChild.src = cards[cardId];
    if (firstId == -1) {
        firstId = cardId;
        return;
    }

    secondId = cardId;
    if (cards[firstId] == cards[secondId]){
        document.getElementById(`card${firstId}`).setAttribute("noclick", true);
        document.getElementById(`card${secondId}`).setAttribute("noclick", true);
        pairsFound += 1;
    }
    else {
        document.getElementById("card-box").setAttribute("noclick", true);
        let c1 = firstId;
        let c2 = secondId;
        setTimeout(function() {
            document.getElementById("card-box").setAttribute("noclick", false);
            document.getElementById(`card${c1}`).firstChild.src = "img/card-back.png";
            document.getElementById(`card${c2}`).firstChild.src = "img/card-back.png";
        }, 1000);
    }
    firstId = -1;
    secondId = -1;

    if (pairsFound == 4){
        clearInterval(timer);
        alert("You Won!");
    }
}

function updateTimer(){
    let now = new Date().getTime();
    let delta = now - beginTime;
    let minutes = Math.floor((delta % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((delta % (1000 * 60)) / 1000);
    let timer = document.getElementById("timer");
    timer.innerText = minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
}