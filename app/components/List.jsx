var React = require('react');

var List = React.createClass({
  render: function() {
  	var dataList = [
	  	{'id': 1, 'text':'One'},
	  	{'id': 2, 'text':'Two'},
	  	{'id': 3, 'text':'Three'}
  	];
    return (
    	<ul>
    		{dataList.map(function(res) {
	        return <li>{res.text}</li>
	      })}
      </ul>
    );
  }
});

module.exports = List;
