import { expect } from '../test_helper';
import projectsReducer from '../../src/reducers/reducer_projects';
import { FETCH_PROJECT, FETCH_PROJECTS } from '../../src/actions';

describe('projectsReducer', () => {
  it('handles action with unknown type', () => {
    expect(projectsReducer(undefined, {})).to.eql({ all: [], project: null });
  });

  // TODO: Find a way to test async requests
  xit('handles action of type FETCH_PROJECT', () => {
    const action = {
      type: FETCH_PROJECT,
      payload: null  // async request
    }
    expect(projectsReducer(undefined, action))
  });

  // TODO: Find a way to test async requests
  xit('handles action of type FETCH_PROJECTS', () => {
    const action = {
      type: FETCH_PROJECTS,
      payload: null  // async request
    }
    expect(projectsReducer(undefined, action))
  });
});
