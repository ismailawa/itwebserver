// const http = require('http')


// const server = http.createServer((req,res)=> {

//    res.end(req.url)

// })


// server.listen(3000,"localhost",()=>{
//     console.log("Server running  on localhost:3000")
// })


const express = require('express')
const path = require('path')

const app = express()
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs')

app.get("/", (req,res)=>{
    res.render('index')
})

app.get("/about", (req,res)=>{
    res.render('about')
})



app.listen(3000,()=> {
    console.log("Serving is running")
})