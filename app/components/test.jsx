var React = require('react');

var MessageBlock = React.createClass({

  render: function() {
    return (
    	<div className="messageBlock">
	      <h1>Hello, {this.props.data.author} !!!</h1>
	      <MessageBlock2 text={this.props.data.text} />
      </div>
    );
  }

});

module.exports = MessageBlock;
// or you can write just
// module.exports = React.createClass({ ...

// instead of declaring variable var MessageBlock ...
