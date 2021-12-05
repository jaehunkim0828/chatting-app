export const USERS_SUCCESS = 'USER_SUCCESS';

export type USERS = { 
  type: 'USER_SUCCESS'|'SENT_SUCCESS',
  payload: Array<any>,
};

export function usersAct(list: Array<any>): USERS {
  return { type: "SENT_SUCCESS", payload: list};
};
