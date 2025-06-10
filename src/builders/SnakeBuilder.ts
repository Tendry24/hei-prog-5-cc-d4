import { Point } from "../models/Point";
import { Direction } from "../models/Direction";
import { Snake } from "../models/Snake";
import { DefaultMoveStrategy, MoveStrategy } from "../behaviors/MoveStrategy";

export class SnakeBuilder {
  private initialPosition: Point = new Point(5, 5);
  private initialLength: number = 3;
  private initialDirection: Direction = Direction.RIGHT;
  private moveStrategy: MoveStrategy = new DefaultMoveStrategy();

  setInitialPosition(position: Point): SnakeBuilder {
    this.initialPosition = position;
    return this;
  }

  setInitialLength(length: number): SnakeBuilder {
    this.initialLength = Math.max(1, length);
    return this;
  }

  setInitialDirection(direction: Direction): SnakeBuilder {
    this.initialDirection = direction;
    return this;
  }

  setMoveStrategy(strategy: MoveStrategy): SnakeBuilder {
    this.moveStrategy = strategy;
    return this;
  }

  build(): Snake {
    const body: Point[] = [];
    for (let i = 0; i < this.initialLength; i++) {
      switch (this.initialDirection) {
        case Direction.RIGHT:
          body.push(new Point(this.initialPosition.x - i, this.initialPosition.y));
          break;
        case Direction.LEFT:
          body.push(new Point(this.initialPosition.x + i, this.initialPosition.y));
          break;
        case Direction.DOWN:
          body.push(new Point(this.initialPosition.x, this.initialPosition.y - i));
          break;
        case Direction.UP:
          body.push(new Point(this.initialPosition.x, this.initialPosition.y + i));
          break;
      }
    }
    
    return new Snake(body, this.initialDirection, this.moveStrategy);
  }
} 