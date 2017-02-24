import { renderComponent , expect } from '../../test_helper';
import SigninForm from '../../../src/components/auth/signin_form';

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

  xit('shows a error message alert', () => {
    expect(component.find('.alert')).to.exist;
  });
});
