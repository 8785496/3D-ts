export interface Point {
  x: number;
  y: number;
  z?: number;
}

export interface Polygon {
  p1: Point;
  p2: Point;
  p3: Point;
  p4: Point;
}

export default class Graphics {
  private readonly context: CanvasRenderingContext2D;
  private readonly width: number;
  private readonly height: number;
  private imageData: ImageData;

  constructor(canvas: HTMLCanvasElement) {
    this.context = canvas.getContext('2d');
    this.width = canvas.width;
    this.height = canvas.height;
  }

  clear() {
    this.context.clearRect(0, 0, this.width, this.height);
  }

  drawLine(p1: Point, p2: Point) {
    this.context.strokeStyle = 'green';
    this.context.beginPath();
    this.context.moveTo(p1.x, p1.y);
    this.context.lineTo(p2.x, p2.y);
    this.context.stroke();
  }

  drawPolygon(polygon: Polygon) {
    const { p1, p2, p3, p4 } = polygon;
    this.context.strokeStyle = 'blue';
    this.context.beginPath();
    this.context.moveTo(p1.x, p1.y);
    this.context.lineTo(p2.x, p2.y);
    this.context.lineTo(p3.x, p3.y);
    this.context.lineTo(p4.x, p4.y);
    this.context.closePath();
    this.context.stroke();
  }

  drawBuffer(buffer: Array<number>) {
    // if (!this.imageData) {
    //   this.imageData = this.context.createImageData(this.width, this.height);
    // }
    // const imageData = this.imageData;
    const imageData = this.context.createImageData(this.width, this.height);

    for (let i = 0; i < buffer.length; i += 4) {
      imageData.data[i] = buffer[i];
      imageData.data[i + 1] = buffer[i + 1];
      imageData.data[i + 2] = buffer[i + 2];
      imageData.data[i + 3] = 255;
    }
    this.context.putImageData(imageData, 0, 0);
  }
}
