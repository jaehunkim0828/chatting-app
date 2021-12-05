import {
  USERS_SUCCESS,
  USERS,
} from '../action/usersAct';

export type UserState = {
  user: Array<any>;
};

const initialState = {
  user: [],
};

export function usersReducer(state = initialState, action: USERS): UserState {
  switch (action.type) {
    case USERS_SUCCESS : {
      return { user: action.payload };
    }
    default:
      return state;
  }
}