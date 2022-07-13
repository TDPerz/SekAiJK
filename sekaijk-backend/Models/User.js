const mongo = require('mongoose')
const bcrypt = require('bcrypt')

const Users = new mongo.Schema({
    username:String,
    name:String,
    role:String,
    email:String,
    password:String,
    img:{
        url:String,
        key:String,
    }
})

Users.statics.login = async function( username, password){
    const foundUser = await this.findOne({username})
    if(foundUser){
        if (await bcrypt.compare(password, foundUser.password)){
            const token = { user: foundUser.username, email: foundUser.email, role: foundUser.role, img: foundUser.img.url }
            return { Status:0, Mensaje :"Completado", Token: token }
        }
        else{
            return { Status: -1, Mensaje: "Usuario o contraseña incorrecta" }
        }
    }else{
        return { Status: -1, Mensaje: "Usuario o contraseña incorrecta" }
    }
}

Users.statics.exists = async function(token){
    return await this.findOne({ 'user': token.user })
}

Users.pre('save', async function(next){
    if(!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 12)
    next()
})

module.exports = mongo.model('User', Users)