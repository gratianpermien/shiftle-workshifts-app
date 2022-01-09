import {dirname} from "./lib/pathHelpers.js"
import express from "express"
import cors from "cors"
cost server = express()
server.use(cors())
const port = process.env.PORT || 4000
server.get('/api', (req, res)=> {
    res.json({message:'Hi, express server is present'})
})

server.listen (port, () => console.log(`Server running on port ${port}`))