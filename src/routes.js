import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/app';
import AccountHome from './components/account_home'
import AddProjectForm from './components/add_project_form'
import ProjectsShow from './components/projects_show'

export default (
  <Route path="/" component={App}>
    <IndexRoute component={AccountHome} />
    <Route path="new" component={AddProjectForm} />
    <Route path="projects/:id" component={ProjectsShow} />
  </Route>
)