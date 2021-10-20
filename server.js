const express = require('express');
const fs = require('fs');
const db = require('./db');
const app = express();
function handleListen(){
    console.log("server started.");
}
function handleHome(req,res){

    fs.readFile('./index.html','utf-8',(err,data)=>{
            console.log(data);
            res.set('content-type','text/html');
            res.send(data);
      
    })
}
function handleData(req,res){
    fs.readFile('./yeah.html',(err,data)=>{
        res.send(data + Date.now().toString());
    });
}
function handleUserList(req,res){

}
app.get('/',handleHome);
app.get('/data',handleData);
app.get('/userList',handleUserList);
app.listen(80,handleListen);