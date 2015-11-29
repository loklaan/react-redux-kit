import reduxApi     from 'redux-api';
import fetch        from 'isomorphic-fetch';
import adapterFetch from 'redux-api/lib/adapters/fetch';
import map          from 'lodash/collection/map';

const URL = 'https://api.github.com';
const headers = {
  'User-Agent': 'redux-api',
  'Accept': 'application/vnd.github.v3+json'
};

export default reduxApi({
  userRepos: {
    url: `${URL}/users/:userId/repos`,
    options: { headers },
    transformer (data) {
      return map(data, (item)=> {
        return {
          id: item.id,
          name: item.name,
          fullName: item.full_name,
          description: item.description,
          owner: {
            id: item.owner.id,
            name: item.owner.login,
            avatar: item.owner.avatar_url
          }
        };
      });
    },
    helpers: {
      loklaans () {
        return [{user: 'loklaan'}, {}];
      }
    }
  },
  repo: {
    url: `${URL}/repos/:userId/:repoId`,
    options: { headers }
  },
  users: {
    url: `${URL}/search/users`,
    options: { headers },
    transformer (data) {
      // TODO: evaluate response format
    },
    helpers: {
      search (query) {
        return [ {}, { q: query } ];
      }
    }
  }
}).init(adapterFetch(fetch), false);
