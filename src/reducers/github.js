import { createReducer }     from '../utils';
import { GITHUB_SET_USER } from '../constants';

const initialState = {name: ''};
export default createReducer(initialState, {
  [GITHUB_SET_USER]: (state, payload) => ({name: payload.name})
});
