import { Point } from './graphics';

export default class Shape {
  // constructor(parameters) {

  // }

  static getPoint(r: number, l: number, b: number): Point {
    const _l = (l / 180) * Math.PI;
    const _b = (b / 180) * Math.PI;
    const x = r * Math.cos(_b) * Math.sin(_l);
    const y = r * Math.cos(_b) * Math.cos(_l);
    const z = r * Math.sin(_b);
    return { x, y, z };
  }
}
