import axios from 'axios';
import { browserHistory } from 'react-router';

import { API_URI_PREFIX } from '../config';
import * as types from './types';

// Auth

export function authSignin({ email, password }) {
  return function(dispatch) {
    // Submit email/password to the server
    return axios.post(`${API_URI_PREFIX}/signin`, { email, password })
      .then((response) => {
        // If request is good...
        // - update state to indicate user is authenticated
        dispatch({ type: types.AUTH_SIGNIN });
        // - save the JWT token
        localStorage.setItem('token', response.data.token);
        // - redirect to the route '/home'
        browserHistory.push('/home');
      })
      .catch(() => {
        // If request is bad...
        // - show an error to the user
        dispatch(authError('Bad Login Info'));
      });
  };
}

export function authSignup({ email, password, name }) {
  return function(dispatch) {
    // Submit email/password to the server
    return axios.post(`${API_URI_PREFIX}/signup`, { email, password, name })
      .then((response) => {
        // If request is good...
        // - update state to indicate user is authenticated
        dispatch({ type: types.AUTH_SIGNIN });
        // - save the JWT token
        localStorage.setItem('token', response.data.token);
        // - redirect the user to the feature page
        browserHistory.push('/feature');
      })
      .catch(error => dispatch(authError(error.response.data.message)));
  };
}

export function authSignout() {
  localStorage.removeItem('token');

  return { type: types.AUTH_SIGNOUT };
}

export function authError(error) {
  return {
    type: types.AUTH_ERROR,
    payload: error
  };
}

export function fetchMessage() {
  const request = axios.get(`${API_URI_PREFIX}/auth_test`, {
    headers: { authorization: localStorage.getItem('token') }
  });

  return {
    type: types.FETCH_MESSAGE,
    payload: request
  };
}

// Projects

export function fetchProjects() {
  return function(dispatch) {
    dispatch(fetchProjectsRequest());
    const request = axios.get(`${API_URI_PREFIX}/projects`, {
      headers: { authorization: localStorage.getItem('token') }
    });

    return request
      .then(res => dispatch(fetchProjectsSuccess(res)))
      .catch(err => dispatch(fetchProjectsFailure(err)));
  };
}
export function fetchProjectsRequest() {
  return {
    type: types.FETCH_PROJECTS
  };
}
export function fetchProjectsSuccess(payload) {
  return {
    type: types.FETCH_PROJECTS_SUCCESS,
    payload
  };
}
export function fetchProjectsFailure(error) {
  return {
    type: types.FETCH_PROJECTS_FAILURE,
    payload: error
  };
}

export function createProject(props) {
  const request = axios.post(`${API_URI_PREFIX}/projects`, props, {
    headers: { authorization: localStorage.getItem('token') }
  });

  return {
    type: types.CREATE_PROJECT,
    payload: request
  };
}

export function deleteProject(id) {
  const request = axios.delete(`${API_URI_PREFIX}/projects/${id}`, {
    headers: { authorization: localStorage.getItem('token') }
  });

  return {
    type: types.DELETE_PROJECT,
    payload: request
  };
}

export function fetchProject(id) {
  return function(dispatch) {
    dispatch(fetchProjectRequest());
    const request = axios.get(`${API_URI_PREFIX}/projects/${id}`, {
      headers: { authorization: localStorage.getItem('token') }
    });

    return request
      .then(res => dispatch(fetchProjectSuccess(res)))
      .catch(err => dispatch(fetchProjectFailure(err)));
  };
}
export function fetchProjectRequest() {
  return {
    type: types.FETCH_PROJECT
  };
}
export function fetchProjectSuccess(payload) {
  return {
    type: types.FETCH_PROJECT_SUCCESS,
    payload
  };
}
export function fetchProjectFailure(error) {
  return {
    type: types.FETCH_PROJECT_FAILURE,
    payload: error
  };
}

// Roles

export function createRole(props) {
  return function(dispatch) {
    dispatch(createRoleRequest());
    const request = axios.post(`${API_URI_PREFIX}/projects/${props.projectId}/roles`, props, {
      headers: { authorization: localStorage.getItem('token') }
    });

    return request
      .then(res => dispatch(createRoleSuccess(res)))
      .catch(err => dispatch(createRoleFailure(err)));
  };
}
export function createRoleRequest() {
  return {
    type: types.CREATE_ROLE
  };
}
export function createRoleSuccess(payload) {
  return {
    type: types.CREATE_ROLE_SUCCESS,
    payload
  };
}
export function createRoleFailure(error) {
  return {
    type: types.CREATE_ROLE_FAILURE,
    payload: error
  };
}

export function deleteRole({ projectId, roleId }) {
  return function(dispatch) {
    dispatch(deleteRoleRequest());
    const request = axios.delete(`${API_URI_PREFIX}/projects/${projectId}/roles/${roleId}`, {
      headers: { authorization: localStorage.getItem('token') }
    });

    return request
      .then(res => dispatch(deleteRoleSuccess(res, roleId)))
      .catch(err => dispatch(deleteRoleFailure(err, roleId)));
  };
}
export function deleteRoleRequest() {
  return {
    type: types.DELETE_ROLE
  };
}
export function deleteRoleSuccess(payload, roleId) {
  return {
    type: types.DELETE_ROLE_SUCCESS,
    payload: {
      roleId,
      data: payload
    }
  };
}
export function deleteRoleFailure(error, roleId) {
  return {
    type: types.DELETE_ROLE_FAILURE,
    payload: {
      roleId,
      error
    }
  };
}
