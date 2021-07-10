// game constants and variables which are going to help in this game
// initialy, we want the snake to remain static ie 
let snakeDirection = { x: 0, y: 0 };
const foodsound = new Audio('sounds/food.mp3');
const movesound = new Audio('sounds/move.mp3');
const failsound = new Audio('sounds/gameFail.mp3');
const musicSound = new Audio('sounds/musicSound.mp3');
let lastPaintTime = 0;
// initially last paint time is 0
// the snake array has the head of the snake. In JS, x and y axis is not the same as the conventional one. +ve x axis is from left to right  and +ve y axis is from top to bottom
let snakeArr = [
    { x: 13, y: 15 }
];
let speed = 10;
// food is not an array, it is just a single particle so it is an object
let food = { x: 6, y: 15 };
let score = 0;


// Game Functions
// the main() becomes the game loop...ctime is current time
function main(ctime) {
    musicSound.play();
    window.requestAnimationFrame(main);
    // console.log(ctime);
    // we can control the fps of the game loop: it will not paint the screen unless the time difference between currrent time and last painted time is 0.5seconds
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        // we don't want to render the animation
        return;
    }
    //otherwise update lastPaintTime
    lastPaintTime = ctime;
    // this function will run our game
    gameDriver();
}
function isCollide(snake) {
    //   if the snake bumps into itself, then :
    for (i = 1; i < snakeArr.length; i++) //iterate over snake's body parts
    {
        if ((snake[0].x === snake[i].x) && (snake[0].y === snake[i].y)) //if head coincides with any body part of the snake
        {
            return true;
        }
    }
    // if the snake bumps into the wall
    if (snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0) {
        return true;
    }
}


function gameDriver() {
    // part 1 : update the snake array.All the body parts that are added in snake will be updated in the snake array
    if (isCollide(snakeArr)) //if snakes collide
    {
        
        musicSound.pause();
        failsound.play();
        score = 0; //reset the score to zero
        scoreboard.innerHTML = "Score:" + score;
        
        alert('Game Over!! Press ok to play again');
        snakeDirection = { x: 0, y: 0 };
        snakeArr = [{ x: 13, y: 15 }]; //we will reset the snake array to only one element ie. head of the snake
        musicSound.play();
        
    }
    // if food has been eaten, then Increment the score and Regenerate the food at a random location.
    // Also add a body segment in snake

    if (snakeArr[0].x === food.x && snakeArr[0].y === food.y) {           //unshift adds an element at the start of an array
        score += 1;
        scoreboard.innerHTML = "Score:" + score;
        foodsound.play();
        snakeArr.unshift({ x: snakeArr[0].x + snakeDirection.x, y: snakeArr[0].y + snakeDirection.y });


        //now we generate random coordinates for food.we generate random numbers between 2 and 16
        let a = 2;
        let b = 16;
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) };

    }

    //to move the snake,move the i+1th array item over ith item to move it forward
    for (i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i + 1] = { ...snakeArr[i] }; //we have to use destructuring ... to create a new object snakeArr[i]. this will resolve the referencing issues. Otherwise all snakeArr[i+1] will point to snakeArr[i](if we write snakeArr[i+1] = snakeArr[i];)
    }
    snakeArr[0].x += snakeDirection.x;
    snakeArr[0].y += snakeDirection.y;
    // part 2 : display the snake and food on screen by making them as html elements
    // first of all we clean the snake board
    snakeboard.innerHTML = "";
    // now for each body part that has to be added in the snake body after eating food:
    snakeArr.forEach((a, index) => {
        // DISPLAY THE SNAKE
        // console.log(a);
        // console.log("index is"+index);
        // we create html element of snake bodypart:
        let bodypart = document.createElement('div');
        // now we provide its position on the board:
        bodypart.style.gridRowStart = (a.y);
        bodypart.style.gridColumnStart = (a.x);
        // now we apply class=snakehead to bodypart if there is only one element in the snakeArr
        if (index === 0) {
            bodypart.classList.add('snakehead');
        }
        // if there are multiple elements in the snakeArr, then apply class=snakebody
        else {
            bodypart.classList.add('snakebody');
        }
        // now we append bodypart as child of snake board
        snakeboard.appendChild(bodypart);

    });

    // DISPLAY THE FOOD
    // we create html element of snake bodypart:
    let foodElement = document.createElement('div');
    // now we provide its position on the board:
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    // now we apply class=food to bodypart:
    foodElement.classList.add('food');
    // now we append bodypart as child of snake board
    snakeboard.appendChild(foodElement);
}




// game logic starts here:

window.requestAnimationFrame(main);
// ******when we are rendering animation, then to implement gameloop, we will use requestAnimationFrame() instead of setInterval() and setTimeOut(). The window.requestAnimationFrame() method tells the browser that you wish to perform an animation and requests that the browser calls a specified function to update an animation before the next repaint. The method takes a callback as an argument to be invoked before the repaint.*********
// when any key on keyboard is pressed, then 'keydown' event is fired so we must listen to this event by adding event listener. first parameter is event(keydown) and second is arrow function(that has e as parameter)
window.addEventListener('keydown', e => {
    snakeDirection = { x: 0, y: 1 };   //start the game by moving the snake
    movesound.play();
    // to reset the sound to 0 second
    movesound.currentTime = 0;
    //  console.log(e);
    switch (e.key) {
        case "ArrowUp":
            snakeDirection.x = 0;
            snakeDirection.y = -1;
            console.log("ArrowUp");
            break;
        case "ArrowDown":
            snakeDirection.x = 0;
            snakeDirection.y = 1;
            console.log("ArrowDown");
            break;
        case "ArrowLeft":
            snakeDirection.x = -1;
            snakeDirection.y = 0;
            console.log("ArrowLeft");
            break;
        case "ArrowRight":
            snakeDirection.x = 1;
            snakeDirection.y = 0;
            console.log("ArrowRight");
            break;

        default:
            break;
    }

})