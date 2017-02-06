import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './app';
import AccountHome from './components/account_home'
import AddProjectForm from './components/add_project_form'

export default (
  <Route path="/" component={App}>
    <IndexRoute component={AccountHome} />
    <Route path="new" component={AddProjectForm} />
  </Route>
)
