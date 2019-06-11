var newGame = true;

function deal(){
    if (newGame){
        beginGame();
        newGame = false;
        return;
    }
    reroll();
    checkPoints();
    newGame = true;
}

function hold(number){
    let die = document.getElementById(`d${number}`);
    if (die.getAttribute("held"))
        die.removeAttribute("held");
    else
        die.setAttribute("held", true);
}

function beginGame(){
    document.getElementById("scorekeeper").innerText = "";
    for (let i = 1; i <= 5; i++){
        let die = document.getElementById(`d${i}`);
        die.innerText = roll();
        die.removeAttribute("held");
        document.getElementById(`bd${i}`).removeAttribute("hidden");
    }
}

function roll(){
    return Math.floor(Math.random() * 6) + 1;
}

function reroll(){
    for (let i = 1; i <= 5; i++){
        let die = document.getElementById(`d${i}`);
        if (die.getAttribute("held"))
            continue;

        die.innerText = roll();
    }
}

function checkPoints(){
    let diceMap = getDiceMap();
    let scorekeeper = document.getElementById("scorekeeper");
    if (diceMap[1] == 1 && diceMap[2] == 1 && diceMap[3] == 1 && diceMap[4] == 1){
        if (diceMap[5] == 1){
            scorekeeper.innerText = "Big Straight";
            return;
        }
        if (diceMap[0] == 1){
            scorekeeper.innerText = "Small Straight";
            return;
        }
    }
    if (diceMap.includes(5)){
        scorekeeper.innerText = "Yacht";
        return;
    }
    if (diceMap.includes(4)){
        scorekeeper.innerText = "Four";
        return;
    }
    if (diceMap.includes(3)){
        if (diceMap.includes(2)){
            scorekeeper.innerText = "Full House";
            return;
        }
        scorekeeper.innerText = "Three";
        return;
    }
    if (diceMap.includes(2)){
        if (diceMap.filter(x => x == 2).length == 2){
            scorekeeper.innerText = "Two Pair";
            return;
        }
        scorekeeper.innerText = "Pair";
        return;
    }
    scorekeeper.innerText = "Nothing";
}


function getDiceMap(){
    let dice = [];
    for (let i = 1; i <= 5; i++){
        let die = document.getElementById(`d${i}`);
        dice.push(die.innerText);
    }
    let diceMap = [];
    for (let i = 1; i <= 6; i++){
        diceMap.push(dice.filter(x => x == i).length);
    }
    return diceMap;
}