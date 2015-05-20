var AppDispatcher = require('../AppDispatcher.js');
var AppConstants = require('../Constants.js');

var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var ActionTypes = AppConstants.ActionTypes;

var CHANGE_EVENT = 'change';

var _allClicks = 0;

var Store = assign({}, EventEmitter.prototype, {

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  getAllClicks: function() {
    return _allClicks;
  }

});

Store.dispatchToken = AppDispatcher.register(function(payload) {

  var action = payload.action;

  switch(action.type) {

    case ActionTypes.CLICK:
      _allClicks++;

      Store.emitChange();
      break;

    default:
    //
  }

});

module.exports = Store;