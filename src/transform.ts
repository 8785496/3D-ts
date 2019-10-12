import { Point } from './graphics';

export default class Transform {
  private readonly width: number;
  private readonly height: number;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
  }

  cartesianToScreen(point: Point) {
    return {
      x: point.x + this.width / 2,
      y: this.height / 2 - point.y
    };
  }
}
