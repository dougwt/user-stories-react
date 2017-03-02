import React, { Component } from 'react';

import Navbar from './navbar';

class App extends Component {
  static propTypes = {
    children: React.PropTypes.array
  }

  render() {
    return (
      <div className="app">
        <Navbar />

        <div className="container">
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default App;
