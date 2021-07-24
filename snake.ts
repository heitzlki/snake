import { dropFirst, mod, dropLast, rnd, merge } from './base';

export interface IPoint {
  x: number;
  y: number;
}

export interface ITable {
  cols: number;
  rows: number;
}

export interface IState extends ITable {
  moves: Array<IPoint>;
  snake: Array<IPoint> | [];
  apple: IPoint;
}

export default class Snake {
  // Constants
  public NORTH = { x: 0, y: -1 };
  public SOUTH = { x: 0, y: 1 };
  public EAST = { x: 1, y: 0 };
  public WEST = { x: -1, y: 0 };

  constructor() {}

  // Point operations
  private pointEq = (p1: IPoint) => (p2: IPoint) =>
    p1.x == p2.x && p1.y == p2.y;

  // Booleans
  private willEat = (state: IState) =>
    this.pointEq(this.nextHead(state))(state.apple);

  private willCrash = (state: IState) =>
    state.snake.find(this.pointEq(this.nextHead(state)));

  private validMove = (move: IPoint) => (state: IState) =>
    state.moves[0].x + move.x != 0 || state.moves[0].y + move.y != 0;

  // Next values based on state
  nextMoves = (state: IState) =>
    state.moves.length > 1 ? dropFirst(state.moves) : state.moves;

  nextApple = (state: IState) =>
    this.willEat(state) ? this.rndPos(state) : state.apple;

  nextHead = (state: IState) =>
    state.snake.length == 0
      ? { x: 2, y: 2 }
      : {
          x: mod(state.cols)(state.snake[0].x + state.moves[0].x),
          y: mod(state.rows)(state.snake[0].y + state.moves[0].y),
        };

  nextSnake = (state: IState) =>
    this.willCrash(state)
      ? []
      : this.willEat(state)
      ? [this.nextHead(state)].concat(state.snake)
      : [this.nextHead(state)].concat(dropLast(state.snake));

  // Randomness
  rndPos = (table: ITable) => ({
    x: rnd(0)(table.cols - 1),
    y: rnd(0)(table.rows - 1),
  });

  // Initial state
  initialState = () => ({
    cols: 20,
    rows: 20,
    moves: [this.EAST],
    snake: [],
    apple: { x: 16, y: 2 },
  });

  next = (state: IState) => ({
    rows: state['rows'],
    cols: state['cols'],
    moves: this.nextMoves(state),
    snake: this.nextSnake(state),
    apple: this.nextApple(state),
  });

  enqueue = (state: IState, move: IPoint) =>
    this.validMove(move)(state)
      ? merge(state)({ moves: state.moves.concat([move]) })
      : state;
}
