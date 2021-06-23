const express = require('express')
const path = require('path')

const PORT = process.env.PORT || 3000

const app = express()
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs')

app.get("/", (req,res)=>{
    res.render('index')
})

app.get("/about", (req,res)=>{
    res.render('about')
})


app.listen(PORT,()=> {
    console.log("Serving is running " + PORT)
})