// get random number given a dimension
export function getRandomNumber(dimension) {
  // return Math.floor(Math.random() * dimension);
  return Math.floor(Math.random() * 1000 + 1) % dimension;
}

// looks for neighbouring cells and returns them
export function traverseBoard(x, y, data, height, width) {
  const el = [];

  //up
  if (x > 0) {
    el.push(data[x - 1][y]);
  }

  //down
  if (x < height - 1) {
    el.push(data[x + 1][y]);
  }

  //left
  if (y > 0) {
    el.push(data[x][y - 1]);
  }

  //right
  if (y < width - 1) {
    el.push(data[x][y + 1]);
  }

  // top left
  if (x > 0 && y > 0) {
    el.push(data[x - 1][y - 1]);
  }

  // top right
  if (x > 0 && y < width - 1) {
    el.push(data[x - 1][y + 1]);
  }

  // bottom right
  if (x < height - 1 && y < width - 1) {
    el.push(data[x + 1][y + 1]);
  }

  // bottom left
  if (x < height - 1 && y > 0) {
    el.push(data[x + 1][y - 1]);
  }

  return el;
}

// Plants mines on board randomly
export function plantMines(data, height, width, mines) {
  let randomX,
    randomY,
    minesPlanted = 0;
  while (minesPlanted < mines) {
    randomX = getRandomNumber(height);
    randomY = getRandomNumber(width);
    console.log(randomX, randomY);
    if (!data[randomX][randomY].isMine) {
      data[randomX][randomY].isMine = true;
      minesPlanted++;
    }
  }
  return data;
}

// get number of neighbouring mines for each board cell
export function getNeighbours(data, height, width) {
  let updatedData = data,
    index = 0;
  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      if (data[i][j].isMine !== true) {
        let mine = 0;
        const area = traverseBoard(
          data[i][j].x,
          data[i][j].y,
          data,
          height,
          width
        );
        area.map((value) => {
          if (value.isMine) {
            mine++;
          }
        });
        if (mine === 0) {
          updatedData[i][j].isEmpty = true;
        }
        updatedData[i][j].neighbour = mine;
      }
    }
  }

  return updatedData;
}

// Initialises the Board Data
export function initBoardData(height, width, mine) {
  let data = [];
  for (let i = 0; i < height; i++) {
    data.push([]);
    for (let j = 0; j < width; j++) {
      data[i][j] = {
        x: i,
        y: j,
        isMine: false,
        neighbour: 0,
        isRevealed: false,
        isEmpty: false,
        isFlagged: false,
      };
    }
  }
  // data = plantMines(data, height, width, mine);
  data = getNeighbours(data, height, width);
  console.log(data);
  return data;
}

/* Helper Functions */

// get mines
export function getMines(data) {
  let mineArray = [];

  data.map((datarow) => {
    datarow.map((dataitem) => {
      if (dataitem.isMine) {
        mineArray.push(dataitem);
      }
    });
  });

  return mineArray;
}

// get Flags
export function getFlags(data) {
  let mineArray = [];

  data.map((datarow) => {
    datarow.map((dataitem) => {
      if (dataitem.isFlagged) {
        mineArray.push(dataitem);
      }
    });
  });

  return mineArray;
}

// get Hidden cells
export function getHidden(data) {
  let mineArray = [];

  data.map((datarow) => {
    datarow.map((dataitem) => {
      if (!dataitem.isRevealed) {
        mineArray.push(dataitem);
      }
    });
  });

  return mineArray;
}
