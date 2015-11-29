import { combineReducers }              from 'redux';
import { routeReducer }                 from 'redux-simple-router';
import counter                          from './counter';
import { reducers as servicesReducers } from './../services';

export default combineReducers({
  services: servicesReducers,
  counter,
  routing: routeReducer
});
