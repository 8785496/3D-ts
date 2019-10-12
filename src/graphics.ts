export interface Point {
  x: number;
  y: number;
  z?: number;
}

export default class Graphics {
  private readonly context: CanvasRenderingContext2D;
  private readonly width: number;
  private readonly height: number;

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
    this.context.closePath();
    this.context.stroke();
  }
}
