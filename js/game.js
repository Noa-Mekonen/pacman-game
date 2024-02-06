'use strict'

const WALL = '#'
const FOOD = '.'
const EMPTY = ' '
const SIZE = 10
const SUPER_FOOD = '🥶'
const CHERRY = '🍒'

// Model
const gGame = {
    score: 0,
    isOn: false
}

var gBoard
var gFood
var gCherryInterval

function onInit() {
    gGame.isOn = true
    gFood = 0
    hideModal()
    updateScore(0)

    gBoard = buildBoard()
    createGhosts(gBoard)
    createPacman(gBoard)
    renderBoard(gBoard)

    gCherryInterval = setInterval(addCherry, 10000);
}

function buildBoard() {
    
    const board = []

    for (var i = 0; i < SIZE; i++) {
        board.push([])

        for (var j = 0; j < SIZE; j++) {
            board[i][j] = FOOD
            gFood++
            if (i === 0 || i === SIZE - 1 ||
                j === 0 || j === SIZE - 1 ||
                (j === 3 && i > 4 && i < SIZE - 2)) {
                board[i][j] = WALL
                gFood--
            }
            if (i === 1 && j === 1 ||
                i === 1 && j === 8 ||
                i === 8 && j === 1 ||
                i === 8 && j === 8){
                board[i][j] = SUPER_FOOD   
                gFood--

            }
        }
    }
    return board
}

function renderBoard(board) {
    var strHTML = ''
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>'
        for (var j = 0; j < board[0].length; j++) {

            const cell = board[i][j]
            
            const className = `cell cell-${i}-${j}`

            strHTML += `<td class="${className}">${cell}</td>`
        }
        strHTML += '</tr>'
    }
    const elContainer = document.querySelector('.board')
    elContainer.innerHTML = strHTML
}

function renderCell(location, value) {
    const elCell = document.querySelector(`.cell-${location.i}-${location.j}`)
    elCell.innerHTML = value
}

function updateScore(diff) {
    if (!diff) {
        gGame.score = 0
    } else {
        gGame.score += diff
    }
    document.querySelector('span.score').innerText = gGame.score
}

function addCherry(){
    var emptyPos = getEmptyPos()
    gBoard[emptyPos.i][emptyPos.j] = CHERRY
    renderCell(emptyPos, CHERRY)
}

function getEmptyPos() {
    const emptyPoss = []
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[0].length; j++) {
            const currCell = gBoard[i][j]
            if (currCell === FOOD || currCell === EMPTY) {
                emptyPoss.push({ i, j })
            }
        }
    }

    const randIdx = getRandomIntInclusive(0, emptyPoss.length-1)
    return emptyPoss[randIdx]
}

function gameOver(isVictory) {
    gGame.isOn = false
    renderCell(gPacman.location, '🪦')

    clearInterval(gIntervalGhosts)
    clearInterval(gCherryInterval)

    showModal(isVictory)
}

function isVictory(){
    return gFood === 0
}

function showModal(isVictory){
    const elModal = document.querySelector('.modal')
    elModal.classList.remove('hidden')
    if(isVictory){
        const elVictorySpan = document.querySelector('.modal span')
        elVictorySpan.style.display = 'block'
        console.log(elVictorySpan);
    }
}

function hideModal() {
    const elModal = document.querySelector('.modal')
    elModal.classList.add('hidden')
    
    const elVictorySpan = document.querySelector('.modal span')
    elVictorySpan.style.display = 'none'  
}

function createSupperFood(){
    var supperFood = [
        {location: {i:1,j:1}},
        {location: {i:1,j:8}},
        {location: {i:8,j:1}},
        {location: {i:8,j:8}}
    ]
    return supperFood
}
