const routes = (require('express')).Router()
const Posts = require('../Models/Post')

routes.get('/post', async (req, res)=>{
    const posts = await Posts.getPosts()
    console.log(posts)
    res.send({status: 0, msg: "OK", posts})
})

routes.post('/post', async(req, res)=>{
    try{
        const newPost = new Posts(req.body)
        await newPost.save()
        res.json({status:0, msg:'Post creado!'})
    }catch(e){
        console.error(e)
        res.json({status:-1, msg:'Error al crear el post'})
    }
})

routes.put('/post/edit/:id', async(req, res)=>{
    const resp = await Posts.editPost(req.params.id, req.body)
    res.json(resp)
})

routes.delete('/post/delete/:id', async(req, res)=>{
    const resp = await Posts.deletePost(req.params.id)
    res.json(resp)
})

module.exports = routes