import React, { Component } from 'react'
import { Navbar, Nav, NavItem, MenuItem, NavDropdown } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class HeaderNavbar extends Component {

  renderAuthLinks() {
    if (this.props.authenticated) {
      return <NavItem eventKey={4.1} href="/signout">Sign Out</NavItem>
    } else {
      return [
        <NavItem key={1} eventKey={4.2} href="/signin">Sign In</NavItem>,
        <NavItem key={2} eventKey={4.3} href="/signup">Sign Up</NavItem>
      ]
    }
  }

  render() {
    return (
      <Navbar>
      <Navbar.Header>
        <Navbar.Brand>
          <Link to="/">MyUserStories.com</Link>
        </Navbar.Brand>
      </Navbar.Header>
      <Nav>
        <NavItem eventKey={1} href="#">Home</NavItem>
        <NavItem eventKey={2} href="/feature">Feature</NavItem>
        <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
          <MenuItem eventKey={3.1}>Action</MenuItem>
          <MenuItem eventKey={3.2}>Another action</MenuItem>
          <MenuItem eventKey={3.3}>Something else here</MenuItem>
          <MenuItem divider />
          <MenuItem eventKey={3.4}>Separated link</MenuItem>
        </NavDropdown>
        {this.renderAuthLinks()}
      </Nav>
      </Navbar>
    )
  }
}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated
  }
}

export default connect(mapStateToProps)(HeaderNavbar)
