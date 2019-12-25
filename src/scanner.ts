import { Polygon, Point } from './graphics';

class Line {
  k: number;
  b: number;
  yMin: number;
  yMax: number;

  constructor(x1: number, y1: number, x2: number, y2: number) {

  }
}

export default class Scanner {
  static scanPolygon(polygon: Polygon): Array<Point> {
    // определим Y max и Y min
    const vertices = [
      this.roundXY(polygon.p1),
      this.roundXY(polygon.p2),
      this.roundXY(polygon.p3),
      this.roundXY(polygon.p4)
    ];

    let maxY = vertices[0].y;
    let minY = vertices[0].y;
    for (let i = 0; i < vertices.length; i++) {
      const vertice = vertices[i];
      const y = vertice.y;
      if (y > maxY) { maxY = y; }
      if (y < minY) { minY = y; }
    }

    const result: Array<Point> = [];
    for (let j = minY; j <= maxY; j++) {


    }

    return result;
  }

  private static roundXY(point: Point): Point {
    return {
      x: Math.round(point.x),
      y: Math.round(point.y),
      z: point.z
    };
  }
}
