const express = require("express");
const server = require("http").createServer();
const io = require("socket.io")(server);
let port = process.env.PORT || 3001;

let connections = [];
let users = [];
let numUsers = 0;

io.on("connection", socket => {
  connections.push(socket);
  console.log(`Total Connections:${connections.length}`);

  let addedUser = false;
  socket.username = "";

  socket.on("newUser", data => {
    socket.username = data;
    users.push(data);
  });
  socket.emit('display name', socket.username => {
  })



  //   client emits 'new message', so this listens..
  socket.on("new message", data => {
    //   and executes
    socket.broadcast.emit("new message", {
      username: socket.username,
      message: data
    });
  });

  // client emits 'add user', so listen
  socket.on("add user", username => {
    if (addedUser) return;
    socket.username = username;
    numUsers += 1;
    let addedUser = true;
    socket.emit("login", {
      username: socket.username,
      numUsers: numUsers
    });
  });

  socket.on("typing", () => {
    socket.broadcast.emit("typing", {
      username: socket.username
    });
  });

  socket.on("stop typing", () => {
    socket.broadcast.emit("stop typing", {
      username: socket.username
    });
  });

  socket.on("disconnect", () => {
    if (addedUser) {
      numUsers--;

      // echo globally that this client has left
      socket.broadcast.emit("user left", {
        username: socket.username,
        numUsers: numUsers
      });
    }
  });
});

server.listen(port, function(err) {
  if (err) throw err;
  console.log("listening on port 3001");
});
