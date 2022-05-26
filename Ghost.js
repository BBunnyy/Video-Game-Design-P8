//Class for an enemy ghost!
//Ghosts will chase when a path of 10 or less units is found
//paths are calculated every 30 frames
//collect all the dots to win
//touching a ghost causes game over

class Ghost {
  constructor(x, y) {
    //states and movement
    this.position = new p5.Vector(x, y);
    this.state = [new wanderState(), new chaseState()];
    this.currState = 0;
    this.speed = 1;
    this.dir = "X";

    //default ghost color
    this.color = [255];

    //variables to find and track paths to the player
    this.graph = new Array(20);
    this.cost = new Array(20);
    this.inq = new Array(20);
    this.comefrom = new Array(20);
    for (var i = 0; i < 20; i++) {
      this.graph[i] = new Array(20);
      this.cost[i] = new Array(20);
      this.inq[i] = new Array(20);
      this.comefrom[i] = new Array(20);
    }
    for (i = 0; i < 20; i++) {
      for (var j = 0; j < 20; j++) {
        this.comefrom[i][j] = new p5.Vector(0, 0);
      }
    }
    this.path = [];
    this.q = [];
    for (i = 0; i < 400; i++) {
      this.path.push(new p5.Vector(0, 0));
      this.q.push(new qObj(0, 0));
    }
    this.pathLen = 0;
    this.pathFound = 0;
    this.qLen = 0;
    this.qStart = 0;
    this.target = new targetObj(0, 0);
    this.targetPos = new targetObj(0, 0);
    this.finalDest = new targetObj(0, 0);
    //End variables to track pathing
  }

  //set the ghost's graph to the start
  setGraphs() {
    this.graph = start_graph;
  }

  //changes the ghost's state
  changeState(x) {
    this.currState = x;
  }

  //draws the ghost
  draw() {
    if (
      dist(
        this.position.x,
        this.position.y,
        player.position.x,
        player.position.y
      ) < 18
    ) {
      gameState = 1;
    }

    push();
    translate(this.position.x, this.position.y);
    fill(this.color);
    stroke(0);
    arc(0, 0, 20, 20, PI, PI * 2);
    noStroke();
    triangle(-10, 0, -10, 10, 0, 0);
    triangle(-10, 0, 0, 10, 10, 0);
    triangle(10, 0, 10, 10, 0, 0);
    stroke(0);
    line(-10, 0, -10, 10);
    line(-10, 10, -5, 5);
    line(0, 10, -5, 5);
    line(0, 10, 5, 5);
    line(10, 0, 10, 10);
    line(10, 10, 5, 5);
    pop();
  }

  //determine possible paths to move in
  paths() {
    var outputPaths = ["X", "X", "X", "X"];
    //if space above
    if (
      start_graph[floor(this.position.y / 20) - 1][
        floor(this.position.x / 20)
      ] != -1
    ) {
      outputPaths[0] = "UP";
    }
    //if space below
    if (
      start_graph[floor(this.position.y / 20) + 1][
        floor(this.position.x / 20)
      ] != -1
    ) {
      outputPaths[1] = "DOWN";
    }
    //if space left
    if (
      start_graph[floor(this.position.y / 20)][
        floor(this.position.x / 20) - 1
      ] != -1
    ) {
      outputPaths[2] = "LEFT";
    }
    //if space right
    if (
      start_graph[floor(this.position.y / 20)][
        floor(this.position.x / 20) + 1
      ] != -1
    ) {
      outputPaths[3] = "RIGHT";
    }

    return outputPaths;
  }

  //draw path to player to show A* is working
  drawPath2Player() {
    for (var i = 0; i <= this.pathLen; i++) {
      push();
      this.color.push(50);
      fill(this.color);
      this.color.splice(3, 1);
      noStroke();
      circle(this.path[i].x, this.path[i].y, 10);
      pop();
    }
  }
}
