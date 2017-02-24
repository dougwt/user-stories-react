import { renderComponent , expect } from '../../test_helper';
import AuthSignout from '../../../src/components/views/auth_signout';

describe('components/views/AuthSignout' , () => {
  let component;

  beforeEach(() => {
    component = renderComponent(AuthSignout);
  });

  it('renders something', () => {
    expect(component).to.exist;
  });

  it('has the correct class', () => {
    expect(component).to.have.class('auth-signout');
  });

  it('shows a signout message', () => {
    expect(component).to.contain('Sorry to see you go...');
  });
});
