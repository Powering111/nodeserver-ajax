const express = require('express');
const fs = require('fs');
const db = require('./db');
const app = express();
function handleListen(){
    console.log("server started.");
}
function handleHome(req,res){

    fs.readFile('res/'+req.path,'utf-8',(err,data)=>{
            res.set('content-type','text/html');
            res.send(data);
    })
}
function handleData(req,res){
    // fs.readFile('./yeah.html',(err,data)=>{
    //     res.send(data + Date.now());
    // });
    db.selectProblems(0,30).then((result)=>{
        res.json(result); 
    });
}
function handleUserList(req,res){
    db.selectUsers(0,30).then((result)=>{
        res.json(result);
        console.log(result);
    });
}
app.get('/',(req,res)=>{res.redirect('./index.html');});
app.get('/index.html',handleHome);
app.get('*.js',handleHome);
app.get('/data',handleData);
app.get('/userList',handleUserList);
app.listen(80,handleListen);