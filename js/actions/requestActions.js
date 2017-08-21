

export const addRequest = request => (
  {
    type: 'ADD_REQUEST',
    payload: request
  }
);

export const removeRequest = request => (
  {
    type: 'REMOVE_REQUEST',
    payload: request
  }
);

