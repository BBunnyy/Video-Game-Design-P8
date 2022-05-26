//Main game loop!
//This pacman type game requires the player to pick up all the pellets

//What to do on key presses (Change direction of player)
function keyPressed() {
  if (keyCode == UP_ARROW) {
    player.dirChange.push("UP");
  }
  if (keyCode == DOWN_ARROW) {
    player.dirChange.push("DOWN");
  }
  if (keyCode == LEFT_ARROW) {
    player.dirChange.push("LEFT");
  }
  if (keyCode == RIGHT_ARROW) {
    player.dirChange.push("RIGHT");
  }
  if (keyCode == 32) {
    step = true;
    watch = true;
  }
}

//a wall object
var wallObj = function (x, y) {
  this.x = x;
  this.y = y;
};

//a pellet object that the player picks up, collect all to win
var pelletObj = function (x, y) {
  this.x = x;
  this.y = y;
};

//a queue object for A* searching
class qObj {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.fcost = 0;
  }

  set(a, b) {
    this.x = a;
    this.y = b;
  }
}

//game variables:
var player;
var enemies = [];
var walls = [];
var pellets = [];
var start_graph = [];

var gameState;

//a target objects for A* searching
function targetObj(x, y) {
  this.x = x;
  this.y = y;
}

//function to set up graphs for ghosts
function initGraph(x, y, me) {
  for (var i = 0; i < 20; i++) {
    for (var j = 0; j < 20; j++) {
      if (me.graph[i][j] > 0) {
        me.graph[i][j] = 0;
      }
      me.inq[i][j] = 0;
      me.cost[i][j] = 0;
    }
  }
  me.graph[x][y] = 1;
}

//function to update ghost's target
function updateTarget(me) {
  me.target.x = floor(player.position.x / 20) * 20 + 10;
  me.target.y = floor(player.position.y / 20) * 20 + 10;
  if (dist(me.target.x, me.target.y, me.position.x, me.position.y) > 5) {
    me.finalDest.x = me.target.x;
    me.finalDest.y = me.target.y;
    me.targetPos.x = floor(me.finalDest.y / 20);
    me.targetPos.y = floor(me.finalDest.x / 20);
    var i = floor(me.position.y / 20);
    var j = floor(me.position.x / 20);
    initGraph(i, j, me);
    me.pathFound = 0;
    me.pathLen = 0;
    findAStarPath(i, j, me);
    me.pathLen--;
    me.target.x = me.path[me.pathLen].x;
    me.target.y = me.path[me.pathLen].y;
    if (me.pathLen <= 10 && me.currState !== 1) {
      me.changeState(1);
    }
  }
}

function setup() {
  createCanvas(400, 400);
  angleMode(RADIANS);

  gameState = 0;

  //set up the base graph
  start_graph = new Array(20);
  for (var i = 0; i < 20; i++) {
    start_graph[i] = new Array(20);
  }

  //fill the graph and initialize players, enemies, etc
  initializeTilemap();

  //set the ghost's default graphs for searching
  for (var e = 0; e < enemies.length; e++) {
    enemies[e].setGraphs();
  }
}

function draw() {
  //if the game is in progress:
  if (pellets.length > 0 && gameState == 0) {
    //update targets every 30 frames
    if (frameCount % 30 == 0) {
      updateTarget(enemies[0]);
    }
    if (frameCount % 30 == 7) {
      updateTarget(enemies[1]);
    }
    if (frameCount % 30 == 15) {
      updateTarget(enemies[2]);
    }
    if (frameCount % 30 == 22) {
      updateTarget(enemies[3]);
    }

    background(230);
    //draw and move player/enemies
    displayTilemap();
    player.draw();
    for (var e = 0; e < enemies.length; e++) {
      enemies[e].draw();
      enemies[e].state[enemies[e].currState].execute(enemies[e]);
    }
    player.move();
  }
  //if pellets are all collected (game won)
  else if (pellets.length == 0) {
    fill(0, 255, 0);
    stroke(165);
    strokeWeight(3);
    textAlign(CENTER, CENTER);
    textSize(50);
    text("YOU WIN!", 200, 200);
  }
  //if the player touches a ghost (game lost)
  else {
    fill(255, 0, 0);
    stroke(255);
    strokeWeight(3);
    textAlign(CENTER, CENTER);
    textSize(50);
    text("GAME OVER!", 200, 200);
  }
}
