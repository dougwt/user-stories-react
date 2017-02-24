import React, { Component } from 'react';
import { connect } from 'react-redux';
import { authSignout } from '../../actions'

class Signout extends Component {
  componentWillMount() {
    this.props.authSignout();
  }

  render() {
    return <div className="auth-signout">Sorry to see you go...</div>;
  }
}

export default connect(null, { authSignout })(Signout);
