import Shape from './shape';
import State from './state';
import ShapeComponent from './shape-component';
import './styles/styles.scss';

let state: State = {
  step: 15,
  alfa: 0,
  beta: 65
};
const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const shape = new Shape();
const component = new ShapeComponent(canvas, shape, 300, 500);
component.render(state);

//#region Handlers
const scale = document.getElementById('scale');
scale.addEventListener('input', e => {
  const input = e.target as HTMLInputElement;
  console.log(input.value);
});

const rotateX = document.getElementById('rotateX') as HTMLInputElement;
rotateX.value = state.beta.toString();
rotateX.addEventListener('input', e => {
  const input = e.target as HTMLInputElement;
  state = {
    ...state,
    beta: Number(input.value)
  };
  component.render(state);
});

const rotateZ = document.getElementById('rotateZ') as HTMLInputElement;
rotateZ.value = state.alfa.toString();
rotateZ.addEventListener('input', e => {
  const input = e.target as HTMLInputElement;
  state = {
    ...state,
    alfa: Number(input.value)
  };
  component.render(state);
});
//#endregion
