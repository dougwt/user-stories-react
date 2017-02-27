import { renderComponent , expect } from '../../test_helper';
import SignupForm from '../../../src/components/auth/signup_form';
import { authError } from '../../../src/actions';
import { store } from '../../test_helper';

describe('components/auth/SignupForm' , () => {
  let component;

  beforeEach(() => {
    component = renderComponent(SignupForm);
  });

  it('renders something', () => {
    expect(component).to.exist;
  });

  it('has the correct class', () => {
    expect(component).to.have.class('signup-form');
  });

  it('shows a form', () => {
    expect(component.find('form')).to.exist;
  });

  it('shows a email field', () => {
    expect(component.find('input[name=email]')).to.exist;
  });

  it('shows a password field', () => {
    expect(component.find('input[name=password]')).to.exist;
  });

  it('shows a passwordConfirm field', () => {
    expect(component.find('input[name=passwordConfirm]')).to.exist;
  });

  it('shows a name field', () => {
    expect(component.find('input[name=name]')).to.exist;
  });

  it('shows a submit button', () => {
    expect(component.find('button[type=submit]')).to.exist;
  });

  it('shows a error message alert', () => {
    const action = authError('Test error');
    store.dispatch(action);
    expect(component).to.contain('Test error');
    expect(component.find('.alert')).to.exist;
  });
});
