import { Quotes } from "./constants.js"

const text = document.getElementById('text')
const idNumber = document.getElementById('idnumber')
const submitButton = document.getElementById('submit')
const numberInput = document.getElementById('numberinput')
const extraQuote = document.getElementById('extra-quote')
const previousButton = document.getElementById('previous')
const nextButton = document.getElementById('next')
const labelInput = document.getElementById('labelinput')
const moreButton = document.getElementById('more')
const backButton = document.getElementById('back')

let now = new Date();
let start = new Date(now.getFullYear(), 0, 0);
let diff = now - start;
let oneDay = 1000 * 60 * 60 * 24;
let day = Math.floor(diff / oneDay);
// console.log('Day of year: ' + day);



if (now.getFullYear() == 2026) {
    text.innerHTML = `${Quotes[day - 1]}`
    idNumber.innerHTML = `Quote ID: ${day}`
} else {
    idNumber.style.display = 'none'
    submitButton.style.display = 'none'
    numberInput.style.display = 'none'
    labelInput.style.display = 'none'

}

let inputId = ''

submitButton.addEventListener('click', submit);


previousButton.addEventListener('click', function() {
    if (numberInput.value > 1) {
        numberInput.value = `${parseInt(numberInput.value) - 1}`
        submit()
    } else {
        previousButton.style.display = 'none'
    }

})

nextButton.addEventListener('click', function() {
    numberInput.value = `${parseInt(numberInput.value) + 1 }`
    submit()
})


function submit() {
    inputId =  parseInt(numberInput.value)
    if (day === inputId){
        extraQuote.innerHTML = 'You forgot it already? Look above (:'
    } else if (day >= inputId && inputId > 1) {
        extraQuote.innerHTML = `${Quotes[inputId - 1]}`
        previousButton.style.display = 'inline-block'
        nextButton.style.display = 'inline-block'
    } else {
        extraQuote.innerHTML = 'Choose a day earlier than today and above zero.'
    }
}

const authorExtra = document.getElementById('author-extra')
const URL = 'https://dummyjson.com/quotes/random'

moreButton.addEventListener('click', async function() {

    const response = await fetch(URL)
    const result = await response.json()

    idNumber.style.display = 'none' 
    submitButton.style.display = 'none'
    numberInput.style.display = 'none' 
    extraQuote.style.display = 'none' 
    previousButton.style.display = 'none'
    nextButton.style.display = 'none' 
    labelInput.style.display = 'none' 
    backButton.style.display = 'block'

    text.innerHTML = `${result.quote}`
    authorExtra.innerHTML = `-- ${result.author}`
    authorExtra.style.display = 'block'

    // console.log(result)
})

backButton.addEventListener('click', function() {
    if (now.getFullYear() == 2026) {
        idNumber.style.display = '' 
        submitButton.style.display = ''
        numberInput.style.display = '' 
        extraQuote.style.display = '' 
        labelInput.style.display = '' 
        backButton.style.display = 'none'
        authorExtra.style.display = 'none'
        text.innerHTML =  `${Quotes[day - 1]}`
    } else { 
        backButton.style.display = 'none'
        authorExtra.style.display = 'none'
        text.innerHTML =  "Quotes will be appearing here from January 1, 2026"
    }
})