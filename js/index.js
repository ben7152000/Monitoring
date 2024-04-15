/**
 * 常數
 */
const FLEX = 'flex'
const NONE = 'none'
const TRUE_BORDER = '6px solid #00EB00'
const FAIL_BORDER = '6px solid #EB0001'

/**
 * API
 */
const url = 'https://sheets.googleapis.com/v4/spreadsheets'
const id = '1UbzldKDnnwwWcyYbx-7i10nr-rx_bJMFzSzASHUp3YU'
const sheet = 'Account'
const key = 'AIzaSyCRhiUOa03yd0PobVYEnm5Ch0yXjFh9hww'

/**
 * Dom
 */
const mainInfo = document.querySelector('.main-info')
const gameInfo = document.querySelector('.game-info')
const resultInfo = document.querySelector('.result-info')
const start = document.querySelector('.start')
const restart = document.querySelector('.restart')
const time = document.querySelector('.time')
const timerBar = document.querySelector('.timer-bar')
const gameContent = document.querySelector('.game-content')
const gameRange = document.querySelector('#game-range')
const ball =document.querySelector('.ball')
const ball1 = document.querySelector('#ball-1')
const ball2 = document.querySelector('#ball-2')
const ball3 = document.querySelector('#ball-3')
const ball4 = document.querySelector('#ball-4')
const ball5 = document.querySelector('#ball-5')
const ball6 = document.querySelector('#ball-6')
const ball7 = document.querySelector('#ball-7')
const ball8 = document.querySelector('#ball-8')
const ball9 = document.querySelector('#ball-9')
const ball10 = document.querySelector('#ball-10')
const ball11 = document.querySelector('#ball-11')
const ball12 = document.querySelector('#ball-12')
const ball13 = document.querySelector('#ball-13')
const ball14 = document.querySelector('#ball-14')
const button1 = document.querySelector('#button-1')
const button2 = document.querySelector('#button-2')
const button3 = document.querySelector('#button-3')
const button4 = document.querySelector('#button-4')
const button5 = document.querySelector('#button-5')
const button1CheckTrue = document.querySelector('#button-1-check-true')
const button1CheckFail = document.querySelector('#button-1-check-fail')
const button2CheckTrue = document.querySelector('#button-2-check-true')
const button2CheckFail = document.querySelector('#button-2-check-fail')
const button3CheckTrue = document.querySelector('#button-3-check-true')
const button3CheckFail = document.querySelector('#button-3-check-fail')
const button4CheckTrue = document.querySelector('#button-4-check-true')
const button4CheckFail = document.querySelector('#button-4-check-fail')
const button5CheckTrue = document.querySelector('#button-5-check-true')
const button5CheckFail = document.querySelector('#button-5-check-fail')
const correctResult = document.querySelector('#correct')
const incorrectResult = document.querySelector('#incorrect')
const performance = document.querySelector('#performance')
const loginInfo = document.querySelector('.login-info')
const login = document.querySelector('.login')
const account = document.querySelector('#account')
const password = document.querySelector('#password')

/**
 * 變數
 */
