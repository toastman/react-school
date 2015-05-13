var React = require('react');

var MessageBlock = React.createClass({

  render: function() {
    return (
      <h1>This is my first react component</h1>
    );
  }

});

module.exports = MessageBlock;
// or you can write just
// module.exports = React.createClass({ ...

// instead of declaring variable var MessageBlock ...
