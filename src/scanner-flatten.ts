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
    for (let i = 1; i <= 3; i++) {
      const line = new Flatten.Line(new Flatten.Point(0, i), new Flatten.Point(4, i));
      const cross = Scanner.fillPoints(p.intersect(line), i);
      points = points.concat(cross);
    }

    return points.map(v => ({ x: v.x, y: v.y }));
  }

  private static fillPoints(intersect: Array<Flatten.Point>, y: number): Array<Point> {
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
}