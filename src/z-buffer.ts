import { Polygon, Point } from './graphics';

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

  setPoint(point: Point) {
    const i = (Math.round(point.y) * this.width + Math.round(point.x)) * 4;
    this.buffer[i] = 255;
    this.buffer[i + 1] = 0;
    this.buffer[i + 2] = 0;
    this.buffer[i + 3] = point.z;
  }

  setPolygon(polygon: Polygon) {
    const { p1, p2, p3, p4 } = polygon;
    this.setPoint(p1);
    this.setPoint(p2);
    this.setPoint(p3);
    this.setPoint(p4);
  }

  clearBuffer() {
    for (let i = 0; i < this.buffer.length; i += 4) {
      this.buffer[i] = 200;
      this.buffer[i + 1] = 200;
      this.buffer[i + 2] = 200;
      this.buffer[i + 3] = 0;
    }
  }

  getBuffer() {
    return this.buffer;
  }
}
