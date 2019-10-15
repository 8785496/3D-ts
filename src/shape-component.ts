import Graphics, { Point, Polygon } from './graphics';
import Transform from './transform';
import Shape from './shape';
import { State, ViewEnum } from './store';
import ZBuffer from './z-buffer';

export default class ShapeComponent {
  private readonly graph: Graphics;
  private readonly transform: Transform;
  private readonly shape: Shape;
  private readonly zBuffer: ZBuffer;

  constructor(canvas: HTMLCanvasElement, shape: Shape) {
    this.graph = new Graphics(canvas);
    this.transform = new Transform(canvas.width, canvas.height);
    this.shape = shape;
    this.zBuffer = new ZBuffer(canvas.width, canvas.height);
  }

  private getScreenPoint(l: number, b: number, state: State) {
    let point = this.shape.getPoint(100, l, b);
    point = this.transform.rotatePoint(point, state.alfa, state.beta);
    if (state.perspective) {
      point = this.transform.perspectivePoint(point);
    }
    point = this.transform.scalePoint(point, state.scale);
    return this.transform.cartesianToScreenPoint(point);
  }

  private getScreenPolygon(
    l: number,
    b: number,
    dL: number,
    dB: number,
    state: State
  ): Polygon {
    let polygon = this.shape.getPolygon(100, l, b, dL, dB);
    polygon = this.transform.rotatePolygon(polygon, state.alfa, state.beta);
    if (state.perspective) {
      polygon = this.transform.perspectivePolygon(polygon);
    }
    polygon = this.transform.scalePolygon(polygon, state.scale);
    return this.transform.cartesianToScreenPolygon(polygon);
  }

  render(state: State) {
    this.graph.clear();

    const dB = state.step;
    const dL = state.step;

    if (state.view === ViewEnum.skeletonHidden) {
      this.zBuffer.clearBuffer();
      for (let b = -90; b < 90; b += dB) {
        for (let l = 0; l < 360; l += dL) {
          const polygon = this.getScreenPolygon(l, b, dL, dB, state);
          this.zBuffer.setPolygon(polygon);
          // this.graph.drawPolygon(polygon);
        }
      }
      this.graph.drawBuffer(this.zBuffer.getBuffer());
      return;
    }

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
