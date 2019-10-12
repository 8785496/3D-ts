import Shape from './shape';
import ShapeComponent from './shape-component';
import './styles/styles.scss';
import store, {
  SET_SCALE,
  SET_ROTATE_X,
  SET_ROTATE_Z,
  SET_PERSPECTIVE
} from './store';

const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const shape = new Shape();
const component = new ShapeComponent(canvas, shape);

const statePre = document.getElementById('state');
store.subscribe(() => {
  const state = store.getState();
  // console.log(state);
  statePre.innerText = JSON.stringify(state, null, 2);
  component.render(state);
});

//#region Handlers
const state = store.getState(); // initial state
component.render(state);

const scale = document.getElementById('scale') as HTMLInputElement;
scale.value = (state.scale * 100).toString();
scale.addEventListener('input', e => {
  const input = e.target as HTMLInputElement;
  store.dispatch({ type: SET_SCALE, payload: Number(input.value) / 100 });
});

const rotateX = document.getElementById('rotateX') as HTMLInputElement;
rotateX.value = state.beta.toString();
rotateX.addEventListener('input', e => {
  const input = e.target as HTMLInputElement;
  store.dispatch({ type: SET_ROTATE_X, payload: Number(input.value) });
});

const rotateZ = document.getElementById('rotateZ') as HTMLInputElement;
rotateZ.value = state.alfa.toString();
rotateZ.addEventListener('input', e => {
  const input = e.target as HTMLInputElement;
  store.dispatch({ type: SET_ROTATE_Z, payload: Number(input.value) });
});

const perspective = document.getElementById('perspective') as HTMLInputElement;
perspective.checked = state.perspective;
perspective.addEventListener('change', e => {
  const input = e.target as HTMLInputElement;
  store.dispatch({ type: SET_PERSPECTIVE, payload: input.checked });
});
//#endregion
