#!/usr/bin/env node
'use strict';

const rosnodejs = require('rosnodejs');
const std_msgs = rosnodejs.require('std_msgs').msg;

var express = require("express");
var app = express();
var http = require('http').Server(app);
const io = require('socket.io')(http);
const PORT = process.env.PORT || 3000;

rosnodejs.initNode('/listener_node')
    .then((rosNode) => {
      let sub = rosNode.subscribe('/chatter', std_msgs.String,
        (data) => {
          rosnodejs.log.info('I heard: [' + data.data + ']');
          io.emit('other-message', data.data);  // 送信
        }
      );
      let sub2 = rosNode.subscribe('/response', std_msgs.String,
        (data) => {
          rosnodejs.log.info('I spoke: [' + data.data + ']');
          io.emit('message', data.data);  // 送信
        }
      );

      io.on('connection',function(socket){
        console.log('connected');
      });
    
      http.listen(PORT, () => {
        console.log("Node.js is listening to PORT:" + PORT);
      });
    });

app.get("/", function(req, res, next){
  res.sendFile(__dirname + '/index.html');
});