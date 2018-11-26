var path = require('path');
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var htmlPath = path.join(__dirname, 'app');

app.use(express.static(htmlPath));

io.on('connection', function (socket) {
    console.log('a user connected');

    socket.on('inputKD', (name, email, date) => {
        console.log(name, email, date);
    });
});

http.listen(3000, function () {
    console.log('listening on *:3000');
});