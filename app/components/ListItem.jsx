var React = require('react');

var List = React.createClass({

  render: function() {
    var listNodes = this.props.data.map(function(item) {
      return(
        <li>{item.id}: {item.text}</li>
      );
    });
    return(
      <ul>{listNodes}</ul>
    )
  }
});

module.exports = List;