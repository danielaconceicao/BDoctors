const express = require('express');
const server = express();

server.use(cors())
const host = process.env.HOST || "localhost"
const port = process.env.PORT || 3000

server.use(express.json())

server.listen(port, (req, res) => {
    console.log(`Server running on ${host}:${port}`)

})