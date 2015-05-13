// We just require all we need, and it can
// be js/css/html almost everything
var React = require('react');
var Descr = require('./components/Descr.jsx');

var data = {author: "Andrii", text: "This is my first react component"};

React.render(<Descr data={data} />, document.querySelector('#container'));
