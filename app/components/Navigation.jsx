'use strict';

var React = require('react'),
    // Actions = require('../actions/NavigationActions.js'),
    // Store = require('../stores/NavigationStore.js'),
    Router = require('react-router');

var Route = Router.Route;
var RouteHandler = Router.RouteHandler;

var routes = (
  <Route path="/" handler={Navigation}>
    <Route path="about" handler={About}/>
    <Route path="inbox" handler={Inbox}/>
  </Route>
);

var About = React.createClass({

  render: function() {
    return (
      <h1>About</h1>
    );
  }

});

var Inbox = React.createClass({

  render: function() {
    return (
      <h1>Inbox</h1>
    );
  }

});


var Navigation = React.createClass({

    render: function() {
      return (
        <div>
          <h1>Router test</h1>
          <RouteHandler />
        </div>
      );
    }

});

module.exports = Navigation;

Router.run(routes, Router.HashLocation, function(Root) {
  React.render(<Root />, document.getElementById("content"));
});
