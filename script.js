
const GAME_WIDTH = 600;
const GAME_HEIGHT = 600;
const PIXEL_SIZE = 15;


let snake = {
    direction: '',
    trail: []
};

let apple = {
    x: 0,
    y: 0
};

function newApple() {
    // create a random position to a apple (0 , SCREEN_SIZE - 10)
    const applex = parseInt((Math.random() * 1000) % (GAME_WIDTH - PIXEL_SIZE));
    const appley = parseInt((Math.random() * 1000) % (GAME_HEIGHT - PIXEL_SIZE));

    apple.x = parseInt(applex / PIXEL_SIZE) * PIXEL_SIZE;
    apple.y = parseInt(appley / PIXEL_SIZE) * PIXEL_SIZE;
}

function initialize() {
    newApple();

    // create a random position to a snake (0 , SCREEN_SIZE - 10)
    const snakex = parseInt((Math.random() * 1000) % (GAME_WIDTH - PIXEL_SIZE));
    const snakey = parseInt((Math.random() * 1000) % (GAME_HEIGHT - PIXEL_SIZE));

    snake = {
        direction: '',
        trail: []
    }

    snake.trail.push({
        x: parseInt(snakex / PIXEL_SIZE) * PIXEL_SIZE,
        y: parseInt(snakey / PIXEL_SIZE) * PIXEL_SIZE,
    });
}

function move() {
    document.addEventListener('keydown', ({ key }) => {
        if (key === 'ArrowUp' && snake.direction !== 'ArrowDown' || 
        key === 'ArrowDown' && snake.direction !== 'ArrowUp' ||
        key === 'ArrowLeft' && snake.direction !== 'ArrowRight' ||
        key === 'ArrowRight' && snake.direction !== 'ArrowLeft')
            snake.direction = key;
    });
    
    let direction = {
        x: 0,
        y: 0
    } 

    if (snake.direction == 'ArrowUp') direction.y = - PIXEL_SIZE;
    else if (snake.direction == 'ArrowDown') direction.y = PIXEL_SIZE;
    else if (snake.direction == 'ArrowLeft') direction.x = - PIXEL_SIZE;
    else if (snake.direction == 'ArrowRight') direction.x = PIXEL_SIZE;

    snake.trail.unshift({
        x: snake.trail[0].x + direction.x,
        y: snake.trail[0].y + direction.y
    });

    snake.trail.pop();
}

function check() {
    // Game Over check
    if (snake.trail[0].x > GAME_WIDTH - 10 || snake.trail[0].y > GAME_HEIGHT - 10 ||
        snake.trail[0].x < 0 || snake.trail[0].y < 0){
        alert("Fim do jogo")
        initialize();
    
    }else if (snake.trail[0].x === apple.x && snake.trail[0].y === apple.y){// Snake eat the apple
        newApple();
        snake.trail.push(snake.trail[snake.trail.length-1]);
    }else {
        snake.trail.map((value, index) => {
            if (index !== 0 && value.x == snake.trail[0].x && value.y == snake.trail[0].y) {
                alert("Fim do jogo")
                initialize();
            }
        })
    }
}

function draw(ctx) {

    // Field
    ctx.fillStyle = 'grey';
    ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

    // apple
    ctx.fillStyle = 'red';
    ctx.fillRect(apple.x, apple.y, PIXEL_SIZE, PIXEL_SIZE);

    //snake
    snake.trail.map(part => {
        ctx.fillStyle = 'green';
        ctx.fillRect(part.x, part.y, PIXEL_SIZE, PIXEL_SIZE);
    })
}

function loop(ctx) { 
    move();
    check()
    draw(ctx);
    setTimeout(() => loop(ctx), 200);
}



function game() {
    let game = document.getElementById('game');
    let ctx = game.getContext('2d');

    game.width = 600
    game.height = 600
    
    game.width = GAME_WIDTH
    game.height = GAME_WIDTH

    initialize();
    loop(ctx);
}