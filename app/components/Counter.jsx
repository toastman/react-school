var React = require('react');

var Counter = React.createClass({
	getInitialState: function() {
		return {clicked: false};
  },
	handleClick: function(event) {
		this.setState({clicked: ++this.state.clicked});
	},
  render: function() {
    return (
    	<div>
	      <button onClick={this.handleClick}>Click me</button>
	      <span>{this.state.clicked}</span>
      </div>
    );
  }
});

module.exports = Counter;
