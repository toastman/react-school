'use strict';

var React = require('react');
var Actions = require("../actions/ClickActions.js");
var Store = require("../stores/ClickStore.js");

function getStateFromStores() {
  return {
    "clicks": Store.getAllClicks()
  };
}

module.exports = React.createClass({
  getInitialState: function () {
    return getStateFromStores();
  },

  componentDidMount: function() {
    Store.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    Store.addChangeListener(this._onChange);
  },

  _onChange: function() {
    this.setState(getStateFromStores());
  },

  _handleClick: function(){
    console.log("tratata ====");
    Actions.receiveClicks({"someData": 1});
  },

  render: function() {
    return (
      <div>
        <h1>App componet</h1>
        <button onClick={this._handleClick}>Fire click</button>
        <h1>How many times user clicks: {this.state.clicks}</h1>
      </div>
    );
  }

});
