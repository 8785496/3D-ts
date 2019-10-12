import { Point } from './graphics';

export default class Transform {
  private readonly width: number;
  private readonly height: number;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
  }

  cartesianToScreen(point: Point): Point {
    return {
      x: point.x + this.width / 2,
      y: this.height / 2 - point.y
    };
  }

  rotate(point: Point, alfa: number, beta: number): Point {
    const a = (alfa / 180) * Math.PI;
    const b = (beta / 180) * Math.PI;
    const x = point.x * Math.cos(a) - point.y * Math.sin(a);
    const y =
      point.x * Math.sin(a) * Math.cos(b) +
      point.y * Math.cos(a) * Math.cos(b) -
      point.z * Math.sin(b);
    const z =
      point.x * Math.sin(a) * Math.sin(b) +
      point.y * Math.cos(a) * Math.sin(b) +
      point.z * Math.cos(b);
    return { x: x, y: y, z: z };
  }

  perspective(point: Point): Point {
    const zk = -1000;
    const zp = 0;
    const z = point.z;
    return {
      x: (point.x * (zk - zp)) / (zk - z),
      y: (point.y * (zk - zp)) / (zk - z),
      z: z - zp
    };
  }

  scale(point: Point, scale: number) {
    return {
      x: point.x * scale,
      y: point.y * scale,
      z: point.z * scale
    };
  }
}
