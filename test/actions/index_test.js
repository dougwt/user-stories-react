import configureMockStore from 'redux-mock-store'
import nock from 'nock'
import promise from 'redux-promise';

import { expect } from '../test_helper';
import * as actions from '../../src/actions'
import { API_URI_PREFIX } from '../../src/config'

const middlewares = [ promise ]
const mockStore = configureMockStore(middlewares)

describe('actions', () => {
  afterEach(() => {
    nock.cleanAll()
  })

  describe('authSignin', () => {
    xit('has the correct type', () => {
      const action = actions.authSignin();
      expect(action.type).to.equal(actions.AUTH_SIGNIN);
    });
    // TODO: Find a way to test async requests
    xit('has the correct payload', () => {
      // const action = actions.authSignin({ email: 'test@example.com', password: 'password' });
      // expect(action.payload).to.equal('token')

      nock(API_URI_PREFIX)
        .get('/signin')
        .reply(200, {
          "status": "success",
          "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1OGEwMDU3OTRkYjczMzE2NjcxYjdiMTAiLCJpYXQiOjE0ODY5NDE3NTIxNzh9.XIrVFzi0QiWT3DkIzkpeFFrEYRXsJVkXW9GCYrrvpYY"
        });

      const store = mockStore({ authenticated: true, error: '' })

      const action = actions.authSignin({ email: 'test@example.com', password: 'password' });
      console.log('action:', action)
      return store.dispatch(action)
        .then(() => { // return of async actions
          expect(action.payload).to.equal('token')
        })
    });
  });

  describe('authSignout', () => {
    let action;
    beforeEach(() => {
      action = actions.authSignout();
    });
    it('has the correct type', () => {
      expect(action.type).to.equal(actions.AUTH_SIGNOUT);
    });
    it('has the correct payload', () => {
      expect(action.payload).to.be.undefined;
    });
  });

  describe('authSignup', () => {
    xit('has the correct type', () => {
      const action = actions.authSignup();
      expect(action.type).to.equal(actions.AUTH_SIGNUP);
    });
    // TODO: Find a way to test async requests
    xit('has the correct payload', () => {

    });
  });

  describe('authError', () => {
    let action;
    beforeEach(() => {
      action = actions.authError('test error');
    });
    it('has the correct type', () => {
      expect(action.type).to.equal(actions.AUTH_ERROR);
    });
    it('has the correct payload', () => {
      expect(action.payload).to.equal('test error')
    });
  });

  describe('fetchMessage', () => {
    let data, store, action, newActions;

    beforeEach((done) => {
      data = { "success": "true" }
      nock(API_URI_PREFIX)
        .get('/auth_test')
        .reply(200, data);

      store = mockStore({ authenticated: true, error: '' })

      action = actions.fetchMessage();
      store.dispatch(action)
        .then(() => { // return of async actions
          newActions = store.getActions();
          done();
        });
    })
    it('has the correct type', () => {
      expect(newActions.length).to.equal(1);
      const action = newActions[0];
      expect(action.type).to.equal(actions.FETCH_MESSAGE);
    });
    it('has the correct payload', () => {
      expect(newActions.length).to.equal(1);
      const action = newActions[0];
      expect(action.payload).to.exist;
      expect(action.payload.data).to.exist;
      expect(action.payload.data).to.eql(data);
    });
  });

  describe('fetchProjects', () => {
    let data, store, action, newActions;

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
      }
      nock(API_URI_PREFIX)
        .get('/projects')
        .reply(200, data);

      store = mockStore({ authenticated: true, error: '' })

      action = actions.fetchProjects();
      store.dispatch(action)
        .then(() => { // return of async actions
          newActions = store.getActions();
          done();
        });
    })
    it('has the correct type', () => {
      expect(newActions.length).to.equal(1);
      const action = newActions[0];
      expect(action.type).to.equal(actions.FETCH_PROJECTS);
    });
    it('has the correct payload', () => {
      expect(newActions.length).to.equal(1);
      const action = newActions[0];
      expect(action.payload).to.exist;
      expect(action.payload.data).to.exist;
      expect(action.payload.data).to.eql(data);
    });
  });

  describe('createProject', () => {
    let data, store, action, newActions;

    beforeEach((done) => {
      data = {
        "status": "success",
        "data": {
          "_id": "588bb00b627569fc58ed44b6",
          "_createdAt": "2017-01-27T20:39:39.225Z",
          "_updatedAt": "2017-01-27T20:39:39.225Z",
          "name": "My Example",
          "slug": "my-example-project",
          "roles": [],
          "stories": [],
          "owner": null
        }
      }
      nock(API_URI_PREFIX)
        .post('/projects')
        .reply(201, data);

      store = mockStore({ authenticated: true, error: '' })

      action = actions.createProject();
      store.dispatch(action)
        .then(() => { // return of async actions
          newActions = store.getActions();
          done();
        });
    })
    it('has the correct type', () => {
      expect(newActions.length).to.equal(1);
      const action = newActions[0];
      expect(action.type).to.equal(actions.CREATE_PROJECT);
    });
    it('has the correct payload', () => {
      expect(newActions.length).to.equal(1);
      const action = newActions[0];
      expect(action.payload).to.exist;
      expect(action.payload.data).to.exist;
      expect(action.payload.data).to.eql(data);
    });
  });

  describe('fetchProject', () => {
    let data, store, action, newActions;

    beforeEach((done) => {
      data = {
        "status": "success",
        "data": {
          "_id": "588bb00b627569fc58ed44b6",
          "_createdAt": "2017-01-27T20:39:39.225Z",
          "_updatedAt": "2017-01-27T20:39:39.225Z",
          "name": "My Example",
          "slug": "my-example-project",
          "roles": [],
          "stories": [],
          "owner": null
        }
      }
      nock(API_URI_PREFIX)
        .get('/projects/588bb00b627569fc58ed44b6')
        .reply(200, data);

      store = mockStore({ authenticated: true, error: '' })

      action = actions.fetchProject('588bb00b627569fc58ed44b6');
      store.dispatch(action)
        .then(() => { // return of async actions
          newActions = store.getActions();
          done();
        });
    })
    it('has the correct type', () => {
      expect(newActions.length).to.equal(1);
      const action = newActions[0];
      expect(action.type).to.equal(actions.FETCH_PROJECT);
    });
    it('has the correct payload', () => {
      expect(newActions.length).to.equal(1);
      const action = newActions[0];
      expect(action.payload).to.exist;
      expect(action.payload.data).to.exist;
      expect(action.payload.data).to.eql(data);
    });
  });

  describe('deleteProject', () => {
    let data, store, action, newActions;

    beforeEach((done) => {
      nock(API_URI_PREFIX)
        .delete('/projects/588bb00b627569fc58ed44b6')
        .reply(204);

      store = mockStore({ authenticated: true, error: '' })

      action = actions.deleteProject('588bb00b627569fc58ed44b6');
      store.dispatch(action)
        .then(() => { // return of async actions
          newActions = store.getActions();
          done();
        });
    })
    it('has the correct type', () => {
      expect(newActions.length).to.equal(1);
      const action = newActions[0];
      expect(action.type).to.equal(actions.DELETE_PROJECT);
    });
    it('has the correct payload', () => {
      expect(newActions.length).to.equal(1);
      const action = newActions[0];
      expect(action.payload).to.exist;
      expect(action.payload.data).to.be.eql('');
    });
  });
});
