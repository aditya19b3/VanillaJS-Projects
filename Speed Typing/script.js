const RAMDOM_QUOTE_API_URL = 'http://api.quotable.io/random'
const quoteDisplayElement = document.getElementById('quoteDisplay')
const quoteInputElement = document.getElementById('quoteInput')
const timerElement = document.getElementById('timer')
const boxElement = document.getElementById('box')



function theme(){
    const buttonElement = document.getElementById('modeChange')
    
    buttonElement.addEventListener('click', () => {
        if (buttonElement.innerText === 'Change to Light Mode') {
            buttonElement.innerText = 'Change to Dark Mode';
            const modeColor = document.getElementById('body')
            modeColor.style.backgroundColor = 'transparent'
            timerElement.style.color = 'grey'
           // quoteDisplayElement.style.backgroundColorcolor = 'black'
            boxElement.style.backgroundColor = 'grey'
            quoteInputElement.style.borderColor = 'black'
        } 
        else{
            //buttonElement.innerText = 'Dark Mode';
            buttonElement.innerText = 'Change to Light Mode'
            const modeColor = document.getElementById('body')
            modeColor.style.backgroundColor = '#1E0555'
            boxElement.style.backgroundColor = '#F0db4f'
            timerElement.style.color = '#F0db4f'
            console.log("Added");
        }
    })

}


quoteInputElement.addEventListener('input', () => {
    const arrayQuote = quoteDisplayElement.querySelectorAll('span')
    const arrayValue = quoteInputElement.value.split('')
    let correct = true

    arrayQuote.forEach((characterSpan, index) => {
        const character = arrayValue[index]
        if (character == null) {
            characterSpan.classList.remove('correct')
            characterSpan.classList.remove('incorrect')
            correct = false
        }else if (character === characterSpan.innerText){
            characterSpan.classList.add('correct')
            characterSpan.classList.remove('incorrect')

        } else {
            characterSpan.classList.remove('correct')
            characterSpan.classList.add('incorrect')
            correct = false
        }
    })

    if (correct) renderNewQuote()
})

function getRandomQuote(){
    return fetch(RAMDOM_QUOTE_API_URL)
    .then(response => response.json())
    .then(data => data.content)
}

async function renderNewQuote() {
    const quote = await getRandomQuote()
    //console.log(quote);
    quoteDisplayElement.innerText = ''
    quote.split('').forEach(character => {
        const characterSpan = document.createElement('span')
        characterSpan.innerText = character
        quoteDisplayElement.appendChild(characterSpan)
    });
    quoteInputElement.value = null
    startTimer()
    theme()

}


let startTime

function startTimer(){
    timerElement.innerText = 0
    startTime = new Date()
    setInterval(() => {
        timerElement.innerText = getTimerTime()
    },1000)
}

function getTimerTime() {
    return Math.floor((new Date() - startTime) /1000)
}

renderNewQuote()