var React = require('react');

var List = React.createClass({
  render: function() {
    return (
      <ul>
      {this.props.data.map(function(result) {
        return <li key={result.id}>{result.text}</li>
      })}
      </ul>
    );
  }
});

module.exports = List;