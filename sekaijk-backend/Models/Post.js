const mongo = require('mongoose')

const post = new mongo.Schema({
    title:String,
    front:{
        url:String,
        public_id:String
    },
    description:String,
    body:String,
    tags:[{
        tag:String
    }],
    categories:[{
        category:String
    }],
    by:{
        username:String,
        img:String,
        description:String
    },
    date:Date
})

/**
 * Devuelve todas las publicaciones.
 * @returns Retorna una lista de todas publicaciones.
 */
post.statics.getPosts = async function(){
    const posts = await this.find()
    if(posts){
        return posts
    }
    else{
        return []
    }
}

/**
 * Editar una publicacion
 * @param id id del post que se quiere cambiar
 * @param {title, front, body, tags, categories, by, date} props Propiedades que tiene la publicacion
 * @returns Si se logoro hacer el cambio con exito
 */
post.statics.editPost = async function( id, props){
    console.log(id + " y tambien: " + JSON.stringify(props))
    try{
        result = await this.updateOne({_id:id}, props)
        return {status:0,msg:'OK'}
    }catch(e){
        console.log(e)
        result = {status:-1, msg:'Error!'}
    }
}

/**
 * Funcion para eliminar un post
 * @param {} id id del objeto que se quiere borrar.
 * @returns retorna un mensaje si se completo o no.
 */
post.statics.deletePost = async function(id){
    try{
        await this.deleteOne({_id: id})
        return {status:0, msg:"OK"}
    }catch(e){
        return {status:-1, msg:"Error!"}
    }
    return resp
}

module.exports = mongo.model('Post', post)