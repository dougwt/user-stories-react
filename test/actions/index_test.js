import configureMockStore from 'redux-mock-store'
import nock from 'nock';
import promise from 'redux-promise';
import sinon from 'sinon';
import * as router from 'react-router';

import { expect } from '../test_helper';
import * as actions from '../../src/actions';
import * as types from '../../src/actions/types';
import { API_URI_PREFIX } from '../../src/config';

const middlewares = [ promise ]
const mockStore = configureMockStore(middlewares)

describe('actions', () => {
  afterEach(() => {
    nock.cleanAll()
  })

  describe('authSignin', () => {
    let data, store, action, newActions;

    beforeEach((done) => {
      data = {
        "status": "success",
        "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1OGEwMDU3OTRkYjczMzE2NjcxYjdiMTAiLCJpYXQiOjE0ODY5NDE3NTIxNzh9.XIrVFzi0QiWT3DkIzkpeFFrEYRXsJVkXW9GCYrrvpYY"
      }
      nock(API_URI_PREFIX)
        .post('/signin')
        .reply(200, data);

      // Prepare to stub browserHistory to detect push
      router.browserHistory = { push: ()=>{} };
      const browserHistoryPushStub = sinon.stub(router.browserHistory, 'push', () => { });

      // Prepare the mock store
      store = mockStore({ authenticated: false, error: '' })
      // Call our action creator
      action = actions.authSignin({ email: 'test@example.com', password: 'password' });
      // Execute the action creator's wrapper function to get the action.
      action = action(store.dispatch)
        .then(() => { // return of async actions
          newActions = store.getActions();
          expect(browserHistoryPushStub).to.have.been.calledOnce;
          browserHistoryPushStub.restore();
          done();
        })
        .catch((err) => {
          console.log('Error:', err);
        });
    })
    it('has the correct type', () => {
      expect(newActions.length).to.equal(1);
      const action = newActions[0];
      expect(action.type).to.equal(types.AUTH_SIGNIN);
    });
    it('has the correct payload', () => {
      expect(newActions.length).to.equal(1);
      const action = newActions[0];
      expect(action.payload).to.be.undefined;
    });
  });

  describe('authSignup', () => {
    let data, store, action, newActions;

    beforeEach((done) => {
      data = {
        "status": "success",
        "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1OGEwMDU3OTRkYjczMzE2NjcxYjdiMTAiLCJpYXQiOjE0ODY5NDE3NTIxNzh9.XIrVFzi0QiWT3DkIzkpeFFrEYRXsJVkXW9GCYrrvpYY"
      }
      nock(API_URI_PREFIX)
        .post('/signup')
        .reply(201, data);

      // Prepare to stub browserHistory to detect push
      router.browserHistory = { push: ()=>{} };
      const browserHistoryPushStub = sinon.stub(router.browserHistory, 'push', () => { });

      // Prepare the mock store
      store = mockStore({ authenticated: false, error: '' })
      // Call our action creator
      action = actions.authSignup({ email: 'test@example.com', password: 'password', name: 'Test' });
      // Execute the action creator's wrapper function to get the action.
      action = action(store.dispatch)
        .then(() => { // return of async actions
          newActions = store.getActions();
          expect(browserHistoryPushStub).to.have.been.calledOnce;
          browserHistoryPushStub.restore();
          done();
        })
        .catch((err) => {
          console.log('Error:', err);
        });
    })
    it('has the correct type', () => {
      expect(newActions.length).to.equal(1);
      const action = newActions[0];
      expect(action.type).to.equal(types.AUTH_SIGNIN);
    });
    it('has the correct payload', () => {
      expect(newActions.length).to.equal(1);
      const action = newActions[0];
      expect(action.payload).to.be.undefined;
    });
  });

  describe('authSignout', () => {
    let action;
    beforeEach(() => {
      action = actions.authSignout();
    });
    it('has the correct type', () => {
      expect(action.type).to.equal(types.AUTH_SIGNOUT);
    });
    it('has the correct payload', () => {
      expect(action.payload).to.be.undefined;
    });
  });

  describe('authError', () => {
    let action;
    beforeEach(() => {
      action = actions.authError('test error');
    });
    it('has the correct type', () => {
      expect(action.type).to.equal(types.AUTH_ERROR);
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
      expect(action.type).to.equal(types.FETCH_MESSAGE);
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
      expect(action.type).to.equal(types.FETCH_PROJECTS);
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
      expect(action.type).to.equal(types.CREATE_PROJECT);
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
      expect(action.type).to.equal(types.FETCH_PROJECT);
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
      expect(action.type).to.equal(types.DELETE_PROJECT);
    });
    it('has the correct payload', () => {
      expect(newActions.length).to.equal(1);
      const action = newActions[0];
      expect(action.payload).to.exist;
      expect(action.payload.data).to.be.eql('');
    });
  });
});