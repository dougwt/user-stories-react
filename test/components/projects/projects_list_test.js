import configureMockStore from 'redux-mock-store';
import nock from 'nock';
import promise from 'redux-promise';

import { renderComponent , expect } from '../../test_helper';
import ProjectsList from '../../../src/components/projects/projects_list'
import { API_URI_PREFIX } from '../../../src/config'
import { FETCH_PROJECTS } from '../../../src/actions'

const middlewares = [ promise ]
const mockStore = configureMockStore(middlewares)

describe('components/projects/ProjectsList' , () => {
  let data, component;

  // TODO: Find a way to test wrapped components
  beforeEach((done) => {
    data = {
      "status": "success",
      "data": [
        {
          "_id": "588bb00b627569fc58ed44b6",
          "_createdAt": "2017-01-27T20:39:39.225Z",
          "_updatedAt": "2017-01-27T20:39:39.225Z",
          "name": "Test Project 1",
          "slug": "test-project-1",
          "roles": [{ "name": "developer" }, { "name": "tester" }]
        },
        {
          "_id": "588bb00b627569fc58ed44b7",
          "_createdAt": "2017-01-27T20:39:39.225Z",
          "_updatedAt": "2017-01-27T20:39:39.225Z",
          "name": "Test Project 2",
          "slug": "test-project-2",
          "roles": [{ "name": "developer" }, { "name": "tester" }]
        }
      ]
    };
    nock(API_URI_PREFIX)
      .get('/projects')
      .reply(200, data);

    store = mockStore({ authenticated: true, error: '' })

    // action = actions.deleteProject('588bb00b627569fc58ed44b6');
    // store.dispatch(action)
    //   .then(() => { // return of async actions
    //     newActions = store.getActions();
    //     done();
    //   });

    component = renderComponent(ProjectsList);
  });

  xit('renders something', () => {
    expect(component).to.exist;
  });

  xit('has the correct class', () => {
    expect(component).to.have.class('projects-list');
  });

  xit('shows a <li> for each project', () => {
    expect(component.find('li').length).to.equal(2);
  });

  xit('shows each project that is provided', () => {
    expect(component).to.contain('Test Project 1');
    expect(component).to.contain('Test Project 2');
  });
});
