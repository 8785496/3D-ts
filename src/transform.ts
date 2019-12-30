import { Point, Polygon, Vector } from './graphics';
import VectorUtil from './vector';
import { ColorUtil } from './color';

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
    const zk = 1000;
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
      ...polygon,
      p1: this.perspectivePoint(polygon.p1),
      p2: this.perspectivePoint(polygon.p2),
      p3: this.perspectivePoint(polygon.p3),
      p4: this.perspectivePoint(polygon.p4)
    };
  }

  scalePolygon(polygon: Polygon, scale: number): Polygon {
    return {
      ...polygon,
      p1: this.scalePoint(polygon.p1, scale),
      p2: this.scalePoint(polygon.p2, scale),
      p3: this.scalePoint(polygon.p3, scale),
      p4: this.scalePoint(polygon.p4, scale)
    };
  }

  rotatePolygon(polygon: Polygon, alfa: number, beta: number): Polygon {
    return {
      ...polygon,
      p1: this.rotatePoint(polygon.p1, alfa, beta),
      p2: this.rotatePoint(polygon.p2, alfa, beta),
      p3: this.rotatePoint(polygon.p3, alfa, beta),
      p4: this.rotatePoint(polygon.p4, alfa, beta)
    };
  }

  fillNormalAndColor(polygon: Polygon, ambientC: number, diffuseC: number, specularC: number, f: number, alfa: number, beta: number) {
    const normal = VectorUtil.getNormal(polygon);
    const s = VectorUtil.normalize(this.rotatePoint({ x: 0, y: 1000, z: 0 }, alfa, beta));
    let lambert = VectorUtil.cosTheta(normal, s);
    lambert = lambert < 0 ? 0 : lambert;

    const v: Vector = { x: 0, y: 0, z: 1 };
    const h = VectorUtil.normalize(VectorUtil.addition(v, s));
    let phong = VectorUtil.cosTheta(h, normal);
    phong = phong < 0 ? 0 : phong;

    const ir = 221, ig = 221, ib = 221;
    const r = ir * ambientC + ir * diffuseC * lambert + ir * specularC * Math.pow(phong, f);
    const g = ig * ambientC + ig * diffuseC * lambert + ig * specularC * Math.pow(phong, f);
    const b = ib * ambientC + ib * diffuseC * lambert + ib * specularC * Math.pow(phong, f);

    return {
      ...polygon,
      normal: VectorUtil.getNormal(polygon),
      color: ColorUtil.colorToInt({
        r: r > 255 ? 255 : r,
        g: g > 255 ? 255 : g,
        b: b > 255 ? 255 : b
      })
    }
  }

  cartesianToScreenPolygon(polygon: Polygon): Polygon {
    return {
      ...polygon,
      p1: this.cartesianToScreenPoint(polygon.p1),
      p2: this.cartesianToScreenPoint(polygon.p2),
      p3: this.cartesianToScreenPoint(polygon.p3),
      p4: this.cartesianToScreenPoint(polygon.p4)
    };
  }
}
