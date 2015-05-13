// We just require all we need, and it can
// be js/css/html almost everything
var React = require('react');
var MessageBlock = require('./components/MessageBlock.jsx');

React.render(<MessageBlock />, document.querySelector('#container'));
