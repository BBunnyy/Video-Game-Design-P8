class Player {
  constructor(x, y) {
    this.position = new p5.Vector(x, y);
    this.speed = 2
    this.state = [new wanderState(), new chaseState()];
    this.currState = 0;
    this.dir = "NONE";
    this.dirChange = [];
  }

  draw() {
    push();
    translate(this.position.x, this.position.y);
    fill(255, 255, 0);
    stroke(0)
    if (this.dir == "DOWN") {
      rotate(PI/2)
    }
    else if(this.dir == "LEFT") {
      rotate(PI)
    }
    else if(this.dir == "UP") {
      rotate(3*PI/2)
    }
    
    arc(0,0,20,20,PI/6,11*PI/6,PIE)
    pop();
  }

  move() {
    for(var p = 0; p < pellets.length; p++) {
      if (dist(this.position.x, this.position.y, pellets[p].x, pellets[p].y) < 12) {
        pellets.splice(p,1);
        p--
      }
    }
    
    if (
      this.position.x % 20 == 10 &&
      this.position.y % 20 == 10 &&
      this.dirChange.length != 0
    ) {
      var newDir = this.dirChange[this.dirChange.length - 1];

      if (
        (newDir == "RIGHT" && start_graph[floor(this.position.y / 20)][floor(this.position.x / 20) + 1] !=
        -1 ) ||
        (newDir == "LEFT" && start_graph[floor(this.position.y / 20)][floor(this.position.x / 20) - 1] !=
        -1 ) ||
        (newDir == "UP" && start_graph[floor(this.position.y / 20) - 1][floor(this.position.x / 20)] !=
        -1 ) ||
        (newDir == "DOWN" && start_graph[floor(this.position.y / 20) + 1][floor(this.position.x / 20)] !=
        -1 )
        
      ) {
        this.dir = newDir
      }
    }
    if (
      this.dir == "RIGHT" &&
      (start_graph[floor(this.position.y / 20)][floor(this.position.x / 20) + 1] !=
        -1 ||
        this.position.x % 20 != 10)
    ) {
      this.position.x += this.speed;
    }
    if (
      this.dir == "LEFT" &&
      (start_graph[floor(this.position.y / 20)][floor(this.position.x / 20) - 1] !=
        -1 ||
        this.position.x % 20 != 10)
    ) {
      this.position.x -= this.speed;
    }
    if (
      this.dir == "DOWN" &&
      (start_graph[floor(this.position.y / 20) + 1][floor(this.position.x / 20)] !=
        -1 ||
        this.position.y % 20 != 10)
    ) {
      this.position.y += this.speed;
    }
    if (
      this.dir == "UP" &&
      (start_graph[floor(this.position.y / 20) - 1][floor(this.position.x / 20)] !=
        -1 ||
        this.position.y % 20 != 10)
    ) {
      this.position.y -= this.speed;
    }
  }
}
