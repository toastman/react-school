var React = require('react');

var Counter = React.createClass({
	getInitialState: function() {
		return {clicked: 0};
  },
	handleClick: function(event) {
		this.setState({clicked: ++this.state.clicked});
	},
  render: function() {
  	var text = this.state.clicked || null;
    return (
    	<div>
	      <button onClick={this.handleClick}>Click me</button>
	      <span>{text}</span>
      </div>
    );
  }
});

module.exports = Counter;
