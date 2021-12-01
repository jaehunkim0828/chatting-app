export const USER_SUCCESS = 'USER_SUCCESS';
export const SENT_SUCCESS = 'SENT_SUCCESS';

export type ROOM = { 
  type: 'USER_SUCCESS'|'SENT_SUCCESS',
  payload: string | null,
};

export function sentQuiz(sent: string): ROOM {
  return { type: "SENT_SUCCESS", payload: sent, }
};

export function userQuiz(user: string | null): ROOM {
  return { type: "USER_SUCCESS", payload: user, }
};
