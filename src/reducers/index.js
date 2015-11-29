import { combineReducers }              from 'redux';
import { routeReducer }                 from 'redux-simple-router';
import { reducers as servicesReducers } from './../services';
import github                           from './github';

/**
 * We're exporting a single reducer, made from combining all top level reducers in our application.
 *
 * The properties used in the object argument for `combineReducers`, below, will be reflected on the a Redux store
 * that takes this as it's reducers argument.
 */

export default combineReducers({
  github,
  services: servicesReducers,
  routing: routeReducer
});
