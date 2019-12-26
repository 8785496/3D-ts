import Flatten from '@flatten-js/core';
import { Point, Polygon } from './graphics';


export default class Scanner {
  static scanPolygon(polygon: Polygon): Array<Point> {
    const p = new Flatten.Polygon();
    p.addFace([
      new Flatten.Point(polygon.p1.x, polygon.p1.y),
      new Flatten.Point(polygon.p2.x, polygon.p2.y),
      new Flatten.Point(polygon.p3.x, polygon.p3.y),
      new Flatten.Point(polygon.p4.x, polygon.p4.y),
    ])
    let points: Array<Point> = [];
    const [maxY, minY] = Scanner.getMaxMin(polygon);
    for (let y = minY; y <= maxY; y++) {
      const line = new Flatten.Line(new Flatten.Point(0, y), new Flatten.Point(1000, y));
      const cross = Scanner.fillPoints(p.intersect(line), y);
      points = points.concat(cross);
    }
    return points.map(v => ({ x: v.x, y: v.y, z: polygon.p1.z }));
  }

  static fillPoints(intersect: Array<Flatten.Point>, y: number): Array<Point> {
    if (!intersect || !intersect.length) {
      return [];
    }
    if (intersect.length === 1) {
      return intersect.map(i => ({ x: i.x, y: i.y }));
    }
    let max: number = Math.round(intersect[0].x);
    let min: number = Math.round(intersect[0].x);
    for (const p of intersect) {
      const x = Math.round(p.x);
      max = x > max ? x : max;
      min = x < min ? x : min;
    }
    const points: Array<Point> = [];
    for (let i = min; i <= max; i++) {
      points.push({ x: i, y: y });
    }
    return points;
  }

  static getLinePoints(polygon: Polygon): Array<Point> {
    const points: Array<Point> = [];
    const { p1, p2, p3, p4 } = polygon;
    const z = p1.z;
    points.push(...Scanner.drawLine(p1, p2));
    points.push(...Scanner.drawLine(p2, p3));
    points.push(...Scanner.drawLine(p3, p4));
    points.push(...Scanner.drawLine(p4, p1));
    return points.map(p => ({ x: p.x, y: p.y, z: z }));
  }

  static getMaxMin(polygon: Polygon): Array<any> {
    const vertex = [
      polygon.p1,
      polygon.p2,
      polygon.p3,
      polygon.p4,
    ];
    let max = Math.round(vertex[0].y);
    let min = Math.round(vertex[0].y);
    for (let i = 1; i < 4; i++) {
      const y = Math.round(vertex[i].y);
      max = y > max ? y : max;
      min = y < min ? y : min;
    }
    return [max, min];
  }

  static drawLineHigh(p0: Point, p1: Point): Array<Point> {
    const x0 = p0.x, y0 = p0.y, x1 = p1.x, y1 = p1.y;
    let dx = x1 - x0;
    let dy = y1 - y0;
    let xi = 1
    if (dx < 0) {
      xi = -1
      dx = -dx
    }
    let d = 2 * dx - dy;
    let x = x0
    const points: Array<Point> = [];
    for (let y = y0; y <= y1; y++) {
      points.push({ x, y });
      if (d > 0) {
        x = x + xi
        d = d - 2 * dy
      }
      d = d + 2 * dx
    }
    return points;
  }

  static drawLineLow(p0: Point, p1: Point): Array<Point> {
    const x0 = p0.x, y0 = p0.y, x1 = p1.x, y1 = p1.y;
    let dx = x1 - x0;
    let dy = y1 - y0;
    let yi = 1
    if (dy < 0) {
      yi = -1
      dy = -dy
    }
    let d = 2 * dy - dx;
    let y = y0
    const points: Array<Point> = [];
    for (let x = x0; x <= x1; x++) {
      points.push({ x, y });
      if (d > 0) {
        y = y + yi
        d = d - 2 * dx
      }
      d = d + 2 * dy
    }
    return points;
  }

  static drawLine(p0: Point, p1: Point): Array<Point> {
    const x0 = p0.x, y0 = p0.y, x1 = p1.x, y1 = p1.y;
    if (Math.abs(y1 - y0) < Math.abs(x1 - x0)) {
      return x0 > x1 ? this.drawLineLow(p1, p0) : this.drawLineLow(p0, p1);
    } else {
      return y0 > y1 ? this.drawLineHigh(p1, p0) : this.drawLineHigh(p0, p1);
    }
  }
}