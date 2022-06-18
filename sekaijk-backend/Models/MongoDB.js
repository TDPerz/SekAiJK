const mongoose = require('mongoose')
mongoose.connect(process.env.DB, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
    console.log("CONNECTION OPEN!!!")
})
.catch(err => {
    console.log("OH NO ERROR!!!!")
    console.log(err)
})

module.exports = mongoose