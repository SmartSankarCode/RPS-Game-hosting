const result = document.querySelector(".result");
const you = document.querySelector(".you");
const computer = document.querySelector(".computer");
const scoreboard = document.querySelector(".score");

const score = JSON.parse(localStorage.getItem('score')) ||/*reset()*/ {
    win:0,
    lose: 0,
    tie: 0
}

updateScore();

let intervelId;

function autoPlay(){
    let autoPlay = document.querySelector('.auto-play');
    if(autoPlay.innerText === 'Auto-Play'){
        intervelId = setInterval(function(){
            let autoMove = computerMove();
            playGame(autoMove);
        }, 2000);
        autoPlay.innerHTML = `Stop-Play`;
    }else if (autoPlay.innerText === 'Stop-Play'){
        clearInterval(intervelId);
        autoPlay.innerHTML = `Auto-Play`
    }    
}

function computerMove(){
    const R_P_S = ['rock', 'paper', 'scissor'];
    const rand = Math.floor(Math.random() * R_P_S.length);
    return R_P_S[rand];
}

function playGame(r_p_s){
    const com = computerMove();

    you.innerHTML =`You: <img height="50px" src="R_P_S_images/${r_p_s}-emoji.png">`;
    computer.innerHTML = `Computer: <img height="50px" src="R_P_S_images/${com}-emoji.png">`

    if (r_p_s === com){
        result.innerHTML = `Tie!`;
    }
    else{
        switch(r_p_s){
            case 'rock':
                result.innerHTML = com === 'scissor'? 'Win!':'Lose!';
                break
            case 'paper':
                result.innerHTML = com === 'rock'? 'Win!':'Lose!';
                break
            case 'scissor':
                result.innerHTML = com === 'paper'? 'Win!':'Lose!';
                break
        }
    } 

    if (result.innerText === 'Win!'){
        score.win++;
        result.style.color = 'green';
    }
    else if (result.innerText === 'Lose!'){
        score.lose++;
        result.style.color = 'red';
    } 
    else{
        score.tie++;
        result.style.color = 'blue';
    }
    
    updateScore();
    localStorage.setItem('score', JSON.stringify(score));
}  

function reset(){
    score.win = 0;
    score.lose = 0;
    score.tie = 0;
    updateScore();
    localStorage.removeItem('score');
    // localStorage.setItem('score', JSON.stringify(score));
    result.innerHTML = `-----`;
    you.innerHTML =`You:`;
    computer.innerHTML = `Computer:`;
    result.style.color = '#fff';
}


function updateScore(){
    scoreboard.innerHTML =`win:<span style="color: green;">${score.win}</span>, lose:<span style="color: red;">${score.lose}</span>, tie:<span style="color: blue;">${score.tie}</span>`;   
}
