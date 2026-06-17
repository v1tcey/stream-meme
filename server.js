const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use(express.static('public'));

io.on('connection', (socket) => {
    socket.on('meme', (data) => {
        if (data.pass === process.env.APP_PASSWORD) {
            io.emit('show', data);
        }
    });
});

http.listen(process.env.PORT || 3000);