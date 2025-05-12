require('dotenv').config()
const express = require('express')
const cors = require('cors')
const connectDB = require('./config/db')

connectDB()

const app = express()

app.use(cors())
app.use(express.json())

// rutas

const PORT = process.env.PORT_BACKEND || 5000
app.listen(PORT, () => {
  console.log('BackEnd Server Listening at ${PORT}')
})
