import './style.css';

import Snake, { IState } from '../../snake';

const canvas = <HTMLCanvasElement>document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const snake = new Snake();

// Mutable state
let state: IState = snake.initialState();

const scale = 30;

// Canvas size
canvas.width = state.cols * scale;
canvas.height = state.rows * scale;

// Position helpers
const x = (c: number) => Math.round((c * canvas.width) / state.cols);
const y = (r: number) => Math.round((r * canvas.height) / state.rows);

// Key events
window.addEventListener('keydown', ({ key }) => {
  switch (key) {
    case 'w':
    case 'h':
    case 'ArrowUp':
      state = snake.enqueue(state, snake.NORTH);
      break;
    case 'a':
    case 'j':
    case 'ArrowLeft':
      state = snake.enqueue(state, snake.WEST);
      break;
    case 's':
    case 'k':
    case 'ArrowDown':
      state = snake.enqueue(state, snake.SOUTH);
      break;
    case 'd':
    case 'l':
    case 'ArrowRight':
      state = snake.enqueue(state, snake.EAST);
      break;
  }
});

// Game loop draw
const draw = () => {
  if (ctx) {
    // clear
    ctx.fillStyle = '#1a1a1aff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // draw snake
    ctx.fillStyle = '#00ffccff';
    state.snake.map((p) => ctx.fillRect(x(p.x), y(p.y), x(1), y(1)));

    // draw apples
    ctx.fillStyle = '#ff0066ff';
    ctx.fillRect(x(state.apple.x), y(state.apple.y), x(1), y(1));

    // add crash
    if (state.snake.length == 0) {
      ctx.fillStyle = '#ff0000ff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
  }
};

const step = () => (state = snake.next(state));

// Main
setInterval(() => {
  step();
  draw();
}, 100);
