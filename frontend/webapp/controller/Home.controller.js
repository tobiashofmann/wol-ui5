sap.ui.define([
	"de/itsfullofstars/wol/WOL/controller/BaseController",
	"sap/ui/model/Filter",
	"de/itsfullofstars/wol/WOL/model/Formatter",
	"de/itsfullofstars/wol/WOL/model/Helper"
], function(BaseController, Filter, Formatter, Helper) {
	"use strict";

	return BaseController.extend("de.itsfullofstars.wol.WOL.controller.Home", {

		onInit : function () {
			this._oLogger = jQuery.sap.log.getLogger("de.itsfullofstars.wol.WOL.controller.Home");
			this._oLogger.debug("onInit");

			// apply content density mode to root view
			this.getView().addStyleClass(this.getOwnerComponent().getContentDensityClass());
		},
		
		handleShowDetails: function(oEvent) {
			this._oLogger.debug("handleShowDetails");
			
			var sPath = oEvent.getSource().getBindingContextPath();
			var index = sPath.split("/")[2];
			this.getRouter().navTo("Details", {
				id: index
			});
		},
			
		onSearch : function (oEvt) {
			this._oLogger.debug("onSearch");
			
			// add filter for search
			var aFilters = [];
			var sQuery = oEvt.getSource().getValue();
			
			if (sQuery && sQuery.length > 0) {
				
				var filter = new Filter({
					 filters: [
				      new Filter("ip", sap.ui.model.FilterOperator.Contains, sQuery),
				      new Filter("name", sap.ui.model.FilterOperator.Contains, sQuery)
				    ],
				    and: false
				});
				aFilters.push(filter);
			}

			// update list binding
			var list = this.byId("serverList");
			var binding = list.getBinding("items");
			binding.filter(aFilters, "Application");
		},
		
		handleRefresh: function(oEvt) {
			this._oLogger.debug("handleRefresh");
			
			var oModel = this.getView().getModel("server");
			Helper.checkAvailability(oModel);
		}
	});
});