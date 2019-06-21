# rosnodejs sample

## setup
```
$ cd ~/catkin_ws/src
$ git clone https://github.com/nakano16180/rosnodejs_sample.git
$ cd ~/catkin_ws && catkin_make
```

## run
example1
```
#terminal A
$ roscore

#terminal B
$ rosrun rosnodejs_sample talker.js

#terminal C
$ rosrun rosnodejs_sample listener.js
```

example2
```
#terminal A
$ roscore

#terminal B
$ rosrun rosnodejs_sample app.js
```

open your web browser and run 
```
#terminal C
$ rosrun rosnodejs_sample talker.js
```
