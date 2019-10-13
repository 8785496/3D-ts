import { Point, Polygon } from './graphics';

export default class Transform {
  private readonly width: number;
  private readonly height: number;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
  }

  cartesianToScreenPoint(point: Point): Point {
    return {
      x: point.x + this.width / 2,
      y: this.height / 2 - point.y,
      z: point.z
    };
  }

  rotatePoint(point: Point, alfa: number, beta: number): Point {
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

  perspectivePoint(point: Point): Point {
    const zk = -1000;
    const zp = 0;
    const z = point.z;
    return {
      x: (point.x * (zk - zp)) / (zk - z),
      y: (point.y * (zk - zp)) / (zk - z),
      z: z - zp
    };
  }

  scalePoint(point: Point, scale: number) {
    return {
      x: point.x * scale,
      y: point.y * scale,
      z: point.z * scale
    };
  }

  perspectivePolygon(polygon: Polygon): Polygon {
    return {
      p1: this.perspectivePoint(polygon.p1),
      p2: this.perspectivePoint(polygon.p2),
      p3: this.perspectivePoint(polygon.p3),
      p4: this.perspectivePoint(polygon.p4)
    };
  }

  scalePolygon(polygon: Polygon, scale: number): Polygon {
    return {
      p1: this.scalePoint(polygon.p1, scale),
      p2: this.scalePoint(polygon.p2, scale),
      p3: this.scalePoint(polygon.p3, scale),
      p4: this.scalePoint(polygon.p4, scale)
    };
  }

  rotatePolygon(polygon: Polygon, alfa: number, beta: number): Polygon {
    return {
      p1: this.rotatePoint(polygon.p1, alfa, beta),
      p2: this.rotatePoint(polygon.p2, alfa, beta),
      p3: this.rotatePoint(polygon.p3, alfa, beta),
      p4: this.rotatePoint(polygon.p4, alfa, beta)
    };
  }

  cartesianToScreenPolygon(polygon: Polygon): Polygon {
    return {
      p1: this.cartesianToScreenPoint(polygon.p1),
      p2: this.cartesianToScreenPoint(polygon.p2),
      p3: this.cartesianToScreenPoint(polygon.p3),
      p4: this.cartesianToScreenPoint(polygon.p4)
    };
  }
}
