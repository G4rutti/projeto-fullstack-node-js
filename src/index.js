const express = require("express")
const bodyParser = require("body-parser")
const cors = require('cors')


const userRoute = require('../routes/topLeader') // importando funçoes

const app = express()
const porta = process.env.PORT || 3000

app.use(cors())
app.use(bodyParser.urlencoded({extended: false}))

app.get('/', (req, res) => {
    res.send("Hello World")
})

app.listen(porta, () => console.log("Api rodando na porta 3000"))

userRoute(app)


