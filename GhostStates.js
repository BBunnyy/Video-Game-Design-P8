//States for the ghost enemies!  
//Wander state happens while ghosts cannot find a path less than 8 blocks away from the player
//Chase state occurs when the player is 10 blocks in a path away, the pacman will take the best path found using the A* algorithm


class wanderState {
  constructor() {}

  execute(me) {
    var PossibleDir = me.paths();

    //only on first wander, if no direction is set, set one  
    if (me.dir == "X") {
      var newDir = "X";
      while (newDir == "X") {
        newDir = PossibleDir[floor(random(0, 4))];
      }
      me.dir = newDir;
    }

    //find the opposite direction
    var oppDir = "X";
    if (me.dir == "UP") {
      oppDir = "DOWN";
    } else if (me.dir == "DOWN") {
      oppDir = "UP";
    } else if (me.dir == "LEFT") {
      oppDir = "RIGHT";
    } else if (me.dir == "RIGHT") {
      oppDir = "LEFT";
    }

    //find how many possible directions to wander there are
    
    var numDir = [];

    for (var d = 0; d < PossibleDir.length; d++) {
      if (PossibleDir[d] != "X" && PossibleDir[d] != oppDir) {
        numDir.push(d);
      }
    }

    //set a random direction you can travel in
    if (me.position.x % 20 == 10 && me.position.y % 20 == 10) {
      if (numDir.length == 1) {
        me.dir = PossibleDir[numDir[0]];
      } else if (numDir.length >= 2) {
        me.dir = PossibleDir[numDir[floor(random(0, numDir.length))]];
      }
    }

    //set movement based on direction 
    if (me.dir == "UP") {
      me.position.y -= me.speed;
    } else if (me.dir == "DOWN") {
      me.position.y += me.speed;
    } else if (me.dir == "LEFT") {
      me.position.x -= me.speed;
    } else if (me.dir == "RIGHT") {
      me.position.x += me.speed;
    }
  }
}

class chaseState {
  constructor() {
    this.step = new p5.Vector(0, 0);
  }

  execute(me) {
    //if there is no short path (10 blocks), wander
    if (
      me.pathLen > 10 &&
      me.position.x % 20 == 10 &&
      me.position.y % 20 == 10
    ) {
      me.currState = 0;
    } else {
      me.drawPath2Player()
      
      //if you are not at the target location:
      if (dist(me.target.x, me.target.y, me.position.x, me.position.y) > 0) {
        if (me.pathLen > 0) {
          if (
            me.pathLen > 0 &&
            me.target.x == me.position.x &&
            me.target.y > me.position.y &&
            me.path[me.pathLen - 1].y < me.position.y
          ) {
            //print("Same X, above  target, below next target")
            me.pathLen--;
            me.target.x = me.path[me.pathLen].x;
            me.target.y = me.path[me.pathLen].y;
          }
          if (
            me.pathLen > 0 &&
            me.target.y == me.position.y &&
            me.target.x > me.position.x &&
            me.path[me.pathLen - 1].x < me.position.x
          ) {
            //print("Same Y, Left of  target, Right of next target")
            me.pathLen--;
            me.target.x = me.path[me.pathLen].x;
            me.target.y = me.path[me.pathLen].y;
          }
          if (
            me.pathLen > 0 &&
            me.target.x == me.position.x &&
            me.target.y < me.position.y &&
            me.path[me.pathLen - 1].y > me.position.y
          ) {
            //print("Same X, below  target, above next target")
            me.pathLen--;
            me.target.x = me.path[me.pathLen].x;
            me.target.y = me.path[me.pathLen].y;
          }
          if (
            me.pathLen > 0 &&
            me.target.y == me.position.y &&
            me.target.x < me.position.x &&
            me.path[me.pathLen - 1].x > me.position.x
          ) {
            //print("Same Y, Right of target, Left of next target")
            me.pathLen--;
            me.target.x = me.path[me.pathLen].x;
            me.target.y = me.path[me.pathLen].y;
          }
        }
        //take a step towards the target location:
        this.step.set(me.target.x - me.position.x, me.target.y - me.position.y);
        this.step.normalize();
        this.step.mult(me.speed);
        me.position.add(this.step);
      }
      //if you are at the target position
      else {
        //if the target position is the final destination
        if (me.finalDest.x === me.target.x && me.finalDest.y === me.target.y) {
          //half
          updateTarget(me);
        }
        //if the target position is not the final destination
        else {
          //remove location
          me.pathLen--;

          //there are more paths
          if (me.pathLen > 0) {
            //set the next target location
            me.target.x = me.path[me.pathLen].x;
            me.target.y = me.path[me.pathLen].y;
          }
          //there are no more paths, go to the final destination
          else {
            me.target.x = me.finalDest.x;
            me.target.y = me.finalDest.y;
          }
        }
      }
    }
  }
}
