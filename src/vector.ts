import { Polygon, Point } from './graphics';

export default class VectorUtil {
  static getNormal(polygon: Polygon): Point {
    const { p1, p2, p3, p4 } = polygon;
    const v1 = { x: p2.x - p1.x, y: p2.y - p1.y, z: p2.z - p1.z };
    const v2 = { x: p4.x - p1.x, y: p4.y - p1.y, z: p4.z - p1.z };
    const v = VectorUtil.cross(v1, v2);
    return VectorUtil.normalize(v);
  }

  static normalize(vector: Point): Point {
    const { x, y, z } = vector;
    const length = VectorUtil.getLength(vector);
    return {
      x: x / length,
      y: y / length,
      z: z / length
    }
  }

  static cross(v1: Point, v2: Point): Point {
    return {
      x: v1.y * v2.z - v1.z * v2.y,
      y: v1.z * v2.x - v1.x * v2.z,
      z: v1.x * v2.y - v1.y * v2.x
    }
  }

  static cosTheta(v1: Point, v2: Point) {
    const lengthV1 = VectorUtil.getLength(v1);
    const lengthV2 = VectorUtil.getLength(v2);
    return (v1.x * v2.x + v1.y * v2.y + v1.z * v2.z) / (lengthV1 * lengthV2);
  }

  static getLength(vector: Point): number {
    const { x, y, z } = vector;
    return Math.sqrt(x * x + y * y + z * z);
  }
}