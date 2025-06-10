import { Point } from "./Point";
import { Direction } from "./Direction";
import { MoveStrategy } from "../behaviors/MoveStrategy";

export class Snake {
  private body: Point[] = [];
  private direction: Direction;
  private moveStrategy: MoveStrategy;
  private growing: boolean = false;

  constructor(initialBody: Point[], direction: Direction, moveStrategy: MoveStrategy) {
    this.body = initialBody;
    this.direction = direction;
    this.moveStrategy = moveStrategy;
  }

  getHead(): Point {
    return this.body[0];
  }

  getBody(): Point[] {
    return [...this.body];
  }

  getDirection(): Direction {
    return this.direction;
  }

  setDirection(direction: Direction): void {
    if (
      (this.direction === Direction.UP && direction === Direction.DOWN) ||
      (this.direction === Direction.DOWN && direction === Direction.UP) ||
      (this.direction === Direction.LEFT && direction === Direction.RIGHT) ||
      (this.direction === Direction.RIGHT && direction === Direction.LEFT)
    ) {
      return;
    }
    this.direction = direction;
  }

  move(): void {
    const newHead = this.moveStrategy.computeNextPosition(this, this.direction);
    this.body.unshift(newHead);
    
    if (!this.growing) {
      this.body.pop();
    } else {
      this.growing = false;
    }
  }

  grow(): void {
    this.growing = true;
  }

  collidesWithSelf(): boolean {
    const head = this.getHead();
    return this.body.slice(1).some(segment => segment.equals(head));
  }

  collidesWithPoint(point: Point): boolean {
    return this.body.some(segment => segment.equals(point));
  }
} 