const express = require('express')
const pool = require('./config/db')
const getConnection = require("./config/db")

const app = express();

app.listen(8080, () => {
    console.log("Server connected")
})

getConnection()

app.get('/', (req, res) => {
    console.log("every body can see this")
})


