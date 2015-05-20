var React = require('react'),
    Navigation = require('./Navigation.jsx');

var App = React.createClass({
  render: function() {
    return (
      <div>
        <Navigation />
      </div>
    );
  }
});

module.exports = App;