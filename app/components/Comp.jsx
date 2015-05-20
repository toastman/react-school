var React = require('react');

var Comp = React.createClass({
  render: function() {
    return (
      <p>{this.props.txt}</p>
    );
  }
});

module.exports = Comp;