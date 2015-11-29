import React                 from 'react';
import { Route, IndexRoute } from 'react-router';
import CoreLayout            from './views/layouts/CoreLayout';
import HomeView              from './views/HomeView';
import RepoView             from './views/RepoView';

export default (
  <Route        component={CoreLayout} path='/'>
    <IndexRoute component={HomeView} />
    <Route      component={RepoView}  path='/repo/:id' />
  </Route>
);
