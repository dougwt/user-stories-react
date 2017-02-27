import { expect } from '../test_helper';
import projectsReducer from '../../src/reducers/reducer_projects';
import * as types from '../../src/actions/types';

describe('projectsReducer', () => {
  it('handles action with unknown type', () => {
    const state = undefined;
    const action = {};
    expect(projectsReducer(state, action)).to.eql({ all: [], project: null });
  });

  it('handles action of type FETCH_PROJECT', () => {
    const state = undefined;
    const project = {
      _id: '',
      name: "My Example",
      slug: "my-example-project",
      roles: [{ name: "developer" }, { name: "tester" }],
      owner: null
    }
    const action = {
      type: types.FETCH_PROJECT,
      payload: {
        data: {
          data: project
        }
      }
    };
    expect(projectsReducer(state, action)).to.eql({ all: [], project: project });
  });

  it('handles action of type FETCH_PROJECTS', () => {
    const state = undefined;
    const projects = [
      {
        _id: "588bb00b627569fc58ed44b6",
        name: "Test Project 1",
        slug: "test-project-1",
        roles: [{ name: "developer" }, { name: "tester" }]
      },
      {
        _id: "588bb00b627569fc58ed44b7",
        name: "Test Project 2",
        slug: "test-project-2",
        roles: [{ name: "developer" }, { name: "tester" }]
      }
    ]
    const action = {
      type: types.FETCH_PROJECTS,
      payload: {
        data: {
          data: projects
        }
      }
    };
    expect(projectsReducer(state, action)).to.eql({ all: projects, project: null });
  });
});
