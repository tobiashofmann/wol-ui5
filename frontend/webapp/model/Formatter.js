sap.ui.define(function() {
	"use strict";

	var Formatter = {

		status :  function (bStatus) {
			if (bStatus) {
				return "Success";
			} else {
				return "Error";
			} 
		},
		
		statusText: function (bStatus) {
			if (bStatus) {
				return "Running";
			} else {
				return "Down";
			} 
		}
	};

	return Formatter;

}, /* bExport= */ true);