var React = require('react'),
    Button = require('./Button.jsx');

var Message = React.createClass({
  render: function() {
    return (
      <div>
        <h1>Hello, {this.props.name}</h1>
        <Button />
      </div>
    );
  }
});

module.exports = Message;