# Snake In The City
This is a fun, classical Snake game made with HTML, CSS and JavaScript. I have added sound effects to it to make it even more thrilling and exciting.
->When we are rendering animation, then to implement game loop, we use window.requestAnimationFrame(main) function instead of setInterval(). 
->The window.requestAnimationFrame() method tells the browser that you wish to perform an animation, and requests that the browser calls a specified function to update an animation before the next repaint. The method takes a callback as an argument to be invoked before the repaint. 
->The main() becomes the game loop controls the fps of the game. 
->The snake eats the food and continues to grow in size. Each time it eats food, a food particle is added at random location on the snakeboard. The Score Board gets updated whenever the snake eats the food, and shows the current points of the player. 

GAME IS OVER in two cases:
1. If by chance the snake collides into itself.
2. If snake touches the wall ie. the boundary of the snake board. 

When game is over, the Score gets reverted back to 0.

