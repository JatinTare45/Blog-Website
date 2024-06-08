const express= require('express')
const articleRouter=require("./routes/articles")
const dotenv=require("dotenv")
const Article= require('./models/article')
const methodOverride= require('method-override')
const mongoose= require('mongoose')
const path = require('path');
const app= express()
dotenv.config();

app.use(express.static('public'));

//Use your MongoDB url to connect to your MongoDB Database.
mongoose.connect('MONGODB_URL')
app.set('view engine','ejs')
app.use(express.urlencoded({extended:false}))
app.use(methodOverride('_method'))
app.get('/', async(req,res) =>{
    const articles=await Article.find().sort({createdAt:'desc'})
    res.render('articles/index',{articles:articles})
})

app.use('/articles',articleRouter)
app.listen(4500)
