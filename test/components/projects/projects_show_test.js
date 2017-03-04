import { renderComponent , expect } from '../../test_helper';
import { ProjectsShow } from '../../../src/components/projects/projects_show';

describe('components/projects/ProjectsShow' , () => {
  let data, component;

  beforeEach(() => {
    data = {
      '_id': '588bb00b627569fc58ed44b6',
      '_createdAt': '2017-01-27T20:39:39.225Z',
      '_updatedAt': '2017-01-27T20:39:39.225Z',
      'name': 'Test Project 1',
      'slug': 'test-project-1',
      'roles': [{ 'name': 'Developer' }, { 'name': 'Tester' }]
    };

    component = renderComponent(ProjectsShow, {
      fetchProject: () => {},
      project: data,
      params: { id: '588bb00b627569fc58ed44b6' },
      isLoading: false,
      error: null
    });
  });

  it('renders something', () => {
    expect(component).to.exist;
  });

  it('has the correct class', () => {
    expect(component).to.have.class('projects-detail');
  });

  it('shows a project loading message', () => {
    component = renderComponent(ProjectsShow, {
      fetchProject: () => {},
      project: null,
      params: { id: '588bb00b627569fc58ed44b6' },
      isLoading: true,
      error: null
    });
    expect(component.find('li').length).to.equal(0);
    expect(component).to.contain('Loading 588bb00b627569fc58ed44b6...');
  });

  it('shows a project error message', () => {
    component = renderComponent(ProjectsShow, {
      fetchProject: () => {},
      project: null,
      params: { id: '588bb00b627569fc58ed44b6' },
      isLoading: false,
      error: 'Error message.'
    });
    expect(component.find('li').length).to.equal(0);
    expect(component).to.contain('Unable to fetch project. Error message.');
  });

  it('shows a <li> for each role', () => {
    expect(component.find('li.role').length).to.equal(2);
  });

  it('shows each role that is provided', () => {
    expect(component).to.contain('Developer');
    expect(component).to.contain('Tester');
  });

  it('shows a empty roles message', () => {
    data.roles = [];
    component = renderComponent(ProjectsShow, {
      fetchProject: () => {},
      project: data,
      params: { id: '588bb00b627569fc58ed44b6' },
      isLoading: false,
      error: null
    });
    expect(component.find('li.role').length).to.equal(1);
    expect(component).to.contain('This project currently has no roles.');
  });

  it('shows a <AddRoleForm/>', () => {
    expect(component.find('.add-role-form')).to.exist;
  });

  xit('shows a <li> for each story', () => {

  });

  xit('shows each story that is provided', () => {

  });

  xit('shows a empty stories message', () => {

  });
});
