require('dotenv').config()
require('./Models/MongoDB')
const express = require('express')
const cors = require('cors')
const app = express()
const bcrypt = require('bcrypt')

app.use(express.json())
app.use(cors());
app.use(express.urlencoded({extended : true}));


const host = process.env.HOST || '0.0.0.0'
const port = process.env.PORT || '3030'

app.use('/api', require('./Routes/Authenticator'))
app.use('/api', require('./Routes/Home'))

app.listen(port, host, async ()=>{
    console.log('Servidor Iniciado!!')
})