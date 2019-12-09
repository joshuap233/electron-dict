import {combineReducers} from 'redux';
import {connectRouter} from 'connected-react-router';
import search from './search';

export default function createRootReducer(history) {
  return combineReducers({
    router: connectRouter(history),
    search,
  });
}
