var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
io.on('connection', function(socket){
      console.log('a user connected');
});

app.use(express.static('dist'));
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


app.get("/chart", (req, res, next) => {
    var options = {
        root: __dirname + '/dist/',
    }
    res.sendFile('chart.html', options);
});

/*
app.get("/", (req, res, next)=> {
    var options = {
        root: __dirname + '/dist/',
    }
    res.sendFile('index.html', options);
});
*/

// websocket
io.on('connection', function(socket){
    let room = '';

    console.log('a user connected');

    socket.on('disconnect', function(){
        console.log('user disconnected');
    });

    socket.on('join_room', function(data){
        console.log('join_room to: ' + data.room);
        room = data.room;
        socket.join(data.room);
    });

    socket.on('sensor_data', function(data){
        console.log('message: ' + JSON.stringify(data));
        socket.to(room + '_out').emit('sensor_data', data)
    });
});

http.listen(3001, function(){
      console.log('listening on *:3001');
});
