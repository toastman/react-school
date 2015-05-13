var React = require('react');

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
        <p>{this.state.count}</p>
        <button onClick={this.incrementCount}>Click me</button>
      </div>
    );
  }
});

module.exports = Button;