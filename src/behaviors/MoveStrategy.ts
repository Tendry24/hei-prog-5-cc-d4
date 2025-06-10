import { Point } from "../models/Point";
import { Direction } from "../models/Direction";
import { Snake } from "../models/Snake";

export interface MoveStrategy {
  computeNextPosition(snake: Snake, direction: Direction): Point;
}

export class DefaultMoveStrategy implements MoveStrategy {
  computeNextPosition(snake: Snake, direction: Direction): Point {
    const head = snake.getHead().clone();
    
    switch (direction) {
      case Direction.UP:
        head.y -= 1;
        break;
      case Direction.DOWN:
        head.y += 1;
        break;
      case Direction.LEFT:
        head.x -= 1;
        break;
      case Direction.RIGHT:
        head.x += 1;
        break;
    }
    
    return head;
  }
} 