const express=require("express");
const bodyparser=require("body-parser");
const logger = require('morgan');
const mongoose=require("mongoose");
const app=express();
app.use(bodyparser.json());
const port=5000;
const path=require("path");
//serving static files
app.use(express.static('public'));//to use public folder
app.set('views','./views');
app.set('view engine', 'ejs');
app.use(bodyparser.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'public')));
app.use(logger('dev'));
const homeRouter=require('./routes/homeroute');
const newsRouter=require('./routes/newsroute');
app.use('/',homeRouter);
app.use('/article',newsRouter);
app.get('/audio',(req,res)=>{
    res.render('audio');
});
app.get('/about',(req,res)=>{
    res.render('about');
});
app.get('/contact',(req,res)=>{
    res.render('contact');
});
app.get('/ebook',(req,res)=>{
    res.render('ebook');
});
app.get('/signup',(req,res)=>{
    res.render('signup');
})
let db=mongoose.connection;
db.once('open',()=>{console.log("successfully connected")});
db.on('err',()=>{console.log("error in connecting to database")});
app.get('/signup_success',(req,res)=>{
    res.render('signup_success');
})
app.post('/signup',(req,res)=>{
    var name=req.body.name;
var email=req.body.email;
var data={
    "name":name,
    "email":email
}
console.log("database");
db.collection('users').insertOne(data,(err,collection)=>{
    if(err){
       console.log(err.messsage);
    }
    else{
        console.log("Successfully saved to database");
    }
    res.redirect('signup_success');
});
 
})

app.listen(port,()=>{
    console.log(`App is listening at ${port}`);
});