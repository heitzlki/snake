import readline from 'readline';
import * as process from 'process';
import Snake, { IPoint, IState, ITable } from './snake';
import { rep, adjust, pipe, map, k, id } from './base';

let snake = new Snake();

// Mutable state
let State: IState = snake.initialState();

// Matrix operations
const Matrix = {
  make: (table: ITable) => rep(rep('.')(table.cols))(table.rows),
  set: (val: string) => (pos: IPoint) => adjust(pos.y)(adjust(pos.x)(k(val))),
  addSnake: (state: IState) => pipe(...map(Matrix.set('#'))(state.snake)),
  addApple: (state: IState) => Matrix.set('o')(state.apple),
  addCrash: (state: IState) =>
    state.snake.length == 0 ? map(map(k('#'))) : id,
  toString: (xsxs: any) => xsxs.map((xs: any) => xs.join(' ')).join('\r\n'),
  fromState: (state: IState) =>
    pipe(
      Matrix.make,
      Matrix.addSnake(state),
      Matrix.addApple(state),
      Matrix.addCrash(state)
    )(state),
};

// Key events
readline.emitKeypressEvents(process.stdin);
process.stdin.setRawMode(true);
process.stdin.on('keypress', (_: any, key) => {
  if (key.ctrl && key.name === 'c') process.exit();
  switch (key.name.toUpperCase()) {
    case 'W':
    case 'K':
    case 'UP':
      State = snake.enqueue(State, snake.NORTH);
      break;
    case 'A':
    case 'H':
    case 'LEFT':
      State = snake.enqueue(State, snake.WEST);
      break;
    case 'S':
    case 'J':
    case 'DOWN':
      State = snake.enqueue(State, snake.SOUTH);
      break;
    case 'D':
    case 'L':
    case 'RIGHT':
      State = snake.enqueue(State, snake.EAST);
      break;
  }
});

// Game loop
const show = () =>
  console.log('\x1Bc' + Matrix.toString(Matrix.fromState(State)));
const step = () => (State = snake.next(State));

// Main
setInterval(() => {
  step();
  show();
}, 80);
