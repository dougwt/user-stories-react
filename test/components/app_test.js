import { renderComponent , expect } from '../test_helper';
import App from '../../src/components/app';

describe('components/App' , () => {
  let component;

  beforeEach(() => {
    component = renderComponent(App);
  });

  it('renders something', () => {
    expect(component).to.exist;
  });

  it('has the correct class', () => {
    expect(component).to.have.class('app');
  });

  it('shows a navbar', () => {
    expect(component.find('.navbar')).to.exist;
  });

  it('shows a .container', () => {
    expect(component.find('.container')).to.exist;
  });
});
