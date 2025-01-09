const express = require('express');
const cors = require('cors')

const server = express()
const env = require('dotenv').config()

const host = process.env.HOST || "http://localhost"
const port = process.env.PORT || 3004

server.use(cors())
server.use(express.json())


const router = require('./routes/routes.js')


server.get("/", (req, res) => {
    res.status(200).json({ message: "Welcome to the server!" })
})

server.use("/", router)


server.listen(port, (req, res) => {
    console.log(`Server running on ${host}:${port}`)

})

