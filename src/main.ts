import Shape from './shape';
import ShapeComponent from './shape-component';
import './styles/styles.scss';
import store, {
  SET_SCALE,
  SET_ROTATE_X,
  SET_ROTATE_Z,
  SET_PERSPECTIVE,
  SET_VIEW,
  SET_DIFFUSE_C
} from './store';

const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const shape = new Shape();
const component = new ShapeComponent(canvas, shape);

const statePre = document.getElementById('state');
store.subscribe(() => {
  const state = store.getState();
  statePre.innerText = JSON.stringify(state, null, 2);
  component.render(state);
});

const state = store.getState(); // initial state
component.render(state);

//#region Handlers
const scale = document.getElementById('scale') as HTMLInputElement;
scale.value = (state.scale * 100).toString();
scale.addEventListener('input', () => {
  store.dispatch({ type: SET_SCALE, payload: Number(scale.value) / 100 });
});

const rotateX = document.getElementById('rotateX') as HTMLInputElement;
rotateX.value = state.beta.toString();
rotateX.addEventListener('input', () => {
  store.dispatch({ type: SET_ROTATE_X, payload: Number(rotateX.value) });
});

const rotateZ = document.getElementById('rotateZ') as HTMLInputElement;
rotateZ.value = state.alfa.toString();
rotateZ.addEventListener('input', e => {
  store.dispatch({ type: SET_ROTATE_Z, payload: Number(rotateZ.value) });
});

const perspective = document.getElementById('perspective') as HTMLInputElement;
perspective.checked = state.perspective;
perspective.addEventListener('change', () => {
  store.dispatch({ type: SET_PERSPECTIVE, payload: perspective.checked });
});

const viewInput = document.getElementById('view') as HTMLInputElement;
viewInput.value = state.view;
viewInput.addEventListener('change', () => {
  store.dispatch({ type: SET_VIEW, payload: viewInput.value });
});

const diffuseC = document.getElementById('diffuseC') as HTMLInputElement;
diffuseC.value = (state.diffuseC * 100).toString();
diffuseC.addEventListener('input', () => {
  store.dispatch({ type: SET_DIFFUSE_C, payload: diffuseC.value });
});
//#endregion
