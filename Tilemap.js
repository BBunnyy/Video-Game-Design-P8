var tileMap = [
  "wwwwwwwwwwwwwwwwwwww",
  "wg                gw",
  "w www w wwww w www w",
  "w w   w      w   w w",
  "w w w ww ww ww w w w",
  "w w w    ww    w w w",
  "w w w wwwwwwww w w w",
  "w   w          w   w",
  "w www wwwww ww www w",
  "w        ww ww www w",
  "w www ww wwp       w",
  "w www ww wwwww www w",
  "w   w          w   w",
  "w w w wwwwwwww w w w",
  "w w w    ww    w w w",
  "w w w ww ww ww w w w",
  "w w   w      w   w w",
  "w www w wwww w www w",
  "wg                gw",
  "wwwwwwwwwwwwwwwwwwww",
];

//initialize the tile map
function initializeTilemap() {
  //colors for ghosts
  var colors = [
    [255, 0, 0],
    [255, 165, 0],
    [0, 165, 0],
    [238, 130, 238],
    [75, 0, 130],
  ];
  //read the tile map
  for (var i = 0; i < tileMap.length; i++) {
    for (var j = 0; j < tileMap[i].length; j++) {
      if (tileMap[i][j] === "w") {
        walls.push(new wallObj(j * 20, i * 20));
        start_graph[i][j] = -1;
      } else {
        if (tileMap[i][j] === "g") {
          enemies.push(new Ghost(j * 20 + 10, i * 20 + 10));
          enemies[enemies.length - 1].color =
            colors[(enemies.length - 1) % colors.length];
        }
        if (tileMap[i][j] === "p") {
          player = new Player(j * 20 + 10, i * 20 + 10);
        }
        pellets.push(new pelletObj(j * 20 + 10, i * 20 + 10));
        start_graph[i][j] = 0;
      }
    }
  }
}

//display everything in the tile map
function displayTilemap() {
  fill(0, 140, 180);
  noStroke();
  for (var i = 0; i < walls.length; i++) {
    rect(walls[i].x, walls[i].y, 20, 20);
  }
  fill(0, 0, 255);
  stroke(0);
  for (var j = 0; j < pellets.length; j++) {
    rect(pellets[j].x - 2, pellets[j].y - 2, 4, 4);
  }
}
