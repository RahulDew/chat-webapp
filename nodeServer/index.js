// Node server which handles socket io connections

const io = require('socket.io')(8000, {
    cors: {
        origin: "http://127.0.0.1:5500"
    }
}) //importing socket.io module and setting port to 8000



const users = {} // creati a veriable for storing new joined users

io.on('connection', socket => {
    
    socket.on('new-user-joined', name => { //this line code socket.on accepcting an event 'new-user-joined'  
        // console.log("new user :", name); 
        users[socket.id] = name;  // setting the name(new user value) value to users variable
        socket.broadcast.emit('user-joined', name);  // broadcast a message that 'user joined' to all the users except only that user who now joined
    });

    socket.on('send', message => { // if any user sent any message then this 2 line of code broadcast all the user that message
        socket.broadcast.emit('receive', {message: message, name: users[socket.id]});
    });

    socket.on('disconnect', message => { // if any user sent any message then this 2 line of code broadcast all the user that message
        socket.broadcast.emit('left', users[socket.id]);
        delete users[socket.id];
    });
});