require('dotenv').config()
const express = require('express')
const cors = require('cors')

const app = express()

const PORT = process.env.PORT
const router = require("./src/routes")

app.use(cors())

app.use(express.json())
app.use("/uploads", express.static("uploads"))

app.use("/api/v1/", router)

app.listen(PORT, ()=>{
    console.log(`Listening on port ${PORT}`);
})

