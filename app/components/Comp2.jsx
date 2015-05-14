var React = require('react');

var Comp2 = React.createClass({
  render: function() {
    return (
      <p>{this.props.txt}</p>
    );
  }
});

module.exports = Comp2;