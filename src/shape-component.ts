import Graphics, { Point } from './graphics';
import Transform from './transform';
import Shape from './shape';
import { State } from './store';

export default class ShapeComponent {
  private readonly graph: Graphics;
  private readonly transform: Transform;
  private readonly shape: Shape;

  constructor(canvas: HTMLCanvasElement, shape: Shape) {
    this.graph = new Graphics(canvas);
    this.transform = new Transform(canvas.width, canvas.height);
    this.shape = shape;
  }

  private getScreenPoint(l: number, b: number, state: State) {
    let point = this.shape.getPoint(100, l, b);
    point = this.transform.rotate(point, state.alfa, state.beta);
    if (state.perspective) {
      point = this.transform.perspective(point);
    }
    point = this.transform.scale(point, state.scale);
    return this.transform.cartesianToScreen(point);
  }

  render(state: State) {
    this.graph.clear();

    const dB = state.step;
    const dL = state.step;
    let prevPoint: Point;

    // meridians
    for (let l = 0; l < 360; l += dL) {
      prevPoint = null;
      for (let b = -90; b <= 90; b += dL) {
        const screenPoint = this.getScreenPoint(l, b, state);
        if (prevPoint) {
          this.graph.drawLine(prevPoint, screenPoint);
        }
        prevPoint = screenPoint;
      }
    }

    // parallels
    for (let b = -90; b <= 90; b += dB) {
      prevPoint = null;
      for (let l = 0; l <= 360; l += dL) {
        const screenPoint = this.getScreenPoint(l, b, state);
        if (prevPoint) {
          this.graph.drawLine(prevPoint, screenPoint);
        }
        prevPoint = screenPoint;
      }
    }
  }
}
