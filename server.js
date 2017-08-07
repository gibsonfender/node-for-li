var express = require('express');
var mysql = require('mysql');  

var connectionsql = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '123456',
  database : 'test'
});

connectionsql.connect();//连接数据库


app = express(),
server = require('http').createServer(app),
io = require('socket.io').listen(server); //引入socket.io模块并绑定到服务器
app.use('/', express.static(__dirname + '/www'));
server.listen(80);

//socket部分
io.on('connection', function(socket) {
    //接收并处理客户端发送的foo事件
    socket.on('foo', function(data) {
        //将消息输出到控制台
        // console.log(data);
        //发送信息
        var timestamp=new Date().getTime();
        io.sockets.emit('return', data);
        
        //console.log('INSERT INTO node_talk (talk, time,user) VALUES ('+'"'+data+'"'+', '+timestamp+',"user")');

        connectionsql.query('INSERT INTO node_talk (talk, time,user) VALUES ('+'"'+data+'"'+', '+timestamp+',"user")');//保存聊天数据




    })
});

