import { expect } from '../test_helper';
import projectsReducer from '../../src/reducers/projects_reducer';
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
      project_error: null,
      role_isPosting: false,
      role_error: null
    });
  });

  it('handles action of type FETCH_PROJECT', () => {
    const state = undefined;
    const action = { type: types.FETCH_PROJECT };
    expect(projectsReducer(state, action)).to.eql({
      all: [],
      all_isLoading: false,
      all_error: null,
      project: null,
      project_isLoading: true,
      project_error: null,
      role_isPosting: false,
      role_error: null
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
      project_error: null,
      role_isPosting: false,
      role_error: null
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
      project_error: 'This is a sample error message.',
      role_isPosting: false,
      role_error: null
    });
  });

  it('handles action of type FETCH_PROJECTS', () => {
    const state = undefined;
    const action = { type: types.FETCH_PROJECTS };
    expect(projectsReducer(state, action)).to.eql({
      all: [],
      all_isLoading: true,
      all_error: null,
      project: null,
      project_isLoading: false,
      project_error: null,
      role_isPosting: false,
      role_error: null
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
      project_error: null,
      role_isPosting: false,
      role_error: null
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
      project_error: null,
      role_isPosting: false,
      role_error: null
    });
  });

  it('handles action of type CREATE_PROJECT', () => {
    const state = undefined;
    const action = { type: types.CREATE_PROJECT };
    expect(projectsReducer(state, action)).to.eql({
      all: [],
      all_isLoading: false,
      all_error: null,
      project: null,
      project_isLoading: false,
      project_error: null,
      role_isPosting: false,
      role_error: null
    });
  });

  it('handles action of type CREATE_PROJECT_SUCCESS', () => {
    const project1 = {
      _id: '588bb00b627569fc58ed44b6',
      name: 'Test Project 1',
      slug: 'test-project-1',
      roles: [{ name: 'developer' }, { name: 'tester' }]
    };
    const project2 = {
      _id: '588bb00b627569fc58ed44c7',
      name: 'Test Project 2',
      slug: 'test-project-2',
      roles: []
    };
    const state = {
      all: [project1],
      all_isLoading: false,
      all_error: null,
      project: null,
      project_isLoading: false,
      project_error: null,
      role_isPosting: false,
      role_error: null
    };
    const action = {
      type: types.CREATE_PROJECT_SUCCESS,
      payload: {
        data: {
          data: project2
        }
      }
    };
    expect(projectsReducer(state, action)).to.eql({
      all: [project1, project2],
      all_isLoading: false,
      all_error: null,
      project: null,
      project_isLoading: false,
      project_error: null,
      role_isPosting: false,
      role_error: null
    });
  });

  it('handles action of type CREATE_PROJECT_FAILURE', () => {
    const state = undefined;
    const action = {
      type: types.CREATE_PROJECT_FAILURE,
      payload: 'This is a sample error message.'
    };
    expect(projectsReducer(state, action)).to.eql({
      all: [],
      all_isLoading: false,
      all_error: null,
      project: null,
      project_isLoading: false,
      project_error: null,
      role_isPosting: false,
      role_error: null
    });
  });

  it('handles action of type DELETE_PROJECT', () => {
    const project1 = {
      _id: '588bb00b627569fc58ed44b6',
      name: 'Test Project 1',
      slug: 'test-project-1',
      roles: [{ name: 'developer' }, { name: 'tester' }]
    };
    const project2 = {
      _id: '588bb00b627569fc58ed44c7',
      name: 'Test Project 2',
      slug: 'test-project-2',
      roles: []
    };
    const state = {
      all: [project1, project2],
      all_isLoading: false,
      all_error: null,
      project: null,
      project_isLoading: false,
      project_error: null,
      role_isPosting: false,
      role_error: null
    };
    const action = { type: types.DELETE_PROJECT };
    expect(projectsReducer(state, action)).to.eql({
      all: [project1, project2],
      all_isLoading: false,
      all_error: null,
      project: null,
      project_isLoading: false,
      project_error: null,
      role_isPosting: false,
      role_error: null
    });
  });

  it('handles action of type DELETE_PROJECT_SUCCESS', () => {
    const project1 = {
      _id: '588bb00b627569fc58ed44b6',
      name: 'Test Project 1',
      slug: 'test-project-1',
      roles: [{ name: 'developer' }, { name: 'tester' }]
    };
    const project2 = {
      _id: '588bb00b627569fc58ed44c7',
      name: 'Test Project 2',
      slug: 'test-project-2',
      roles: []
    };
    const state = {
      all: [project1, project2],
      all_isLoading: false,
      all_error: null,
      project: null,
      project_isLoading: false,
      project_error: null,
      role_isPosting: false,
      role_error: null
    };
    const action = {
      type: types.DELETE_PROJECT_SUCCESS,
      payload: {
        id: project2._id
      }
    };
    expect(projectsReducer(state, action)).to.eql({
      all: [project1],
      all_isLoading: false,
      all_error: null,
      project: null,
      project_isLoading: false,
      project_error: null,
      role_isPosting: false,
      role_error: null
    });
  });

  it('handles action of type DELETE_PROJECT_FAILURE', () => {
    const project1 = {
      _id: '588bb00b627569fc58ed44b6',
      name: 'Test Project 1',
      slug: 'test-project-1',
      roles: [{ name: 'developer' }, { name: 'tester' }]
    };
    const project2 = {
      _id: '588bb00b627569fc58ed44c7',
      name: 'Test Project 2',
      slug: 'test-project-2',
      roles: []
    };
    const state = {
      all: [project1, project2],
      all_isLoading: false,
      all_error: null,
      project: null,
      project_isLoading: false,
      project_error: null,
      role_isPosting: false,
      role_error: null
    };
    const action = {
      type: types.DELETE_PROJECT_FAILURE,
      payload: 'This is a sample error message.'
    };
    expect(projectsReducer(state, action)).to.eql({
      all: [project1, project2],
      all_isLoading: false,
      all_error: null,
      project: null,
      project_isLoading: false,
      project_error: null,
      role_isPosting: false,
      role_error: null
    });
  });

  it('handles action of type CREATE_ROLE', () => {
    const state = undefined;
    const action = { type: types.CREATE_ROLE };
    expect(projectsReducer(state, action)).to.eql({
      all: [],
      all_isLoading: false,
      all_error: null,
      project: null,
      project_isLoading: false,
      project_error: null,
      role_isPosting: true,
      role_error: null
    });
  });

  it('handles action of type CREATE_ROLE_SUCCESS', () => {
    const project = {
      _id: '588bb00b627569fc58ed44b6',
      name: 'Test Project 1',
      slug: 'test-project-1',
      roles: [{ name: 'developer' }, { name: 'tester' }]
    };
    const state = {
      all: [],
      all_isLoading: false,
      all_error: null,
      project: project,
      project_isLoading: false,
      project_error: null,
      role_isPosting: false,
      role_error: null
    };
    const action = {
      type: types.CREATE_ROLE_SUCCESS,
      payload: {
        data: {
          data: [{ name: 'developer' }, { name: 'tester' }, { name: 'new' }]
        }
      }
    };
    expect(projectsReducer(state, action)).to.eql({
      all: [],
      all_isLoading: false,
      all_error: null,
      project: {
        ...project,
        roles: [
          ...project.roles,
          { name: 'new' }
        ]
      },
      project_isLoading: false,
      project_error: null,
      role_isPosting: false,
      role_error: null
    });
  });

  it('handles action of type CREATE_ROLE_FAILURE', () => {
    const state = undefined;
    const action = {
      type: types.CREATE_ROLE_FAILURE,
      payload: 'This is a sample error message.'
    };
    expect(projectsReducer(state, action)).to.eql({
      all: [],
      all_isLoading: false,
      all_error: null,
      project: null,
      project_isLoading: false,
      project_error: null,
      role_isPosting: false,
      role_error: 'This is a sample error message.'
    });
  });

  it('handles action of type DELETE_ROLE_SUCCESS', () => {
    const roleId = '58bc930e4a7f829be6ff2f8a';
    const state = {
      all: [],
      all_isLoading: false,
      all_error: null,
      project: { roles: [
        { _id: roleId },
        { _id: '58bc930e4a7f829be6ff2f8f' }
      ]},
      project_isLoading: false,
      project_error: null,
      role_isPosting: false,
      role_error: null
    };
    const action = {
      type: types.DELETE_ROLE_SUCCESS,
      payload: {
        roleId
      }
    };
    expect(projectsReducer(state, action)).to.eql({
      all: [],
      all_isLoading: false,
      all_error: null,
      project: { roles: [
        { _id: '58bc930e4a7f829be6ff2f8f' }
      ]},
      project_isLoading: false,
      project_error: null,
      role_isPosting: false,
      role_error: null
    });
  });
});
