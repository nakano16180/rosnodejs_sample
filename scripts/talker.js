#!/usr/bin/env node
'use strict';

const rclnodejs = require('rclnodejs');

function talker() {
  rclnodejs.init().then(() => {
    let std_msgs = rclnodejs.require('std_msgs').msg;

    // Create Node
    const node = rclnodejs.createNode('talker');
    // Create ROS publisher on the 'chatter' topic with String message
    const publisher = node.createPublisher(std_msgs.String, '/chatter');
    let msg = new std_msgs.String();

    let count = 0;
    // Define a function to execute every 100ms
    setInterval(() => {
      msg.data = 'hello world ' + count;
      publisher.publish(msg);

      // Log through stdout and /rosout
      console.log('I said: [' + msg.data + ']');
      ++count;
    }, 1000);
    rclnodejs.spin(node);
  });
}

if (require.main === module) {
  // Invoke Main Talker Function
  talker();
}