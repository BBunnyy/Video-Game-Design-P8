//Path finding algorithm using A*, used the current cost to a position plus an estimated cost
//estimated cost is determined at the distance to the final point

function findAStarPath(x, y, me) {
  var i, j, a, b;
  me.qLen = 0; //Resent the length of the Queue
  me.graph[x][y] = 1; //Set current position in graph as visited
  me.inq[x][y] = 1; //Set current position as in queue

  me.q[me.qLen].set(x, y); //add the current position to the queue
  me.q[me.qLen].fcost = 0; //Add the cost 
  me.qLen++; //increment the length of the queue
  me.pathLen = 0; //initialize the path length
  me.qStart = 0; //mark the start of current search in q

  //Find the minimum estimated cost in the remaining of the queue
  var findMinInQ = function () {
    //minimum estimated cost is current cost
    var min = me.q[me.qStart].fcost;
    //minimum index is current queue
    var minIndex = me.qStart;
    //search through all following queue entries
    for (var i = me.qStart + 1; i < me.qLen; i++) {
      //if a smaller estimated cost in the queue is found
      if (me.q[i].fcost < min) {
        //the min is now at the found entry
        min = me.q[i].qStart;
        minIndex = i;
      }
    }
    
    //if the min estimated cost is not current position
    if (minIndex !== me.qStart) {
      // swap positions in the queue
      var t1 = me.q[minIndex].x;
      var t2 = me.q[minIndex].y;
      var t3 = me.q[minIndex].fcost;
      me.q[minIndex].x = me.q[me.qStart].x;
      me.q[minIndex].y = me.q[me.qStart].y;
      me.q[minIndex].fcost = me.q[me.qStart].fcost;
      me.q[me.qStart].x = t1;
      me.q[me.qStart].y = t2;
      me.q[me.qStart].fcost = t3;
    }
  };

  //a, b is a next location looked at, i, j is the location traveling from
  var setComeFrom = function (a, b, i, j, me) {
    //mark the next location as in the queue
    me.inq[a][b] = 1;
    //mark the location you came from to get to this cell
    me.comefrom[a][b].set(i, j);
    //add the next cell to the queue
    me.q[me.qLen].set(a, b);
    //the cost to travel here is the cost so far plus 20 (20 units between each cell)
    me.cost[a][b] = me.cost[i][j] + 20;
    //the estimated cost is the current cost + the distance to the final destination
    me.q[me.qLen].fcost =
      me.cost[a][b] +
      dist(b * 20 + 10, a * 20 + 10, me.finalDest.x, me.finalDest.y);
    me.qLen++;
  };

  //While the path is not found and there are more values in the Queue, search for the next place to travel
  while (me.qStart < me.qLen && me.pathFound === 0) {
    //find the next cell with minimum cost
    findMinInQ();

    //note the coordinates of the minimum cost move in queue
    i = me.q[me.qStart].x;
    j = me.q[me.qStart].y;
    //mark this position as visited
    me.graph[i][j] = 1;
    me.qStart++;
  
    //if the location is the target position, mark that path was found, and set final entry in path to that position
    if (i === me.targetPos.x && j === me.targetPos.y) {
      me.pathFound = 1;
      me.path[me.pathLen].set(j * 20 + 10, i * 20 + 10);
      me.pathLen++;
    }

    //cell to the right
    a = i + 1;
    b = j;
    //if the cell is in bounds
    if (a < 20 && me.pathFound === 0) {
      //if that cell is not visited, and not already in queue
      if (me.graph[a][b] === 0 && me.inq[a][b] === 0) {
        //add the another possible position to the queue
        setComeFrom(a, b, i, j, me);
      }
    }

    //cell to the left
    a = i - 1;
    b = j;
    //if the cell is in bounds
    if (a >= 0 && me.pathFound === 0) {
      //if that cell is not visited, and not already in queue
      if (me.graph[a][b] === 0 && me.inq[a][b] === 0) {
        //mark where you came from to visit that cell
        setComeFrom(a, b, i, j, me);
      }
    }

    //cell below
    a = i;
    b = j + 1;
    //if the cell is in bounds
    if (b < 20 && me.pathFound === 0) {
      //if that cell is not visited, and not already in queue
      if (me.graph[a][b] === 0 && me.inq[a][b] === 0) {
        //mark where you came from to visit that cell
        setComeFrom(a, b, i, j, me);
      }
    }

    //cell above
    a = i;
    b = j - 1;
    //if the cell is in bounds
    if (b >= 0 && me.pathFound === 0) {
      //if that cell is not visited, and not already in queue
      if (me.graph[a][b] === 0 && me.inq[a][b] === 0) {
        //mark where you came from to visit that cell
        setComeFrom(a, b, i, j, me);
      }
    }
  }

  // while the cell at is not at the original x and y
  while (i !== x || j !== y) {
    //add the location that you came before to the path
    a = me.comefrom[i][j].x;
    b = me.comefrom[i][j].y;
    me.path[me.pathLen].set(b * 20 + 10, a * 20 + 10);
    me.pathLen++;
    //move to that cell
    i = a;
    j = b;
  }
}
