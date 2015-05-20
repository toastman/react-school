var React = require('react');

var List = React.createClass({
  render: function() {

    var elemList = this.props.data.map(function(result,i) {
      return <li key={i}>{result.text}</li>
    });

    return (
      <ul>{elemList}</ul>
    );
  }
});

module.exports = List;