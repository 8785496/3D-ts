import { Point } from './graphics';

export default class Shape {
  getSpherePoint(r: number, l: number, b: number): Point {
    const _l = (l / 180) * Math.PI;
    const _b = (b / 180) * Math.PI;
    return {
      x: r * Math.cos(_b) * Math.sin(_l),
      y: r * Math.cos(_b) * Math.cos(_l),
      z: r * Math.sin(_b)
    };
  }

  getPoint(r: number, l: number, b: number): Point {
    const p = this.getSpherePoint(r, l, b);
    const x = p.x + (p.z * p.z * p.z) / (r * r);
    const y = p.y;
    const z = 2 * p.z;
    return { x, y, z };
  }
}
