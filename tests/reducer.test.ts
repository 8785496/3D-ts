import {
  State,
  ViewEnum,
  reducer,
  SET_SCALE,
  SET_ROTATE_X,
  SET_ROTATE_Z,
  SET_PERSPECTIVE,
  SET_VIEW
} from '../src/store';

const initialState: State = {
  alfa: 0,
  beta: 0,
  perspective: false,
  scale: 1,
  step: 10,
  view: ViewEnum.skeleton,
  ambientC: 0.5,
  diffuseC: 0.5,
  specularC: 0.5,
  f: 1,
  rotateLightX: 0,
  rotateLightZ: 0
};

it('set scale', () => {
  const state = reducer(initialState, { type: SET_SCALE, payload: 1.5 });
  expect(state).toEqual({ ...initialState, scale: 1.5 });
});

it('set rotate x', () => {
  const state = reducer(initialState, { type: SET_ROTATE_X, payload: 20 });
  expect(state).toEqual({ ...initialState, beta: 20 });
});

it('set rotate z', () => {
  const state = reducer(initialState, { type: SET_ROTATE_Z, payload: 80 });
  expect(state).toEqual({ ...initialState, alfa: 80 });
});

it('set perspective', () => {
  const state = reducer(initialState, {
    type: SET_PERSPECTIVE,
    payload: true
  });
  expect(state).toEqual({ ...initialState, perspective: true });
});

it('set view', () => {
  const state = reducer(initialState, {
    type: SET_VIEW,
    payload: ViewEnum.skeletonHidden
  });
  expect(state).toEqual({ ...initialState, view: ViewEnum.skeletonHidden });
});
