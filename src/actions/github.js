import { GITHUB_SET_USER } from '../constants';

export default {
  update: (name) => ({ type: GITHUB_SET_USER, name })
};
