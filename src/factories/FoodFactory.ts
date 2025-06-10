import { Point } from "../models/Point";
import { Snake } from "../models/Snake";

export class FoodFactory {
  private gridWidth: number;
  private gridHeight: number;

  constructor(gridWidth: number, gridHeight: number) {
    this.gridWidth = gridWidth;
    this.gridHeight = gridHeight;
  }

  createFood(snake: Snake): Point {
    let food: Point;
    
    do {
      const x = Math.floor(Math.random() * this.gridWidth);
      const y = Math.floor(Math.random() * this.gridHeight);
      food = new Point(x, y);
    } while (snake.collidesWithPoint(food));
    
    return food;
  }
} 