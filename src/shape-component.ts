import State from './state';
import Graphics, { Point } from './graphics';
import Transform from './transform';
import Shape from './shape';

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
    const cartesianPoint = this.shape.getPoint(100, l, b);
    const rotatedPoint = this.transform.rotate(
      cartesianPoint,
      state.alfa,
      state.beta
    );
    return this.transform.cartesianToScreen(rotatedPoint);
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
