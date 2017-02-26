import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import jsdom from 'jsdom';
import _$ from 'jquery';
import chai, { expect } from 'chai';
import chaiJquery from 'chai-jquery';

import reducers from '../src/reducers'

// Set up testing environment to run like a browser in the command line
global.document = jsdom.jsdom('<!doctype html><html><body></body></html>');
global.window = document.defaultView;
global.localStorage = document.localStorage;
if (!global.localStorage) {
  global.localStorage = {
    getItem(token) { return token; },
    removeItem() { return '{}'; },
    setItem() {}
  };
}
// global.navigator = { userAgent: 'node.js' };  // Source: http://stackoverflow.com/questions/37078882/mocha-chai-throws-navigator-not-defined-due-to-react-router-component/37084875#37084875
const $ = _$(global.window);

// Build renderComponent helper that should render a given react class
function renderComponent(ComponentClass, props, state) {
  const componentInstance = TestUtils.renderIntoDocument(
    <Provider store={createStore(reducers, state)}>
      <ComponentClass {...props} />
    </Provider>
  );

  return $(ReactDOM.findDOMNode(componentInstance)); // produces HTML
}

// Build helper for simulating events
$.fn.simulate = function(eventName, value) {
  if (value) {
    this.val(value);
  }
  TestUtils.Simulate[eventName](this[0]);
}

// Set up chai-jquery
chaiJquery(chai, chai.util, $);

export { renderComponent, expect };
