import { renderComponent , expect, store } from '../../test_helper';
import AddRoleForm from '../../../src/components/projects/add_role_form';
import { createRoleFailure } from '../../../src/actions';

describe('components/projects/AddRoleForm' , () => {
  let component;

  beforeEach(() => {
    component = renderComponent(AddRoleForm);
  });

  it('renders something', () => {
    expect(component).to.exist;
  });

  it('has the correct class', () => {
    expect(component).to.have.class('add-role-form');
  });

  it('shows a form', () => {
    expect(component.prop('tagName')).to.equal('FORM');
  });

  it('shows a name field', () => {
    expect(component.find('input[name=name]')).to.exist;
  });

  it('shows a submit button', () => {
    expect(component.find('button[type=submit]')).to.exist;
  });

  it('shows a error message alert', () => {
    const error = {
      response: {
        data: {
          message: 'Test error',
        }
      }
    };
    const action = createRoleFailure(error);
    store.dispatch(action);
    expect(component).to.contain('Test error');
    expect(component.find('.error')).to.exist;
  });
});
