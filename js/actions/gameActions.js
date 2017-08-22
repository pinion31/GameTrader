

export const addGame = game => (
  {
    type: 'ADD_GAME',
    payload: game
  }
);

export const removeGame = game => (
  {
    type: 'REMOVE_GAME',
    payload: game
  }
);
