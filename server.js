var path = require('path');
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var htmlPath = path.join(__dirname, 'app');

const jsonfile = require('jsonfile');
const file = './kdlist.JSON';
var kdList;

jsonfile.readFile(file, function (err, obj) {
    if (err) console.error(err)
    kdList = obj;
    console.log(kdList);
})

app.use(express.static(htmlPath));

io.on('connection', function (socket) {
    console.log('a user connected');

    socket.emit('emitCal', kdList);

    socket.on('inputKD', (name, email, date) => {
        console.log(name, email, date);
        if(name !== '' && date !== '' && !hasEntry(kdList[date], 'email', email)) {
            if(kdList[date] === undefined) kdList[date] = [];
            kdList[date].push({'name': name, 'email': email});
            saveList();
        }
    });
});

http.listen(3000, function () {
    console.log('listening on *:3000');
});

function saveList() {
    let ordered = {};
    Object.keys(kdList).sort().forEach(function (key) {
        ordered[key] = kdList[key];
    });
    jsonfile.writeFile(file, ordered, {spaces: 2}, function (err) {
        if (err) console.error(err);
    });
}

function hasEntry(arr, key, value) {
    let result = false;
    if(arr !== undefined) {
        arr.forEach(e => {
            if(e[key] == value) result = true;
        });
    }
    return result;
}