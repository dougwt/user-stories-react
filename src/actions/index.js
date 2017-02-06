import axios from 'axios';

export const FETCH_PROJECTS = 'FETCH_PROJECTS';
export const CREATE_PROJECT = 'CREATE_PROJECT';

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