const balls = [ball1, ball2, ball3, ball4, ball5, ball6, ball7, ball8, ball9, ball10, ball11, ball12, ball13, ball14];
const canSelectCount = [4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
let number1 = 0
let number2 = 0
let number3 = 0
let number4 = 0
let number5 = 0
let correct = 0
let incorrect = 0
let performanceRate = 0
const gameTime = 2 // 分鐘
const delayCheckTime = 1 // 秒
let randomInterval // 隨機倒數定時器
let randomCount = 0 // 隨機產生的數量
let alreadyCheck = false
let catchBalls = []
let removeBalls = []
const userInfo = { account: '', password: '' }

/**
 * 監聽
 */
// document.addEventListener('DOMContentLoaded', DOMContentLoadedHandler);
start.addEventListener('click', startClickHandler)
restart.addEventListener('click', restartClickHandler)
button1.addEventListener('click', () => buttonClickHandler(button1, button1CheckTrue, button1CheckFail))
button2.addEventListener('click', () => buttonClickHandler(button2, button2CheckTrue, button2CheckFail))
button3.addEventListener('click', () => buttonClickHandler(button3, button3CheckTrue, button3CheckFail))
button4.addEventListener('click', () => buttonClickHandler(button4, button4CheckTrue, button4CheckFail))
button5.addEventListener('click', () => buttonClickHandler(button5, button5CheckTrue, button5CheckFail))
login.addEventListener('click', loginHandler)

/**
 * 進到介紹介面
 */
function goToInstructionPage() {
  resultInfo.style.display = NONE
  mainInfo.style.display = FLEX
}

/**
 * 進到遊戲介面
 */
function goToGamePage() {
  mainInfo.style.display = NONE
  gameInfo.style.display = FLEX
}

/**
 * 進到結果介面
 */
function goToResultPage() {
  gameInfo.style.display = NONE
  resultInfo.style.display = FLEX
}

/**
 * 登入
 */
function loginHandler() {
  const userAccount = account.value
  const userPassword = password.value

  if (userAccount === userInfo.account && userPassword === userInfo.password) {
    goToInstructionPage()
    loginInfo.style.display = NONE
  } else {
    alert('帳號或密碼錯誤')
  }
}

/**
    重新開始
 */
function restartClickHandler() {
  goToInstructionPage()
  resetResult()
}

/**
 * 輸出結果
 */
function outputResult() {
  performanceRate = correct - incorrect < 0 ? 0 : correct - incorrect
  correctResult.innerHTML = `${correct.toString()}`
  incorrectResult.innerHTML = `${incorrect.toString()}`
  performance.innerHTML = `${performanceRate.toString()}%`
}

/**
    重置結果數據
 */
function resetResult() {
  randomCount = 0
  correct = 0
  incorrect = 0
  performanceRate = 0
  timerBar.style.width = '0'
}

/**
 * 開始遊戲
 */
function startClickHandler () {
  goToGamePage()
  startCountdown(gameTime)
  DOMContentLoadedHandler()
  if (Math.floor(gameTime) === 1) {
    time.innerHTML = `${Math.floor(gameTime)} minute to go`
  } else {
    time.innerHTML = `${Math.floor(gameTime)} minutes to go`
  }
}

/**
 * 加載dom
 */
function DOMContentLoadedHandler() {
  balls.forEach(i => {
    i.style.display = NONE
  })
  balls.forEach(moveBall)
  selectCount()
  moveBalls()
  randomNumbers()
  randomInterval = setInterval(moveBalls, 500);
}

/**
 * 隨機生成位置
 */
function randomPosition(ball) {
  const radius = (gameRange.clientWidth / 2 - ball.clientWidth / 2)
  const angle = Math.random() * 2 * Math.PI
  const randomX = radius * Math.cos(angle) + radius
  const randomY = radius * Math.sin(angle) + radius

  return { x: randomX, y: randomY };
}

/**
 * 隨機移動小球
 */
function moveBall(ball) {
  const position = randomPosition(ball)
  if (position.x <= 0 || position.y <= 0) return
  ball.style.left = `${position.x}px`
  ball.style.top = `${position.y}px`
}

function selectCount() {
  randomCount = canSelectCount[Math.floor(Math.random() * canSelectCount.length)]
}

/**
 * 移動所有的球
 */
function moveBalls() {
  catchBalls = [...balls]
  removeBalls = catchBalls.splice(0, randomCount)
  removeBalls.forEach(i => {
    i.style.display = FLEX
  })
  removeBalls.forEach(moveBall)
}

/**
 * 按鈕隨機數字
 */
function randomNumbers() {
  const counts1 = [4, 5, 6, 7, 8]
  const counts2 = [7, 8, 9, 10, 11]
  const counts3 = [10, 11, 12, 13, 14]
  if (counts1.includes(randomCount)) {
    number1 = counts1[0]
    number2 = counts1[1]
    number3 = counts1[2]
    number4 = counts1[3]
    number5 = counts1[4]
  } else if (counts2.includes(randomCount)) {
    number1 = counts2[0]
    number2 = counts2[1]
    number3 = counts2[2]
    number4 = counts2[3]
    number5 = counts2[4]
  } else if (counts3.includes(randomCount)) {
    number1 = counts3[0]
    number2 = counts3[1]
    number3 = counts3[2]
    number4 = counts3[3]
    number5 = counts3[4]
  }
  button1.innerHTML = number1.toString()
  button2.innerHTML = number2.toString()
  button3.innerHTML = number3.toString()
  button4.innerHTML = number4.toString()
  button5.innerHTML = number5.toString()
}

/**
 * 點擊按鈕
 */
function buttonClickHandler(button, checkTrue, checkFail) {
  if (alreadyCheck) return
  if (button.innerHTML === randomCount.toString()) {
    checkTrue.style.display = FLEX
    gameContent.style.border = TRUE_BORDER
    correct++
  } else {
    checkFail.style.display = FLEX
    gameContent.style.border = FAIL_BORDER
    incorrect++
  }
  alreadyCheck = true
  clearInterval(randomInterval)
  setTimeout(() => {
    ball.style.transition = 'all 0s linear'
    checkTrue.style.display = NONE
    checkFail.style.display = NONE
    gameContent.style.border = NONE
    alreadyCheck = false
    DOMContentLoadedHandler()
  }, delayCheckTime * 1000)

  setTimeout(() => {
    ball.style.transition = 'all 0.7s linear'
  }, delayCheckTime * 1.02 * 1000)
}

/**
 *  倒數計時
 */
function startCountdown(duration) {
  let timer = duration * 60
  let timeWidth = 100

  function updateCountdown() {
    const minutes = Math.floor(timer / 60)

    if ((minutes + 1) === 1) {
      time.innerHTML = `${(minutes + 1).toString()} minute to go`
    } else {
      time.innerHTML = `${(minutes + 1).toString()} minutes to go`
    }

    if (timeWidth >= 0) {
      timerBar.style.width = `${timeWidth}%`
      timeWidth -= 100 / (gameTime * 60)
    }

    if (timer === 0) {
      goToResultPage()
      outputResult()
      clearInterval(interval)
      clearInterval(randomInterval)
    } else {
      timer--
    }
  }

  updateCountdown()
  const interval = setInterval(updateCountdown, 1000)
}

/**
 *  API
 */
fetch(`${url}/${id}/values/${sheet}?alt=json&key=${key}`)
  .then(res => res.json())
  .then(res => {
    userInfo.account = res.values[1][1]
    userInfo.password = res.values[1][2]
  })

