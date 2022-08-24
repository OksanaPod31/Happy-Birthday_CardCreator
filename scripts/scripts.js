 //const html2canvasMin = require("scripts/html2canvas.min");

const buttonMen = document.querySelector('.header__button-gender_men');
const buttonWomen = document.querySelector('.header__button-gender_women');
const body = document.body
const state = {
    gender: body.classList.contains('women') ? 'women' : 'men',
}
const cardImage = document.querySelector('.card__image')
const cardText = document.querySelector('.card__text')
const buttonText = document.querySelector('.header__button-change_text')
const buttonPhoto = document.querySelector('.header__button-change_image')
const cardWrapper = document.querySelector('.card__wrapper')



alert("Скачать открытку - двойной клик")

const getRand = (arr) =>{
    return arr[Math.floor(Math.random() * arr.length)]
}

const getData = ()=> fetch('db.json').then((response) => response.json());

const changeDOM = () =>{
    if(state.photo.includes('black')){
        cardText.style.color = '#fff'
    }
    else{
        cardText.style.color = ''
    }
    cardImage.src = `img/${state.photo}`
        cardText.innerHTML = state.text.replaceAll('\n', '<br>')
}

const getDataToCard = ()=>{
    getData().then(data => {
        state.text = getRand(data.text[state.gender])
        state.photo = getRand(data.photo[state.gender])
        changeDOM()
    })
}

const changeToMen = ()=>{
    if (state.gender !== 'men'){
        body.classList.add('men')
        body.classList.remove('women')
        state.gender = 'men'
        console.log("men")
        getDataToCard()
    }
    
};
const changeToWomen = ()=>{
    if (state.gender !== 'women'){
        body.classList.add('women')
        body.classList.remove('men')
        state.gender = 'women'
        console.log("women")
        getDataToCard()
    }
};

const changeText = () =>{
    getData().then(data => {
        state.text = getRand(data.text[state.gender])
        changeDOM()
    })
}

const changeImage = () =>{
    getData().then(data => {
        state.photo = getRand(data.photo[state.gender])
        changeDOM()
    })

}

buttonMen.addEventListener('click', changeToMen)
buttonWomen.addEventListener('click', changeToWomen)
buttonText.addEventListener('click', changeText)
buttonPhoto.addEventListener('click', changeImage)
getDataToCard()

cardWrapper.addEventListener('dblclick', () =>{
    const newWindow = window.open('', '', `width=840, height=520, top=${(screen.height / 2) - 520 / 2}, left=${(screen.width / 2) - 840 / 2}`)
    html2canvas(cardWrapper).then(canvas =>{
        canvas.style.maxWidth = '100%'
        canvas.style.height = 'auto'
        newWindow.document.body.append(canvas)
    })
})
