var React = require('react');

var MessageBlock = React.createClass({

  render: function() {
    return (
    	<div>
	      <p>{this.props.text}</p>
      </div>
    );
  }
});

module.exports = MessageBlock;
