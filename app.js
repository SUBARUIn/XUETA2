const array = [
    {
        question: 'Кто исполнитель песни про машину, которую он хочет?',
        answer: ['Rakhim', 'Тимати', 'Баста', 'Xcho'],
        correct: 1,
    },
    {
        question: 'Какой цвет машины он хотел?',
        answer: ['Красный', 'Желтый', 'Синий', 'Черный'],
        correct: 3,
    },
    {
        question: 'Окакой марке автомобиля поется в песне?',
        answer: ['ВАЗ', 'Lamborgini', 'SUBARU', 'Ferrari'],
        correct: 2,
    }
]

const containerMain = document.querySelector('.container')
const headerMain = document.querySelector('.header')
const textMain = document.querySelector('.text')
const buttonMain = document.querySelector('.btn')
const buttonStart = document.querySelector('.btnStart')

let score = 0
let questionIndex = 0
let finishResult = ''

buttonStart.onclick = startTest

function startTest() {
clearPage()
questionPage()
buttonMain.classList.remove('.btnStart')
buttonMain.onclick = questionNext
}

function clearPage() {
    headerMain.innerHTML = ''
    textMain.innerHTML = ''
}

function questionPage() {
    headerTemplate = '<h1 class="header">%header%</h1>'
    let header = headerTemplate.replace('%header%', array[questionIndex]['question'])
    headerMain.innerHTML = header

    let answerNumber = 1

    for (answerItem of array[questionIndex]['answer']) {
        const questionTemplate =
        `
        <div class="block">
            <label>
					<input value="%number%" type="radio" class="answer" name="answer" />
					<span>%answer%</span>
			</label>
        </div>
        `

        let question = questionTemplate.replace('%answer%', answerItem)
            question = question.replace('%number%', answerNumber)

        textMain.innerHTML = textMain.innerHTML + question
        answerNumber++
    }
}

function questionNext() {
    const inputChecked = textMain.querySelector('input[type="radio"]:checked')

    if (!inputChecked) {
        alert('Выберите вариант ответа!')
        return
    }

    let inputValue = parseInt(inputChecked.value)

    finishResult += `${array[questionIndex]['answer'][inputValue - 1]} `

    if(inputValue === array[questionIndex]['correct']){
        score++
    }

    if (questionIndex !== array.length - 1) {
        questionIndex++
        clearPage()
        questionPage()
    } else {
        clearPage()
        showResult()
    }
}

function showResult() {
    let header
    let text = `Ваш ответ <br><br> ${finishResult}`
    buttonMain.innerText = 'К началу'

    if (score === array.length) {
        header = 'Поздравляем, вы ответили верно'
    } else if ((score * 100) / array.length >=50) {
        header = 'Где-то вы ошиблись'
    } else {
        header = 'Совсем нет, попробуйте еще'
        buttonMain.innerText = 'Попробовать снова'
    }

    headerMain.innerHTML = header
    textMain.innerHTML =
    `
    ${text}
    <br><br>
    Верных ответов ${score} из ${array.length}
    `

    buttonMain.onclick = () => history.go()
}