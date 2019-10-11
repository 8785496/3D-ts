import Graphics from './graphics';
import './styles/styles.scss';

const graph = new Graphics(document.getElementById(
  'canvas'
) as HTMLCanvasElement);

graph.draw();
