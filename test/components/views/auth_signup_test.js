import { renderComponent , expect } from '../../test_helper';
import AuthSignup from '../../../src/components/views/auth_signup';

describe('components/views/AuthSignup' , () => {
  let component;

  beforeEach(() => {
    component = renderComponent(AuthSignup);
  });

  it('renders something', () => {
    expect(component).to.exist;
  });

  it('has the correct class', () => {
    expect(component).to.have.class('auth-signup');
  });

  it('shows a signup-form', () => {
    expect(component.find('.signup-form')).to.exist;
  });
});
