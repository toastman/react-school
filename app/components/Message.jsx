var React = require('react'),
    Button = require('./Button.jsx'),
    List = require('./List.jsx');

var dataList = [
  {id: 1, text: "One"},
  {id: 2, text: "Two"},
  {id: 3, text: "Three"}
];

var Message = React.createClass({
  render: function() {
    return (
      <div>
        <h1>Hello, {this.props.name}</h1>
        <Button />
        <List data={dataList} />
      </div>
    );
  }
});

module.exports = Message;