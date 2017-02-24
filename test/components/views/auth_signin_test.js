import { renderComponent , expect } from '../../test_helper';
import AuthSignin from '../../../src/components/views/auth_signin';

describe('components/views/AuthSignin' , () => {
  let component;

  beforeEach(() => {
    component = renderComponent(AuthSignin);
  });

  it('renders something', () => {
    expect(component).to.exist;
  });

  it('has the correct class', () => {
    expect(component).to.have.class('auth-signin');
  });

  it('shows a signin-form', () => {
    expect(component.find('.signin-form')).to.exist;
  });
});
