// variabili globali
const batt = document.getElementById('battlefield')
let stage = document.getElementById('difficolta')
const button = document.getElementById('button')
let colNum = 0
const bomba = 16
let bombe = []
let maxAttempt = 0
let e = 0

// funzioni

function aggiunta(riga){
    riga.classList.add('height')
}

function crea(){
    batt.innerHTML = `<div class="row"></div>`
    const riga = document.querySelector('.row')
    riga.innerHTML = ''
    for(let i=1; i<=colNum; i++){
        riga.innerHTML += `
        <div class="col ${stage.value}">${i}</div>
        `
    }
    aggiunta(riga)
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

function generateBomb(){
    bombe = []
    maxAttempt = colNum - bomba
    while(bombe.length < bomba){
        let bombNumber = getRandomInt(1, colNum)
        if (!bombe.includes(bombNumber)){
            bombe.push(bombNumber)
        }
    }
}

function gameOver(list){
    while(e<16){
        list[bombe[e]].classList.add('red')
        e++
    }
}

// bottone
button.addEventListener('click', function(){
    if(stage.value === 'Easy'){
        colNum = 100
    }
    if(stage.value === 'Hard'){
        colNum = 81   
    }
    if(stage.value === 'Crazy'){
        colNum = 49
    }
    e = 0
    crea()
    generateBomb()
    console.log(bombe)
    const casella = document.querySelectorAll('.col')
    let contatore = 0
    for(let c=0; c<casella.length; c++){
        casella[c].addEventListener('click', function colore(){
           casella[c].classList.add('back')
           casella[c].removeEventListener('click', colore)
           contatore++
           if(bombe.includes(parseInt(this.innerText))){
            casella[c].classList.add('red')
            console.log(casella[c])
            gameOver(casella)
            batt.innerHTML += `<p class="fine">Hai perso, hai liberato ${contatore} caselle</p>`
           }
           if(contatore == maxAttempt){
            batt.innerHTML += `<p class="fine">Hai vinto, hai liberato ${contatore} caselle</p>`
           }
        })   
    }
})
