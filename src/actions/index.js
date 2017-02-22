import axios from 'axios';
import { browserHistory } from 'react-router';
import { API_URI_PREFIX } from '../config'

export const AUTH_SIGNIN = 'AUTH_SIGNIN';

export function authSignin({ email, password }) {
  return function(dispatch) {
    // Submit email/password to the server
    axios.post(`${API_URI_PREFIX}/signin`, { email, password })
      .then((response) => {
        // If request is good...
        // - update state to indicate user is authenticated
        dispatch({ type: AUTH_SIGNIN });
        // - save the JWT token
        localStorage.setItem('token', response.data.token);
        // - redirect to the route '/home'
        browserHistory.push('/home');
      })
      .catch((err) => {
        // If request is bad...
        // - show an error to the user
        dispatch(authError('Bad Login Info'));
      });
  }
}

export const AUTH_SIGNOUT = 'AUTH_SIGNOUT';

export function authSignout() {
  localStorage.removeItem('token');

  return { type: AUTH_SIGNOUT };
}

export const AUTH_SIGNUP = 'AUTH_SIGNUP'

export function authSignup({ email, password, name }) {
  return function(dispatch) {
    // Submit email/password to the server
    axios.post(`${API_URI_PREFIX}/signup`, { email, password, name })
      .then((response) => {
        dispatch({ type: AUTH_SIGNIN });
        localStorage.setItem('token', response.data.token);
        browserHistory.push('/feature');
      })
      .catch(error => dispatch(authError(error.response.data.message)))
  }
}

export const AUTH_ERROR = 'AUTH_ERROR';

export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error
  };
}

export const FETCH_MESSAGE = 'FETCH_MESSAGE';

export function fetchMessage(error) {
  const request = axios.get(`${API_URI_PREFIX}/auth_test`, {
    headers: { authorization: localStorage.getItem('token') }
  })

  return {
    type: FETCH_MESSAGE,
    payload: request
  }
}

export const FETCH_PROJECTS = 'FETCH_PROJECTS';

export function fetchProjects() {
  const request = axios.get(`${API_URI_PREFIX}/projects`, {
    headers: { authorization: localStorage.getItem('token') }
  })

  return {
    type: FETCH_PROJECTS,
    payload: request
  };
}

export const CREATE_PROJECT = 'CREATE_PROJECT';

export function createProject(props) {
  const request = axios.post(`${API_URI_PREFIX}/projects`, props, {
    headers: { authorization: localStorage.getItem('token') }
  })

  return {
    type: CREATE_PROJECT,
    payload: request
  };
}

export const FETCH_PROJECT = 'FETCH_PROJECT'

export function fetchProject(id) {
  const request = axios.get(`${API_URI_PREFIX}/projects/${id}`, {
    headers: { authorization: localStorage.getItem('token') }
  })

  return {
    type: FETCH_PROJECT,
    payload: request
  }
}

export const DELETE_PROJECT = 'DELETE_PROJECT'

export function deleteProject(id) {
  const request = axios.delete(`${API_URI_PREFIX}/projects/${id}`, {
    headers: { authorization: localStorage.getItem('token') }
  })

  return {
    type: DELETE_PROJECT,
    payload: request
  }
}
