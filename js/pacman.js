'use strict'

const PACMAN = '😀'
const SUPER_PACMAN = '🤡'

var gPacman
var gSuperInterval
var gRemovedGhosts = []

function createPacman(board) {
    gPacman = {
        location: {
            i: 2,
            j: 2
        },
        isSuper: false
    }
    board[gPacman.location.i][gPacman.location.j] = PACMAN
}

function onMovePacman(ev) {
    if (!gGame.isOn) return
    const nextLocation = getNextLocation(ev.key)
    const nextCell = gBoard[nextLocation.i][nextLocation.j]

    if (nextCell === WALL) return

    if (nextCell === GHOST) {
        if(!gPacman.isSuper){
            gameOver(false)
            return
        }else{
            if(!gGhosts) return
            removeGhostByPacmanPos(nextLocation)
        }
    }

    if (nextCell === FOOD){
        updateScore(1)
        gFood--
        if(isVictory()){
            gameOver(true)
        }
    } 

    if (nextCell === SUPER_FOOD) {
        if(gPacman.isSuper) return
        gBoard[gPacman.location.i][gPacman.location.j] = EMPTY
        renderCell(gPacman.location, EMPTY)
        onSupperFood(nextLocation)
        return
    }

    if (nextCell === CHERRY){
        updateScore(10)
        gFood--
    }

    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY
    renderCell(gPacman.location, EMPTY)

    gPacman.location = nextLocation
    gBoard[nextLocation.i][nextLocation.j] = PACMAN
    renderCell(nextLocation, PACMAN)

    if(gPacman.isSuper){
        gBoard[nextLocation.i][nextLocation.j] = SUPER_PACMAN
        renderCell(nextLocation, SUPER_PACMAN)
    }
}

function removeGhostByPacmanPos(loc) {
    console.log('removedGhosts:', gRemovedGhosts)
    for (var i = 0; i < gGhosts.length; i++) {
        if (gGhosts[i].location.i === loc.i && gGhosts[i].location.j === loc.j) {
            gRemovedGhosts.push(gGhosts[i])
            gGhosts.splice(i, 1)
        }
    }
}

function onSupperFood(pos){
    gPacman.isSuper=true
    updateScore(10)

    gRemovedGhosts = []
    changeGhostsColor()

    gPacman.location = pos
    gBoard[pos.i][pos.j] = SUPER_PACMAN
    renderCell(pos, SUPER_PACMAN)

    setTimeout(()=>{
        gPacman.isSuper=false
        gGhosts = gGhosts.concat(gRemovedGhosts)

    }, 5000)
}

function getNextLocation(eventKeyboard) {
    const nextLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j
    }

    switch (eventKeyboard) {
        case 'ArrowUp':
            nextLocation.i--
            break
        case 'ArrowRight':
            nextLocation.j++
            break
        case 'ArrowDown':
            nextLocation.i++
            break
        case 'ArrowLeft':
            nextLocation.j--
            break
    }
    return nextLocation
}