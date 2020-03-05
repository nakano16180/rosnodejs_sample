#!/usr/bin/env node
'use strict';

const rclnodejs = require('rclnodejs');

function listener() {
  rclnodejs.init().then(() => {
    let std_msgs = rclnodejs.require('std_msgs').msg;

    // Create Node
    const node = rclnodejs.createNode('listener');

    let pub = node.createPublisher(std_msgs.String, '/response');
    const msg = new std_msgs.String();
    let count = 1;
    
    let sub = node.createSubscription(std_msgs.String, '/chatter',
      (data) => {
        console.log('I heard: [' + data.data + ']');
        
        
        msg.data = 'response ' + count;
        // Log through stdout and /rosout
        console.log('I said: [' + msg.data + ']');
        pub.publish(msg);
        ++count;
      }
    );
    rclnodejs.spin(node);
  });
}

if (require.main === module) {
  listener();
}