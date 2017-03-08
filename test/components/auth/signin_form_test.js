import { renderComponent , expect, store } from '../../test_helper';
import SigninForm from '../../../src/components/auth/signin_form';
import { authError } from '../../../src/actions';

describe('components/auth/SigninForm' , () => {
  let component;

  beforeEach(() => {
    component = renderComponent(SigninForm);
  });

  it('renders something', () => {
    expect(component).to.exist;
  });

  it('has the correct class', () => {
    expect(component).to.have.class('signin-form');
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
