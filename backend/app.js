var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var server = app.listen(3001, function(){
    console.log("Node.js is listening to PORT:" + server.address().port);
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// CORSでOptionに対応する
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
    return;
});

app.post("/api/v1/espr/generate", (req, res, next)=> {
    console.log('generate api is called.');
    // console.log(req.body);
    console.log(JSON.stringify(req.body, null, '    '));

    // connection
    let connections = [];

    // nodes
    let nodes = [];

    // 開発用にCORSを許可

    res.json({"code":"loop() { }"});
});

/*
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
  "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
*/
