var express = require("express")
var chalk = require("chalk")

var app = express()

app.get("/", function(req, res){
    res.send('Hello from LibraryJs')
})



app.listen(3000, function(){
    console.log("Listening on port 3000")
})