import {Cmd, loop} from 'redux-loop';
import {
  fetchTacos,
  tacosFetchFailedAction,
  tacosFetchSuccessfulAction,
} from '../action/actionType';

const initState = {
  ingredients: [],
  initStarted: false,
};

// function showTacosReducer(state = initState, action){
//     console.log("Inside reducer type: ", action.type)
//     switch(action.type){
//         case "FETCH_TACOS":
//             return {
//                 ...state,
//                 ingredients: action.payload
//             }
//             break;
//         default:
//             return state
//     }
// }

function showTacosReducer(state = initState, action) {
  switch (action.type) {
    case 'FETCH_TACOS':
      return loop(
        {...state, initStarted: true},
        Cmd.run(fetchTacos, {
          args: [],
          successActionCreator: tacosFetchSuccessfulAction,
          failActionCreator: tacosFetchFailedAction,
        }),
      );
    case 'TACOS_FETCH_SUCCESSFUL':
      return {...state, ingredients: action.tacos};

    case 'TACOS_FETCH_FAILED':
      return {...state, error: action.error};
    default:
      return state;
  }
}

export default showTacosReducer;
