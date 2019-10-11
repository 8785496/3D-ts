export default class Graphics {
  private readonly context: CanvasRenderingContext2D;

  constructor(canvas: HTMLCanvasElement) {
    this.context = canvas.getContext('2d');
  }

  draw() {
    this.context.fillStyle = 'blue';
    this.context.fillRect(10, 10, 100, 100);
    this.context.beginPath();
    this.context.moveTo(110, 110);
    this.context.lineTo(120, 150);
    this.context.stroke();
  }
}
