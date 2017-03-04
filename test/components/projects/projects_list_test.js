import { renderComponent , expect } from '../../test_helper';
import { ProjectsList } from '../../../src/components/projects/projects_list';

describe('components/projects/ProjectsList' , () => {
  let data, component;

  beforeEach(() => {
    data = [
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
    ];

    component = renderComponent(ProjectsList, {
      fetchProjects: () => {},
      projects: data,
      isLoading: false,
      error: null });
  });

  it('renders something', () => {
    expect(component).to.exist;
  });

  it('has the correct class', () => {
    expect(component).to.have.class('projects-list');
  });

  it('shows a loading message', () => {
    component = renderComponent(ProjectsList, {
      fetchProjects: () => {},
      projects: [],
      isLoading: true,
      error: null });
    expect(component.find('li.project').length).to.equal(1);
    expect(component).to.contain('Loading...');
  });

  it('shows a error message', () => {
    component = renderComponent(ProjectsList, {
      fetchProjects: () => {},
      projects: [],
      isLoading: false,
      error: 'Error message.' });
    expect(component.find('li.project').length).to.equal(1);
    expect(component).to.contain('Unable to fetch projects. Error message.');
  });

  it('shows a <Link> for each project', () => {
    expect(component.find('a.project').length).to.equal(2);
  });

  it('shows each project that is provided', () => {
    expect(component).to.contain('Test Project 1');
    expect(component).to.contain('Test Project 2');
  });
});
