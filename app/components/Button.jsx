var React = require('react'),
    Comp1 = require('./Comp1.jsx'),
    Comp2 = require('./Comp2.jsx');

var Button = React.createClass({
  incrementCount: function() {
    this.setState({
      count: this.state.count + 1
    });
  },
  getInitialState: function() {
    return {count: 0}
  },
  render: function() {
    return (
      <div>
        <button onClick={this.incrementCount}>Click me</button>
        <Comp1>Component 1: {this.state.count}</Comp1>
        <Comp2>Component 2: {this.state.count}</Comp2>
      </div>
    );
  }
});

module.exports = Button;