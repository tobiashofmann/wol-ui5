sap.ui.define([
	"de/itsfullofstars/wol/WOL/controller/BaseController",
	"sap/ui/core/routing/History",
	"de/itsfullofstars/wol/WOL/model/Helper"
], function(BaseController, History, Helper) {
	"use strict";

	var _timeout;
	var _pingServer;
	var _seconds = 0;

	return BaseController.extend("de.itsfullofstars.wol.WOL.controller.Details", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf de.itsfullofstars.wol.WOL.view.Details
		 */
		onInit: function() {
			this._oLogger = jQuery.sap.log.getLogger("de.itsfullofstars.wol.WOL.controller.Details");
			this._oLogger.debug("onInit");

			this.getRouter().getRoute("Details").attachPatternMatched(this._onObjectMatched, this);
			// apply content density mode to root view
			this.getView().addStyleClass(this.getOwnerComponent().getContentDensityClass());
		},

		/**
		 * Called by navigation button of page.
		 * Navigate back in historiy or hierarchy.
		 */
		onNavBack: function () {
			this._oLogger.debug("onNavBack");
			
			var oHistory = History.getInstance();
			var sPreviousHash = oHistory.getPreviousHash();

			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				oRouter.navTo("Home", true);
			}
		},
		
		/**
		 * Binds the view to the object path and expands the aggregated line items.
		 * @function
		 * @param {sap.ui.base.Event} oEvent pattern match event in route 'object'
		 * @private
		 */
		_onObjectMatched : function (oEvent) {
			this._oLogger.debug("_onObjectMatched");
			
			var sId =  oEvent.getParameter("arguments").id;
			var sPath = "/servers/" + sId;
			var oBindingContext = this.getView().getModel("server").createBindingContext(sPath);
			
			this.getView().setBindingContext(oBindingContext, "server");
		},
		
		/**
		 * Called by refresh button in toolbar.
		 * @param {sap.ui.base.Event} oEvent 
		 * @public
		 */
		handleRefresh: function(oEvent) {
			this._oLogger.debug("handleRefresh");
			
			var sPath = this.getView().getBindingContext("server").sPath;
			var oServer = this.getView().getModel("server").getObject(sPath);
			
			Helper.checkAvailabilityServer(this.getView().getModel("server"), oServer.ip, sPath.split("/")[2]);
		},
		
		/**
		 * Called by start server button
		 * Invokes the AJAX call to the backend service to issue the WOL package.
		 * Uses Helper class to call the remote service. Extracts from the page the current mac address of the server
		 * @param {sap.ui.base.Event} oEvent 
		 * @public
		 */
		handleStartServer: function(oEvent) {
			this._oLogger.debug("handleStartServer");
			
			var sPath = this.getView().getBindingContext("server").sPath;
			var oServer = this.getView().getModel("server").getObject(sPath);
			Helper.startServer(oServer.mac);
			
			this._openBusyDialog();
		},
		
		/**
		 * Close busy dialog.
		 * 
		 * Make sure that the intervall call is also terminated. If not, jQuery would continue calling the function 
		 * _showBusyDialogMessage every minute.
		 */
		onBusyDialogClosed: function (oEvent) {
			this._oLogger.debug("onBusyDialogClosed");
			jQuery.sap.clearIntervalCall(_timeout);
		},
		
		/**
		 * Closes the busy dialog
		 * Called by {onBusyDialogClosed}
		 * @private
		 */
		_openBusyDialog: function (oEvent) {
			this._oLogger.debug("_onOpenDialog");

			if (!this._dialog) {
				this._dialog = sap.ui.xmlfragment("de.itsfullofstars.wol.WOL.view.fragments.BusyDialog", this);
				this.getView().addDependent(this._dialog);
			}
			var oBusyDialogModel = this.getView().getModel("busyDialog");
			
			// open dialog
			jQuery.sap.syncStyleClass(this.getView().addStyleClass(this.getOwnerComponent().getContentDensityClass()), this.getView(), this._dialog);
			this._dialog.open();

			_timeout = jQuery.sap.intervalCall(1000, this, this._showBusyDialogMessage);
			_pingServer = jQuery.sap.intervalCall(3000, this, this._pingServer);
		},
		
		_pingServer: function() {
			this._oLogger.debug("_pingServer");
			this.handleRefresh();
		},
		
		/**
		 * 
		 * @private
		 */
		_showBusyDialogMessage: function() {
			this._oLogger.debug("_showBusyDialogMessage");

			var oBusyDialogModel = this.getView().getModel("busyDialog");
			oBusyDialogModel.oData.seconds = ++_seconds;
			oBusyDialogModel.refresh();
			
			var sPath = this.getView().getBindingContext("server").sPath;
			var oServer = this.getView().getModel("server").getObject(sPath);
			this._oLogger.debug("Server running: " + oServer.running);
			
			if (oServer.running || _seconds === 60) {
				this._oLogger.debug("stopping");
				jQuery.sap.clearIntervalCall(_timeout);
				jQuery.sap.clearIntervalCall(_pingServer);
				this._dialog.close();
			}
		}
	});

});