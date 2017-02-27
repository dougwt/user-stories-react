import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/app';
import LandingPage from './components/views/landing';
import AccountHome from './components/views/account_home';
import AuthSignin from './components/views/auth_signin';
import AuthSignup from './components/views/auth_signup';
import AuthSignout from './components/views/auth_signout';

import AddProjectForm from './components/projects/add_project_form';
import ProjectsShow from './components/projects/projects_show';
import Feature from './components/views/feature';

import RequireAuth from './components/auth/require_auth';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={LandingPage} />
    <Route path="home" component={RequireAuth(AccountHome)} />
    <Route path="new" component={AddProjectForm} />
    <Route path="signin" component={AuthSignin} />
    <Route path="signup" component={AuthSignup} />
    <Route path="signout" component={AuthSignout} />
    <Route path="feature" component={RequireAuth(Feature)} />
    <Route path="projects/:id" component={RequireAuth(ProjectsShow)} />
  </Route>
);
