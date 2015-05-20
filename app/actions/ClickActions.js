var AppDispatcher = require('../AppDispatcher.js');
var AppConstants = require('../constants.js');
var ActionTypes = AppConstants.ActionTypes;

module.exports = {
  receiveClicks: function(data) {
    AppDispatcher.handleViewAction({
      type: ActionTypes.CLICK,
      data: data
    });
  }
};
