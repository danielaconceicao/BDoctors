const express = require('express');
const cors = require('cors')
const server = express();

const host = process.env.HOST || "localhost"
const port = process.env.PORT || 3000

server.use(cors())
server.use(express.json())

server.listen(port, (req, res) => {
    console.log(`Server running on ${host}:${port}`)

})