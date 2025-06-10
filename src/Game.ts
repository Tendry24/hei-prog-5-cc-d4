import { Point } from "./models/Point";
import { Direction } from "./models/Direction";
import { Snake } from "./models/Snake";
import { SnakeBuilder } from "./builders/SnakeBuilder";
import { FoodFactory } from "./factories/FoodFactory";
import { DefaultMoveStrategy } from "./behaviors/MoveStrategy";
import { GameState, MenuState, RunningState, GameOverState } from "./core/GameState";
import * as term from 'terminal-kit';

export class Game {
  private static readonly GRID_WIDTH = 10;
  private static readonly GRID_HEIGHT = 10;
  
  private snake: Snake;
  private food: Point | null = null;
  private foodFactory: FoodFactory;
  private score: number = 0;
  private currentState: GameState;
  private menuState: GameState;
  private runningState: GameState;
  private gameOverState: GameState;
  
  constructor() {
    this.foodFactory = new FoodFactory(Game.GRID_WIDTH, Game.GRID_HEIGHT);
    
    this.snake = new SnakeBuilder()
      .setInitialPosition(new Point(5, 5))
      .setInitialLength(3)
      .setInitialDirection(Direction.RIGHT)
      .setMoveStrategy(new DefaultMoveStrategy())
      .build();
      
    this.menuState = new MenuState();
    this.runningState = new RunningState();
    this.gameOverState = new GameOverState();
    this.currentState = this.menuState;
    
    this.food = this.foodFactory.createFood(this.snake);
  }
  
  update(): void {
    this.currentState.update(this);
  }
  
  handleInput(key: string): void {
    this.currentState.handleInput(this, key);
  }
  
  render(terminal: term.Terminal): void {
    this.currentState.render(this, terminal);
  }
  
  startGame(): void {
    this.resetGame();
    this.currentState = this.runningState;
  }
  
  pauseGame(): void {
    this.currentState = this.menuState;
  }
  
  gameOver(): void {
    this.currentState = this.gameOverState;
  }
  
  resetGame(): void {
    this.snake = new SnakeBuilder()
      .setInitialPosition(new Point(5, 5))
      .setInitialLength(3)
      .setInitialDirection(Direction.RIGHT)
      .setMoveStrategy(new DefaultMoveStrategy())
      .build();
      
    this.food = this.foodFactory.createFood(this.snake);
    this.score = 0;
    this.currentState = this.runningState;
  }
  
  updateGame(): void {
    this.snake.move();
    
    const head = this.snake.getHead();
    if (
      head.x < 0 || 
      head.x >= Game.GRID_WIDTH || 
      head.y < 0 || 
      head.y >= Game.GRID_HEIGHT ||
      this.snake.collidesWithSelf()
    ) {
      this.gameOver();
      return;
    }
    
    if (this.food && head.equals(this.food)) {
      this.snake.grow();
      this.food = this.foodFactory.createFood(this.snake);
      this.score++;
    }
  }
  
  renderGame(terminal: term.Terminal): void {
    terminal.clear();
    
    const grid: string[][] = Array(Game.GRID_HEIGHT)
      .fill(null)
      .map(() => Array(Game.GRID_WIDTH).fill("."));
    
    if (this.food) {
      grid[this.food.y][this.food.x] = "@";
    }
    
    const body = this.snake.getBody();
    body.forEach((segment, index) => {
      if (segment.y >= 0 && segment.y < Game.GRID_HEIGHT && 
          segment.x >= 0 && segment.x < Game.GRID_WIDTH) {
        grid[segment.y][segment.x] = index === 0 ? "#" : "*";
      }
    });
    
    terminal.yellow(`Score: ${this.score}\n`);
    
    grid.forEach(row => {
      terminal(row.join(' ') + '\n');
    });
    
    terminal.gray('\nZ: Up, S: Down, Q: Left, D: Right\n');
    terminal.gray('P: Pause, ENTER: Start/Reset\n');
  }
  
  changeDirection(dirIndex: number): void {
    switch (dirIndex) {
      case 0:
        this.snake.setDirection(Direction.UP);
        break;
      case 1:
        this.snake.setDirection(Direction.DOWN);
        break;
      case 2:
        this.snake.setDirection(Direction.LEFT);
        break;
      case 3:
        this.snake.setDirection(Direction.RIGHT);
        break;
    }
  }
  
  getScore(): number {
    return this.score;
  }
} 