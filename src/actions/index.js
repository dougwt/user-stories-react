import axios from 'axios';

export const FETCH_PROJECTS = 'FETCH_PROJECTS';
export const CREATE_PROJECT = 'CREATE_PROJECT';
export const FETCH_PROJECT = 'FETCH_PROJECT'
export const DELETE_PROJECT = 'DELETE_PROJECT'

const ROOT_URL = 'http://localhost:3001'

export function fetchProjects() {
  const request = axios.get(`${ROOT_URL}/projects`)

  return {
    type: FETCH_PROJECTS,
    payload: request
  };
}

export function createProject(props) {
  const request = axios.post(`${ROOT_URL}/projects`, props)

  return {
    type: CREATE_PROJECT,
    payload: request
  };
}

export function fetchProject(id) {
  const request = axios.get(`${ROOT_URL}/projects/${id}`)

  return {
    type: FETCH_PROJECT,
    payload: request
  }
}

export function deleteProject(id) {
  const request = axios.delete(`${ROOT_URL}/projects/${id}`)

  return {
    type: DELETE_PROJECT,
    payload: request
  }
}
