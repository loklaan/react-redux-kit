import { combineReducers }    from 'redux';
import github              from './github';

/**
 * As a convenience, the reducers and actions, that are generated from the service descriptions,
 * are exposed as top level module exports to be used in the reducers and actions directories.
 */

export const reducers = combineReducers({
  github: combineReducers(github.reducers)
});

export const actions = {
  github: github.actions
};
