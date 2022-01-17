import React , { Component } from 'react';
import Panel from "./component/Panel";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { classes } = this.props;

    return (
      <div className="App">
        <Panel />
      </div>
    );
  }
}

export default App;