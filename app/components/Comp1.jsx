var React = require('react');

var Comp1 = React.createClass({
  render: function() {
    return (
      <p>{this.props.txt}</p>
    );
  }
});

module.exports = Comp1;