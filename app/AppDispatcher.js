'use strict';

var Dispatcher = require('flux').Dispatcher;
var assign = require('object-assign');

var AppConstants = require('./Constants.js');
var PayloadSources = AppConstants.PayloadSources;

var AppDispather = assign(new Dispatcher(), {

  handleServerAction: function(action) {
    var payload = {
      source: PayloadSources.SERVER_ACTION,
      action: action
    };

    this.dispatch(payload);
  },

  handleViewAction: function(action) {
    var payload = {
      source: PayloadSources.VIEW_ACTION,
      action: action
    };

    this.dispatch(payload);
  }

});

module.exports = AppDispather;
