console.log("Cool , it works");
let n_row = 3;
let curr_row = 0;
let n_col = 2;
let level = 1;
let score = 0;
let levelScore = [0,10,20,20,25,25];
let wordArray = [
    ['GO','UP','DO','IS','AS','TO','DO','SO','MY','HE','IF','ON','IN','WE','OK'],
    ['EAT','FAT','DID','HAT','JUG','KIT','NET','SIT','VAN','DRY','EGG','DOG','CAT','AIM','LOW','PEN','PET','PIG','BUT','BIG','BOY','BUY'],
    ['DEAD','TREE','KEEP','RIDE','GAME','RICE','RACE','EXIT','RICE','HOPE','COME','STAY','EXIT','TIDE','BEAM','RICE','COOL','HUGE','BEST','GOOD','FOUR','FIVE'],
    ['ABOUT','ABOVE','ABUSE','ADULT','ADOPT','ADMIT','EARTH','HOUSE','HOTEL','FRUIT','FIGHT','LIVES','LIGHT','LEGAL','MAGIC','MAJOR','MINOR','SORRY','SOUND'],
    ['ACTION','ACTIVE','ABROAD','ACTUAL','EMPIRE','ELEVEN','FAMILY','FINGER','LABOUR','ALMOST','ALWAYS','ANSWER','ARRIVE','ATTACK','BECOME','BURDEN','CAMERA','COFFE','YELLOW']
];

const scoreDiv = document.querySelector('#score'); 
const table = document.querySelector(".table");
const input_box = document.querySelector('#input');
const screen  = document.querySelector('.screen');
const btn = document.querySelector('.btn');
const scoreBarDiv = document.querySelector('.score-bar-div'); 

input_box.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) 
    appendInput();
});
const disableBtn = ()=>{
    btn.style.opacity = '0';
    btn.style.pointerEvents = 'none';
}
const enableBtn = ()=>{
    btn.style.opacity = '1';
    btn.style.pointerEvents = 'auto';
}
const disableInput = ()=>{
    input_box.style.opacity = '0'
    input_box.style.pointerEvents = 'none';
}
const enableInput = ()=>{
    input_box.style.opacity = '1';
    input_box.style.pointerEvents = 'auto';
}

let wordMatch = [];
const checkForAllGuess = ()=>{
    for(let i=0;i<n_col;i++){
        if(wordMatch[i]==false){
            return false;
        }
    }
    return true;
}
const updateScoreBarDiv = ()=>{
    scoreBarDiv.style.width = `${score}%`;
}
const updateScore = ()=>{ 
    scoreDiv.textContent = `Score : ${score}`;
    updateScoreBarDiv(); 
}
updateScore();

screen.innerHTML = ` <h4> WELCOME TO WARDLE GAME </h4> `;
disableInput();

let word;
const goClick = ()=>{
    if(level == 6){
        location.reload();
    }
    n_col = level + 1;
    n_row = n_col + 3;
    curr_row = 0;
    wordMatch.length = n_col;
    wordMatch.fill(false,0);
    table.innerHTML = ``;
    screen.innerHTML = ` <h4> Level ${level} :  Guess Word of Length ${n_col} </h4>`;
    word = wordArray[level-1][Math.floor(Math.random()*wordArray[level-1].length)];
    input_box.setAttribute('maxlength', `${level+1}`);
    // console.log("Word is ", word);
    enableInput();
    disableBtn();
}

const appendInput = ()=> {
    if(curr_row<n_row){
        const result = document.getElementById('input').value.toUpperCase();
        if(result.length != n_col) return;
        // let elementToAppend = ` 
        //             <div class="row">
        //                 <div class="col"><h1>${result[0]}</h1></div>
        //                 <div class="col"><h1>${result[1]}</h1></div>
        //                 <div class="col"><h1>${result[2]}</h1></div>
        //                 <div class="col"><h1>${result[3]}</h1></div>
        //                 <div class="col"><h1>${result[4]}</h1></div>
        //             </div>`;
        // table.innerHTML += (elementToAppend);
        let box = document.createElement('div');
        box.className = 'col';
        box.appendChild(document.createElement('h1'));
        let row = document.createElement('div');
        row.className= 'row';
        for(let i=0;i<n_col;i++)
        {
            let b = box.cloneNode(true);
            b.firstChild.textContent = `${result[i]}`;
            row.appendChild(b);
        }
        table.appendChild(row);
        row = table.lastChild;
        for( let i = 0;i < n_col;i++ ){
            if(word[i] == result[i]){
                row.childNodes[i].style.backgroundColor  = 'green';
                wordMatch[i] = true;
            }
            else if(word.includes(result[i])){
                row.childNodes[i].style.backgroundColor  = 'orange';
            }
        }
        curr_row++;  
        
        if(checkForAllGuess()){
            
            screen.innerHTML = ` <h4> 🔥 Congrats ! Yours Guess is Correct </h4> `;
            score = Math.min(100,score + levelScore[level]);
            updateScore();
            level++;
            // console.log('Success',' ',word);
            if(level <=5)
                btn.textContent = `Next ⏩`;
            else
                btn.textContent = `Play 🔄`
            enableBtn();
            disableInput();
            if(score == 100){
                screen.innerHTML = `<h4> 🏆 You Won the Game </h4>`;
            }
            input_box.value = "";
            return;
        }
        else{
            screen.innerHTML = ` <h4> 🚫 Wrong Guess ! Try Left ${n_row-curr_row} </h4> `;
        }
    }
    if(curr_row == n_row){
        screen.innerHTML = ` <h4> ❌ Failure ! Try Again </h4> `;
        if(score>=10)score -= 10;
        updateScore();
        if(level>1){
            level--;
        }
        // console.log('failure',' ',word);
        btn.textContent = `Again 🔁`;

        let box = document.createElement('div');
        box.className = 'col';
        box.appendChild(document.createElement('h1'));
        let row = document.createElement('div');
        row.className= 'row';
        for(let i=0;i<n_col;i++)
        {
            let b = box.cloneNode(true);
            b.firstChild.textContent = `${word[i]}`;
            b.style.backgroundColor = 'green';
            row.appendChild(b);
        }
        table.appendChild(row);
        enableBtn();
        disableInput();
    }
    input_box.value = "";
} 

