sap.ui.define([
	"sap/ui/model/json/JSONModel",
	"sap/ui/Device"
], function(JSONModel, Device) {
	"use strict";

	return {

		createDeviceModel: function() {
			var oModel = new JSONModel(Device);
			oModel.setDefaultBindingMode("OneWay");
			return oModel;
		},
		
		createBusyDialogModel: function() {
			var oText = {};
			oText.text = "Waiting for server to start: ";
			oText.seconds = 0;	
			
			var oModel = new JSONModel(oText);
			oModel.setDefaultBindingMode("OneWay");
			return oModel;
		},
		
		createServerModel: function() {
			var oModel = new JSONModel("./model/servers.json");
			oModel.setDefaultBindingMode("OneWay");
			return oModel;
		}

	};
});