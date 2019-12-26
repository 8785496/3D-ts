import { Polygon, Point } from './graphics';
import Scanner from './scanner';
import { ColorUtil } from './color';


export default class ZBuffer {
  private readonly width: number;
  private readonly height: number;
  private buffer: Array<number>;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.buffer = new Array<number>(width * height * 4);
    this.clearBuffer();
  }

  setPoint(point: Point, colorValue: number) {
    const i = (Math.round(point.y) * this.width + Math.round(point.x)) * 4;
    if (i < 0 || i >= this.buffer.length || this.buffer[i + 3] > point.z) {
      return;
    }
    const color = ColorUtil.intToColor(colorValue);
    this.buffer[i] = color.r;
    this.buffer[i + 1] = color.g;
    this.buffer[i + 2] = color.b;
    this.buffer[i + 3] = point.z;
  }

  setPolygon(polygon: Polygon) {
    const points: Array<Point> = Scanner.scanPolygon(polygon);
    for (const point of points) {
      this.setPoint(point, polygon!.color);
    }
    const contours = Scanner.getLinePoints(polygon);
    for (const point of contours) {
      this.setPoint(point, 0);
    }
  }

  clearBuffer() {
    for (let i = 0; i < this.buffer.length; i += 4) {
      this.buffer[i] = 200;
      this.buffer[i + 1] = 200;
      this.buffer[i + 2] = 200;
      this.buffer[i + 3] = -100000;
    }
  }

  getBuffer() {
    return this.buffer;
  }
}
