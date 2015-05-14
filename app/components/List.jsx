var React = require('react');

var List = React.createClass({
  render: function() {
    return (
      <ul>
      {this.props.data.map(function(result,i) {
        return <li key={i}>{result.text}</li>
      })}
      </ul>
    );
  }
});

module.exports = List;