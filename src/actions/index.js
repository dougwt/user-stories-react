import axios from 'axios';
import { browserHistory } from 'react-router';

import { API_URI_PREFIX } from '../config';
import * as types from './types';

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
    type: types.FETCH_PROJECTS_REQUEST
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

export function fetchProject(id) {
  const request = axios.get(`${API_URI_PREFIX}/projects/${id}`, {
    headers: { authorization: localStorage.getItem('token') }
  });

  return {
    type: types.FETCH_PROJECT,
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
