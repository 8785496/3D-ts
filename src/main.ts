import Shape from './shape';
import ShapeComponent from './shape-component';
import './styles/styles.scss';
import store, {
  SET_SCALE,
  SET_ROTATE_X,
  SET_ROTATE_Z,
  SET_PERSPECTIVE,
  SET_VIEW,
  SET_DIFFUSE_C,
  SET_LIGHT_ROTATE_X,
  SET_LIGHT_ROTATE_Z,
  SET_AMBIENT_C,
  SET_SPECULAR_C,
  SET_F
} from './store';

const canvas = document.getElementById('canvas') as HTMLCanvasElement;
const shape = new Shape();
const component = new ShapeComponent(canvas, shape);

store.subscribe(() => {
  const state = store.getState();
  component.render(state);
});

const state = store.getState(); // initial state
component.render(state);

//#region Handlers
listen('input', 'scale', (state.scale * 100).toString(), e => {
  store.dispatch({ type: SET_SCALE, payload: Number(e.target.value) / 100 });
});

listen('input', 'ambientC', (state.ambientC * 100).toString(), e => {
  store.dispatch({ type: SET_AMBIENT_C, payload: Number(e.target.value) / 100 });
});

listen('input', 'diffuseC', (state.diffuseC * 100).toString(), e => {
  store.dispatch({ type: SET_DIFFUSE_C, payload: Number(e.target.value) / 100 });
});

listen('input', 'specularC', (state.specularC * 100).toString(), e => {
  store.dispatch({ type: SET_SPECULAR_C, payload: Number(e.target.value) / 100 });
});

listen('input', 'f', state.f.toString(), e => {
  store.dispatch({ type: SET_F, payload: Number(e.target.value) });
});

listen('input', 'rotateLightX', state.rotateLightX.toString(), e => {
  store.dispatch({ type: SET_LIGHT_ROTATE_X, payload: Number(e.target.value) });
});

listen('input', 'rotateLightZ', state.rotateLightZ.toString(), e => {
  store.dispatch({ type: SET_LIGHT_ROTATE_Z, payload: Number(e.target.value) });
});

listen('input', 'rotateX', state.beta.toString(), e => {
  store.dispatch({ type: SET_ROTATE_X, payload: Number(e.target.value) });
});

listen('input', 'rotateZ', state.alfa.toString(), e => {
  store.dispatch({ type: SET_ROTATE_Z, payload: Number(e.target.value) });
});

listen('change', 'perspective', state.perspective, e => {
  store.dispatch({ type: SET_PERSPECTIVE, payload: e.target.checked });
});

listen('change', 'view', state.view, e => {
  store.dispatch({ type: SET_VIEW, payload: e.target.value });
});

function listen(type: string, id: string, value: any, listener: (e: any) => void) {
  const element = document.getElementById(id) as HTMLInputElement;
  if (!element) {
    return;
  }
  element.value = value;
  element.addEventListener(type, listener);
}
//#endregion
