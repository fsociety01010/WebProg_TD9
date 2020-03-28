const express = require('express')
const app = express()
const levenshtein = require('js-levenshtein')
const url = require('url')
const path = require('path')
const pug = require('pug');

const port = process.env.PORT || 5000
const compiledFunction = pug.compileFile('index.pug');
const regExpDNA = new RegExp("^[a|c|g|t|A|C|G|T]*$")

let userList = new Map([
    ["co0101", { nbRequest: 0 }],
    ["ro010101", { nbRequest: 0 }],
    ["na10101", { nbRequest: 0 }],
    ["vi010101", { nbRequest: 0 }],
    ["ru01010", { nbRequest: 0 }],
    ["s010101", { nbRequest: 0 }],
    ["wa0101", { nbRequest: 0 }],
    ["sh0110", { nbRequest: 0 }],
    ["yo11011", { nbRequest: 0 }],
    ["urs10001", { nbRequest: 0 }],
    ["ha010101", { nbRequest: 0 }],
    ["nds11110", { nbRequest: 0 }],
])

function incrementUserNbRequest(user) {
    userList.set(user, { nbRequest: userList.get(user).nbRequest + 1 })
}

function resetUserNbRequest() {
    for (let numberRequest of userList.values()) {
        numberRequest.nbRequest = 0;
    }
}

function getUserNbRequest(user) {
    return userList.get(user).nbRequest;
}

function getDate() {
    let date = new Date();
    return date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()
}

setInterval(resetUserNbRequest, 60000)


app.use(express.static('public'))
    .get("/", (req, res) => {
        res.send(compiledFunction({}))
    })
    .get("/:user/distance", (req, res) => {
        const A = req.query.A
        const B = req.query.B
        const user = req.params.user
        if (userList.has(user) && getUserNbRequest(user) < 5 && A.length <= 50 && B.length <= 50 && regExpDNA.test(A) && regExpDNA.test(B)) {
            incrementUserNbRequest(user)
            res.status(200).json({
                "user": user,
                "nbRequest": getUserNbRequest(user),
                "date": getDate(),
                "A": A,
                "B": B,
                "distance": levenshtein(A, B),
            })
        } else if (!(getUserNbRequest(user) < 5)) {
            res.status(403).json({
                "user": user,
                "error": "You exceed the limit, wait a little bit"
            })
        } else if (!(userList.has(user))) {
            res.status(403).json({
                "user": user,
                "error": "You don't have permissions!"
            })
        } else if (A.length > 50 || B.length > 50) {
            res.status(404).json({
                "user": user,
                "error": "Your array is too long, max size is 50 characters"
            })
        } else if (!regExpDNA.test(A) || !regExpDNA.test(B)) {
            res.status(404).json({
                "user": user,
                "error": "That's not an array of ADN letters"
            })
        }
    })
app.get("/about", function(request, response) {

    response.send("<h1>It's a site about DNA and BigBROTHER!</h1>");
});
app.get("/contact", function(request, response) {

    response.send("<h1>Fell free to contact us if you have any question!</h1>");
});

app.listen(port, () => {
    console.log('Server is on the port: ' + port);
});