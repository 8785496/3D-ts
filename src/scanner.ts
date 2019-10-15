import { Polygon, Point } from './graphics';

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
      const element = vertices[i];
    }
    return [];
  }

  private static roundXY(point: Point): Point {
    return {
      x: Math.round(point.x),
      y: Math.round(point.y),
      z: point.z
    };
  }
}
