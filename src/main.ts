import Graphics from './graphics';
import './styles/styles.scss';
import Shape from './shape';
import Transform from './transform';

const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const graph = new Graphics(canvas);

//#region Draw
const transform = new Transform(300, 300);

function draw() {
  const dB = 5;
  const dL = 5;
  let prevPoint = null;

  // meridians
  for (let l = 0; l <= 360; l += dL) {
    for (let b = -90; b <= 90; b += dL) {
      const point = transform.cartesianToScreen(Shape.getPoint(100, l, b));
      if (prevPoint) {
        graph.drawLine(prevPoint, point);
      }
      prevPoint = point;
    }
  }

  // parallels
  prevPoint = null;
  for (let b = -90; b <= 90; b += dB) {
    for (let l = 0; l <= 360; l += dL) {
      const point = transform.cartesianToScreen(Shape.getPoint(100, l, b));
      if (prevPoint) {
        graph.drawLine(prevPoint, point);
      }
      prevPoint = point;
    }
  }
}

draw();
//#endregion

//#region Handlers
document.getElementById('scale').addEventListener('change', e => {
  const input = e.target as HTMLInputElement;
  console.log(input.value);
});
//#endregion
