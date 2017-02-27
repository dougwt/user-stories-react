import nock from 'nock';

import { renderComponent , expect } from '../../test_helper';
import ProjectsList from '../../../src/components/projects/projects_list';
import { API_URI_PREFIX } from '../../../src/config';

describe('components/projects/ProjectsList' , () => {
  let data, component;

  beforeEach(() => {
    data = {
      'status': 'success',
      'data': [
        {
          '_id': '588bb00b627569fc58ed44b6',
          '_createdAt': '2017-01-27T20:39:39.225Z',
          '_updatedAt': '2017-01-27T20:39:39.225Z',
          'name': 'Test Project 1',
          'slug': 'test-project-1',
          'roles': [{ 'name': 'developer' }, { 'name': 'tester' }]
        },
        {
          '_id': '588bb00b627569fc58ed44b7',
          '_createdAt': '2017-01-27T20:39:39.225Z',
          '_updatedAt': '2017-01-27T20:39:39.225Z',
          'name': 'Test Project 2',
          'slug': 'test-project-2',
          'roles': [{ 'name': 'developer' }, { 'name': 'tester' }]
        }
      ]
    };
    nock(API_URI_PREFIX)
      .get('/projects')
      .reply(200, data);

    component = renderComponent(ProjectsList);
  });

  it('renders something', () => {
    expect(component).to.exist;
  });

  it('has the correct class', () => {
    expect(component).to.have.class('projects-list');
  });

  it('shows a <li> for each project', () => {
    expect(component.find('li').length).to.equal(2);
  });

  it('shows each project that is provided', () => {
    expect(component).to.contain('Test Project 1');
    expect(component).to.contain('Test Project 2');
  });
});
