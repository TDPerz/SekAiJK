const express = require('express')
const jwt = require('jsonwebtoken')
const User = require('../Models/User')

const authRoute = express.Router();

authRoute.post('/login', async (req, res) => {
    console.log(req.body)
    const { username, password, remember } = req.body
    const foundUser = await User.login(username, password)
    console.log(foundUser)
    if (foundUser.Token) {
        if (remember) {
            foundUser.Token = jwt.sign(foundUser.Token, process.env.SECRET_KEY)
        }
        else {
            foundUser.Token = jwt.sign(foundUser.Token, process.env.SECRET_KEY, { expiresIn:'24h' })
        }
    }
    res.json(foundUser)
})

module.exports = authRoute

module.exports.requireLogin = async (req, res, next) => {
    if(!req.headers.autho){
        return res.json({Status: 100, Mensaje:"TOKEN INVALIDO"})
    }
    const tokenContent = req.headers.autho.substr(7)
    if(tokenContent){
        const token = (jwt.verify(tokenContent, process.env.SECRET_KEY))
        const resp = await User.exist(token)
        if(resp) next()
        else return res.json({Status: 100, Mensaje: "TOKEN INVALIDO"})
    }
    else { return res.json({Status: 100, Mensaje: "TOKEN INVALIDO"}) }
}