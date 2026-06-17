const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use(express.static('public'));

io.on('connection', (socket) => {
    socket.on('send_meme', (data) => {
        // Проверка: можно добавить пароль здесь
        if (data.password === "mysecret123") {
            io.emit('show_meme', data);
        }
    });
});

http.listen(process.env.PORT || 3000, () => console.log('Сервер запущен'));