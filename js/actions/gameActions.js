

export const addGame = (games) => {
  //let currentState = Object.assign({}, state, ...action.games);
  return {
     type: "ADD_GAME",
     payload: games
  };


};



