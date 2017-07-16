const express = require('express')
const app = express();
const collision = require("./collision.js")

const path = require('path')

app.use('/public', express.static('public'))

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, './', 'index.html'))
})

function Point(lng, lat) {
    return {lng:lng, lat:lat};
}

app.get('/collisionTest', function (req, res) {
    responseString = ""
    var enemyPath = [Point(0, 0), Point(1, 1), Point(2, 1), Point(2, 0)]
    var playerPath = [Point(1, -1), Point(.5, 0), Point(.5, 1)]
    responseString += CollisionTest(playerPath, enemyPath, true)
    playerPath = [Point(1.5, 0), Point(1.5, 0.5)]
    responseString += CollisionTest(playerPath, enemyPath, false)
    playerPath = [Point(1.5, 0), Point(2.5, 0.5)]
    responseString += CollisionTest(playerPath, enemyPath, true)
    playerPath = [Point(1.5, 0), Point(1, 2), Point(2, 2)]
    responseString += CollisionTest(playerPath, enemyPath, false)
    playerPath = [Point(1, 2), Point(2, 2)]
    responseString += CollisionTest(playerPath, enemyPath, false)
    playerPath = [Point(1, 1), Point(2, 1)]
    responseString += CollisionTest(playerPath, enemyPath, true)
    playerPath = [Point(1.5, 0)]
    responseString += CollisionTest(playerPath, enemyPath, false)
    res.send(responseString)
})

app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
})

function CollisionTest(playerPath, enemyPath, shouldCollide) {
    console.log(playerPath)
    console.log(enemyPath)
    var resultString = ""
    
    result = collision.PlayerCollision(playerPath, enemyPath)
    if (result != shouldCollide) {
        console.error("Collision Failure")
    }
    
    if (result) {
        resultString += "Collision";
    }
    else {
        resultString += "No Collision";
    }
    
    console.log(result)
    
    return result
}