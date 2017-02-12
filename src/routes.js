import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/app';
import AccountHome from './components/account_home'
import AddProjectForm from './components/add_project_form'
import ProjectsShow from './components/projects_show'
import SigninForm from './components/auth/signin_form'
import SignupForm from './components/auth/signup_form'
import Signout from './components/auth/signout'
import RequireAuth from './components/auth/require_auth'
import Feature from './components/feature'

export default (
  <Route path="/" component={App}>
    <IndexRoute component={AccountHome} />
    <Route path="new" component={AddProjectForm} />
    <Route path="signin" component={SigninForm} />
    <Route path="signup" component={SignupForm} />
    <Route path="signout" component={Signout} />
    <Route path="feature" component={RequireAuth(Feature)} />
    <Route path="projects/:id" component={ProjectsShow} />
  </Route>
)
