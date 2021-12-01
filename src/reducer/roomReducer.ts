import {
  USER_SUCCESS,
  ROOM,
  SENT_SUCCESS,
} from '../action/roomAct';

export type InitialState = {
  user: any;
  sent: any;
};

const initialState = {
  user: '',
  sent: '',
};

export function roomReducer(state = initialState, action: ROOM): InitialState {
  switch (action.type) {
    case USER_SUCCESS : {
      return { ...state,  user: action.payload };
    }
    case SENT_SUCCESS: {
      return { ...state, sent: action.payload };
    }
    default:
      return state;
  }
}