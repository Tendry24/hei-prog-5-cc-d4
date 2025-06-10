export class Point {
  constructor(public x: number, public y: number) {}

  equals(other: Point): boolean {
    return this.x === other.x && this.y === other.y;
  }

  clone(): Point {
    return new Point(this.x, this.y);
  }
} 