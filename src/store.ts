import { createStore } from 'redux';

export enum viewEnum {
  skeleton = 'skeleton',
  skeletonHidden = 'skeletonHidden'
}

export interface State {
  step: number;
  alfa: number;
  beta: number;
  scale: number;
  perspective: boolean;
  view: viewEnum;
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

const initialState: State = {
  step: 10,
  alfa: 20,
  beta: 65,
  scale: 1,
  perspective: false,
  view: viewEnum.skeletonHidden
};

function reducer(state = initialState, action: Action): State {
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
