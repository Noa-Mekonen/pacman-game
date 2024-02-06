'use strict'

const GHOST = '👻'

var gGhosts = []
var gIntervalGhosts

function createGhosts(board) {
    gGhosts = []
    for (var i = 0; i < 3; i++) {
        createGhost(board)
    }
    
    if (gIntervalGhosts) clearInterval(gIntervalGhosts)
    gIntervalGhosts = setInterval(moveGhosts, 1000)
}

function createGhost(board) {
    const ghost = {
        location: {
            i: 2,
            j: 6
        },
        currCellContent: FOOD,
        color : getRandomColor()
    }

    gGhosts.push(ghost)
    board[ghost.location.i][ghost.location.j] = GHOST
}

function moveGhosts() {
    for (var i = 0; i < gGhosts.length; i++) {
        const ghost = gGhosts[i]
        moveGhost(ghost)
    }
}

function moveGhost(ghost) {
    const moveDiff = getMoveDiff()

    const nextLocation = {
        i: ghost.location.i + moveDiff.i,
        j: ghost.location.j + moveDiff.j
    }
    const nextCell = gBoard[nextLocation.i][nextLocation.j]

    if (nextCell === WALL) return
    if (nextCell === GHOST) return
    if (nextCell === SUPER_FOOD) return
    if (nextCell === SUPER_PACMAN) return

    if (nextCell === PACMAN) {
        gameOver(false)
        return
    }

    gBoard[ghost.location.i][ghost.location.j] = ghost.currCellContent
    renderCell(ghost.location,  ghost.currCellContent)

    ghost.location = nextLocation
    ghost.currCellContent = nextCell

    gBoard[nextLocation.i][nextLocation.j] = GHOST
    renderCell(ghost.location, changeGhostsColor(ghost))
}

function getMoveDiff() {
    const randNum = getRandomIntInclusive(1, 4)

    switch (randNum) {
        case 1: return { i: 0, j: 1 }
        case 2: return { i: 1, j: 0 }
        case 3: return { i: 0, j: -1 }
        case 4: return { i: -1, j: 0 }
    }
}

function changeGhostsColor(ghost){
    var ghostHtml = gPacman.isSuper ? `<span style="background-color: blue;">${GHOST}</span>` : getGhostHTML(ghost)
    return ghostHtml
}

function getGhostHTML(ghost) {
    return `<span style=background-color:${ghost.color}>${GHOST}</span>`
}
