var React = require('react');
var MessageBlock = require('./MessageBlock.jsx');

var Descr = React.createClass({
	  render: function() {
	    return (
	    	<div>
		      <h1>Hello, {this.props.data.author}</h1>
		      <MessageBlock text={this.props.data.text}/>
	      </div>
	    );
	  }
});

module.exports = Descr;