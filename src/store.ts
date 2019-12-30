import { createStore } from 'redux';

export enum ViewEnum {
  skeleton = 'skeleton',
  skeletonHidden = 'skeletonHidden',
  grayScale = 'grayScale'
}

export interface State {
  step: number;
  alfa: number;
  beta: number;
  scale: number;
  perspective: boolean;
  view: ViewEnum;
  ambientC: number; // ambient reflection coefficient
  diffuseC: number; // diffuse reflection coefficient
  specularC: number; // specular reflection coefficient
  f: number;
  rotateLightX: number;
  rotateLightZ: number;
}

export interface Action {
  type: string;
  payload?: any;
}

export const SET_SCALE = 'SET_SCALE';
export const SET_ROTATE_X = 'SET_ROTATE_X';
export const SET_ROTATE_Z = 'SET_ROTATE_Z';
export const SET_PERSPECTIVE = 'SET_PERSPECTIVE';
export const SET_VIEW = 'SET_VIEW';
export const SET_AMBIENT_C = 'SET_AMBIENT_C';
export const SET_DIFFUSE_C = 'SET_DIFFUSE_C';
export const SET_SPECULAR_C = 'SET_SPECULAR_C';
export const SET_F = 'SET_F';
export const SET_LIGHT_ROTATE_X = 'SET_LIGHT_ROTATE_X';
export const SET_LIGHT_ROTATE_Z = 'SET_LIGHT_ROTATE_Z';

const initialState: State = {
  step: 10,
  alfa: 20,
  beta: 125,
  scale: 1,
  perspective: false,
  view: ViewEnum.grayScale,
  ambientC: 0.4,
  diffuseC: 0.6,
  specularC: 0.15,
  f: 10,
  rotateLightX: 60,
  rotateLightZ: 340
};

export function reducer(state = initialState, action: Action): State {
  switch (action.type) {
    case SET_SCALE:
      return {
        ...state,
        scale: action.payload
      };
    case SET_ROTATE_X:
      return {
        ...state,
        beta: action.payload
      };
    case SET_ROTATE_Z:
      return {
        ...state,
        alfa: action.payload
      };
    case SET_PERSPECTIVE:
      return {
        ...state,
        perspective: action.payload
      };
    case SET_VIEW:
      return {
        ...state,
        view: action.payload
      };
    case SET_AMBIENT_C:
      return {
        ...state,
        ambientC: action.payload
      };
    case SET_DIFFUSE_C:
      return {
        ...state,
        diffuseC: action.payload
      };
    case SET_SPECULAR_C:
      return {
        ...state,
        specularC: action.payload
      };
    case SET_F:
      return {
        ...state,
        f: action.payload
      };
    case SET_LIGHT_ROTATE_X:
      return {
        ...state,
        rotateLightX: action.payload
      };
    case SET_LIGHT_ROTATE_Z:
      return {
        ...state,
        rotateLightZ: action.payload
      };
    default:
      return state;
  }
}

const store = createStore(
  reducer,
  // @ts-ignore
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
export default store;
