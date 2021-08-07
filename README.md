# Snake In The City
This is a simple and fun Snake game made with HTML, CSS and JavaScript. I have added sound effects to it to make it even more thrilling and exciting.
The game loop has been implemented by using a main() function which controls the fps of the game loop and repaints the screen. 
The snake eats the food and continues to grow in size. Each time it eats food, a food particle is added at random location on the snakeboard. The Score Board gets updated whenever the snake eats the food, and shows the current points of the player. 

GAME IS OVER in two cases:
1. If by chance the snake collides into itself.
2. If snake touches the wall ie. the boundary of the snake board. 

When game is over, the Score gets reverted back to 0.

