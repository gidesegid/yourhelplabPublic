var express = require('express');
var app = express();
var jwt=require('jsonwebtoken');
var fs = require('fs');
var path=require('path');
var router=require('./router/main');
var bodyParser = require('body-parser');

app.set('views',__dirname + '/views');
//var io = require("socket.io").listen(http);
var port=process.env.PORT || 3010
app.engine('html', require('ejs').renderFile);
app.use('/',router);
app.use('/jobFinder/',router);
app.use(express.static(__dirname+'/public'));
 app.use(express.static('./views/'));
 app.use(bodyParser.json());
http://localhost:3000/jobFinder/css/style.css
app.engine('html', require('ejs').renderFile);
app.use(bodyParser.urlencoded({extended:false}));
 app.use(function(req, res, next) { //allow cross origin requests
        res.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
        res.header("Access-Control-Allow-Origin", "http://localhost");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
  });
 var http = require('http').Server(app);
 var io = require("socket.io")(http);
 var socket=require('./socket/socket.js')(io);
 function lineBreakCount(str){
  /* counts \n */
  try {
    return console.log(((str.match(/[^\n]*\n[^\n]*/gi).length)));
  } catch(e) {
    return 0;
  }
}
var mystring=" sfsdfdfsdfsdfsdf sdfsdfsdfsfsf fsfsdfsdff"
lineBreakCount(mystring)
http.listen(port, function(){

        console.log('The server yourhelplab.com is running...');
        lineBreakCount(mystring)
 });
