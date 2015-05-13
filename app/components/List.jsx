var React = require('react'),
    ListItem = require('./ListItem.jsx');

var List = React.createClass({
  render: function() {
    return (
      <ListItem data={this.props.data} />
    );
  }
});

module.exports = List;