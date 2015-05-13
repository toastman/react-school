"use strict";

var express = require('express');
var app = express();

var path = require('path');

app.use("/build", express.static(path.join(__dirname, "/build")));

app.get('/', function(req, res){
  res.sendFile(path.join(__dirname, '/view/index.html'));
});

app.listen(3000, function(){
  console.log("Server is up and running on 3000 port");
});
