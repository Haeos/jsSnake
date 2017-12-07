const drawModule = ( () => {

  const bodySnake =  (x, y) => {
    ctx.fillStyle = 'green';
    ctx.fillRect(x * snakeSize, y * snakeSize, snakeSize, snakeSize);
    ctx.strokeStyle = 'darkgreen';
    ctx.strokeRect(x * snakeSize, y * snakeSize, snakeSize, snakeSize);
  }

  const apple =  (x, y) => {
    ctx.fillStyle = 'red';
    ctx.fillRect(x * snakeSize, y * snakeSize, snakeSize, snakeSize);
  }

  let scoreText =  () => {
    const score_text = "Score: " + score;
    ctx.fillStyle = 'blue';
    ctx.fillText(score_text, 145, h - 5);
  }

  const drawSnake =  () => {
    const length = 4;
    snake = [];
    for (let i = length - 1; i >= 0; i--) {
      snake.push({ x: i, y: 0 });
    }
  }

  const paint =  () => {
    ctx.fillStyle = 'lightgrey';
    ctx.fillRect(0, 0, w, h);
    ctx.strokeStyle = 'black';
    ctx.strokeRect(0, 0, w, h);

    start.setAttribute('disabled', true);

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;
    let tail;

    if (direction === 'right') {
      snakeX++;
    }
    else if (direction === 'left') {
      snakeX--;
    }
    else if (direction === 'up') {
      snakeY--;
    } else if (direction === 'down') {
      snakeY++;
    }

    if (snakeX < 0) {
      snakeX = bounds;
    }
    if (snakeX > bounds) {
      snakeX = 0;
    }

    if (snakeY < 0) {
      snakeY = bounds;
    }
    if (snakeY > bounds) {
      snakeY = 0;
    }

    if (checkCollision(snakeX, snakeY, snake)) {
      //restart game
      start.removeAttribute('disabled', true);

      ctx.clearRect(0, 0, w, h);
      gameloop = clearInterval(gameloop);
      return;
    }

    if (snakeX === food.x && snakeY === food.y) {
      tail = { x: snakeX, y: snakeY }; //Create a new head instead of moving the tail
      score++;

      createFood(); //Create new food
    } else {
      tail = snake.pop(); //pops out the last cell
      tail.x = snakeX;
      tail.y = snakeY;
    }

    //The snake can now eat the food.
    snake.unshift(tail); //puts back the tail as the first cell

    for (let i = 0; i < snake.length; i++) {
      bodySnake(snake[i].x, snake[i].y);
    }

    apple(food.x, food.y);
    scoreText();
  }

  const createFood =  () => {
    food = {
      x: Math.floor((Math.random() * 30) + 1),
      y: Math.floor((Math.random() * 30) + 1)
    }

    for (let i = 0; i > snake.length; i++) {
      let snakeX = snake[i].x;
      let snakeY = snake[i].y;

      if (food.x === snakeX && food.y === snakeY || food.y === snakeY && food.x === snakeX) {
        food.x = Math.floor((Math.random() * 30) + 1);
        food.y = Math.floor((Math.random() * 30) + 1);
      }
    }
  }

  const checkCollision =  (x, y, array) => {
    for (let i = 0; i < array.length; i++) {
      if (array[i].x === x && array[i].y === y)
        return true;
    }
    return false;
  }

  const init = () => {
    direction = 'down';
    drawSnake();
    createFood();
    gameloop = setInterval(paint, 80);
  }


  return {
    init: init
  };


})();
