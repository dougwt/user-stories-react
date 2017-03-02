import { expect } from '../test_helper';
import projectsReducer from '../../src/reducers/reducer_projects';
import * as types from '../../src/actions/types';

describe('projectsReducer', () => {
  it('handles action with unknown type', () => {
    const state = undefined;
    const action = {};
    expect(projectsReducer(state, action)).to.eql({
      all: [],
      all_isLoading: false,
      all_error: null,
      project: null,
      project_isLoading: false,
      project_error: null
    });
  });

  it('handles action of type FETCH_PROJECT_REQUEST', () => {
    const state = undefined;
    const action = { type: types.FETCH_PROJECT_REQUEST };
    expect(projectsReducer(state, action)).to.eql({
      all: [],
      all_isLoading: false,
      all_error: null,
      project: null,
      project_isLoading: true,
      project_error: null
    });
  });

  it('handles action of type FETCH_PROJECT_SUCCESS', () => {
    const state = undefined;
    const project = {
      _id: '588bb00b627569fc58ed44b6',
      name: 'Test Project 1',
      slug: 'test-project-1',
      roles: [{ name: 'developer' }, { name: 'tester' }]
    };
    const action = {
      type: types.FETCH_PROJECT_SUCCESS,
      payload: {
        data: {
          data: project
        }
      }
    };
    expect(projectsReducer(state, action)).to.eql({
      all: [],
      all_isLoading: false,
      all_error: null,
      project: project,
      project_isLoading: false,
      project_error: null
    });
  });

  it('handles action of type FETCH_PROJECT_FAILURE', () => {
    const state = undefined;
    const action = {
      type: types.FETCH_PROJECT_FAILURE,
      payload: 'This is a sample error message.'
    };
    expect(projectsReducer(state, action)).to.eql({
      all: [],
      all_isLoading: false,
      all_error: null,
      project: null,
      project_isLoading: false,
      project_error: 'This is a sample error message.'
    });
  });

  it('handles action of type FETCH_PROJECTS_REQUEST', () => {
    const state = undefined;
    const action = { type: types.FETCH_PROJECTS_REQUEST };
    expect(projectsReducer(state, action)).to.eql({
      all: [],
      all_isLoading: true,
      all_error: null,
      project: null,
      project_isLoading: false,
      project_error: null
    });
  });

  it('handles action of type FETCH_PROJECTS_SUCCESS', () => {
    const state = undefined;
    const projects = [
      {
        _id: '588bb00b627569fc58ed44b6',
        name: 'Test Project 1',
        slug: 'test-project-1',
        roles: [{ name: 'developer' }, { name: 'tester' }]
      },
      {
        _id: '588bb00b627569fc58ed44b7',
        name: 'Test Project 2',
        slug: 'test-project-2',
        roles: [{ name: 'developer' }, { name: 'tester' }]
      }
    ];
    const action = {
      type: types.FETCH_PROJECTS_SUCCESS,
      payload: {
        data: {
          data: projects
        }
      }
    };
    expect(projectsReducer(state, action)).to.eql({
      all: projects,
      all_isLoading: false,
      all_error: null,
      project: null,
      project_isLoading: false,
      project_error: null
    });
  });

  it('handles action of type FETCH_PROJECTS_FAILURE', () => {
    const state = undefined;
    const action = {
      type: types.FETCH_PROJECTS_FAILURE,
      payload: 'This is a sample error message.'
    };
    expect(projectsReducer(state, action)).to.eql({
      all: [],
      all_isLoading: false,
      all_error: 'This is a sample error message.',
      project: null,
      project_isLoading: false,
      project_error: null
    });
  });
});
