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
const likeButton = document.getElementById('like')
const likeButtonExtra = document.getElementById('like-extra')
const menu = document.getElementById('menu')
const overMenu = document.getElementById('over-menu')
const clear = document.getElementById('clear')


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
    likeButton.style.display = 'none'
    clear.style.display = 'none'
    menu.style.display = 'none'

}

let inputId = ''

submitButton.addEventListener('click', submit);


previousButton.addEventListener('click', function() {
    if (numberInput.value > 1) {
        numberInput.value = `${parseInt(numberInput.value) - 1}`
        submit()
    } else {
        previousButton.style.display = 'none'
        likeButtonExtra.style.display = 'none'
    }

})

nextButton.addEventListener('click', function() {
    numberInput.value = `${parseInt(numberInput.value) + 1 }`
    submit()
})


function submit() {
    inputId =  parseInt(numberInput.value)
    if (day === inputId){
        likeButtonExtra.style.display = 'none'
        extraQuote.innerHTML = 'You forgot it already? Look above (:'
    } else if (day >= inputId && inputId >= 1) {
        extraQuote.innerHTML = `${Quotes[inputId - 1]}`
        previousButton.style.display = 'inline-block'
        nextButton.style.display = 'inline-block'
        likeButtonExtra.style.display = 'inline-block'
    } else {
        likeButtonExtra.style.display = 'none'
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
    likeButtonExtra.style.display = 'none'

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

let favoriteQuotes = []

likeButton.addEventListener('click', function() {
    if (!favoriteQuotes.includes(text.innerHTML)) {
        favoriteQuotes.push(text.innerHTML)
        localStorage.setItem("favoriteQuotes", JSON.stringify(favoriteQuotes))
    }
    
})

likeButtonExtra.addEventListener('click', function() {
    if (!favoriteQuotes.includes(extraQuote.innerHTML)) {
        favoriteQuotes.push(extraQuote.innerHTML)
        localStorage.setItem("favoriteQuotes", JSON.stringify(favoriteQuotes))
    }
})

let inMenu = false
const menuDiv = document.getElementById('menu-div')


menu.addEventListener('click', function() {

    if (inMenu == false) {
        text.style.display = 'none'
        idNumber.style.display = 'none' 
        submitButton.style.display = 'none'
        numberInput.style.display = 'none' 
        extraQuote.style.display = 'none' 
        previousButton.style.display = 'none'
        nextButton.style.display = 'none' 
        labelInput.style.display = 'none' 
        backButton.style.display = 'none'
        likeButtonExtra.style.display = 'none'
        likeButton.style.display = 'none'
        moreButton.style.display = 'none'
        authorExtra.style.display = 'none'
        numberInput.value = ''
        extraQuote.innerHTML = ''

        menu.innerHTML = 'Return'
        inMenu = true

        overMenu.style.display = 'block'
        menuDiv.style.display = 'block'


        genLikedQuotes()


    } else {
        text.style.display = ''
        idNumber.style.display = '' 
        submitButton.style.display = ''
        numberInput.style.display = '' 
        labelInput.style.display = '' 
        likeButton.style.display = ''
        moreButton.style.display = ''
        extraQuote.style.display = ''

        menu.innerHTML = 'Menu'
        inMenu = false

        overMenu.style.display = 'none'
        menuDiv.style.display = 'none'

    }
})

const noQuotes = document.getElementById('no-quotes')

function genLikedQuotes() {
    let arrayOfQuotes = JSON.parse(localStorage.getItem('favoriteQuotes'))
    console.log(arrayOfQuotes)

    if (!arrayOfQuotes) {
        noQuotes.style.display = 'block'
        noQuotes.innerHTML = '<b>No Liked Quotes...</b>'
        return;
    } else {
        noQuotes.style.display = 'block'
        noQuotes.innerHTML = '<b>Click To Remove</b>'
    }

    menuDiv.innerHTML = ''
    arrayOfQuotes.forEach(element => {
        let el = document.createElement('button')
        el.innerHTML = `${element}`
        el.addEventListener('click', removeVAlue)
        menuDiv.style.textAlign = 'center'
        menuDiv.style.padding = '20px'
        menuDiv.style.margin = '20px'
        menuDiv.removeChild
        menuDiv.appendChild(el)
    });
}

clear.addEventListener('click', function() {
    localStorage.clear()
    genLikedQuotes()
    menuDiv.innerHTML = ''
})


function removeVAlue() {
    this.style.display = 'none'
    let content = this.innerHTML

    const index = favoriteQuotes.indexOf(content);

    const x = favoriteQuotes.splice(index, 1);

    // console.log(`myArray values: ${favoriteQuotes}`);
    // console.log(`variable x value: ${x}`);

    localStorage.setItem("favoriteQuotes", JSON.stringify(favoriteQuotes))
}