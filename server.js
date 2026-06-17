const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
app.use(express.static('public'));

io.on('connection', (socket) => {
    socket.on('meme', (d) => {
        // Проверка пароля
        if (d.pass !== process.env.APP_PASSWORD) return;
        // Валидация текста (макс 18 символов)
        if (d.text && d.text.length > 18) d.text = d.text.substring(0, 18);
        // Валидация зон (Защита от отправки в запрещенные зоны)
        if (d.x > 75 || (d.x > 40 && d.x < 60 && d.y > 35 && d.y < 65)) return;
        
        io.emit('show', d);
    });
});
http.listen(process.env.PORT || 3000);