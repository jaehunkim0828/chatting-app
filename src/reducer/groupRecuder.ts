import {
  GROUP_SUCCESS,
  GROUP,
  GROUPOBJECT,
} from '../action/groupAct';

const initialState = {
  name: '',
  crew: [''],
};

export function groupReducer(state = initialState, action: GROUP): GROUPOBJECT {
  switch (action.type) {
    case GROUP_SUCCESS : {
      return { name: action.payload.name,  crew: action.payload.crew};
    }
    default:
      return state;
  }
}