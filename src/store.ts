import { createStore } from 'redux';

export interface State {
  step: number;
  alfa: number;
  beta: number;
  scale: number;
  perspective: boolean;
}

export interface Action {
  type: string;
  payload?: any;
}

export const SET_SCALE = 'SET_SCALE';
export const SET_ROTATE_X = 'SET_ROTATE_X';
export const SET_ROTATE_Z = 'SET_ROTATE_Z';
export const SET_PERSPECTIVE = 'SET_PERSPECTIVE';

const initialState: State = {
  step: 10,
  alfa: 20,
  beta: 65,
  scale: 1,
  perspective: false
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
    default:
      return state;
  }
}

const store = createStore(reducer);
export default store;
