export const GROUP_SUCCESS = 'GROUP_SUCCESS';


export type GROUP = { 
  type: 'GROUP_SUCCESS',
  payload: GROUPOBJECT,
};

export type GROUPOBJECT = { name: string, crew: string[]};

export function groupAct(group: GROUPOBJECT): GROUP {
  return { type: "GROUP_SUCCESS", payload: group, }
};
