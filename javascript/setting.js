const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let snakeSize = 10; 
const w = 350;
const h = 350;
const bounds = 34;
let score = 0;
let snake;
let food;