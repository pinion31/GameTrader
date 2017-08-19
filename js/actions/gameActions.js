
export const addGame = (games) => {
  //let currentState = Object.assign({}, state, ...action.games);
  return {
     type: "ADD_GAME",
     payload: games
     /*[{ name: 'Left For Dead', id: ''},{ name: 'Skyrim', id: ''}]*/
  };

  //return currentState;
};
