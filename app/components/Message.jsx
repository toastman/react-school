var React = require('gulp-react');

var Message = React.createClass({
  render: function() {
    return (
      <h1>some message</h1>
    );
  }
});

module.exports = Message;