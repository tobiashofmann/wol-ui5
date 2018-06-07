sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/Device",
	"de/itsfullofstars/wol/WOL/model/models",
	"de/itsfullofstars/wol/WOL/model/Helper"
], function(UIComponent, Device, models, Helper) {
	"use strict";

	return UIComponent.extend("de.itsfullofstars.wol.WOL.Component", {

		metadata: {
			manifest: "json"
		},

		/**
		 * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
		 * @public
		 * @override
		 */
		init: function() {
			jQuery.sap.log.setLevel(jQuery.sap.log.Level.INFO);
			this._oLogger = jQuery.sap.log.getLogger("de.itsfullofstars.wol.WOL.Component");
			this._oLogger.debug("Something has happened");

			// call the base component's init function
			UIComponent.prototype.init.apply(this, arguments);

			// enable routing
			this.getRouter().initialize();

			// set the device model
			this.setModel(models.createDeviceModel(), "device");
			
			// set busy dialog model
			this.setModel(models.createBusyDialogModel(), "busyDialog");
			
			// set server model
			this.setModel(models.createServerModel(), "server");
			this.getModel("server").attachRequestCompleted(function() {
				Helper.checkAvailability(this.getModel("server"));
			}, this);
			
		},
		
		/**
			 * This method can be called to determine whether the sapUiSizeCompact or sapUiSizeCozy
			 * design mode class should be set, which influences the size appearance of some controls.
			 * @public
			 * @return {string} css class, either 'sapUiSizeCompact' or 'sapUiSizeCozy' - or an empty string if no css class should be set
			 */
			getContentDensityClass : function() {
				if (this._sContentDensityClass === undefined) {
					// check whether FLP has already set the content density class; do nothing in this case
					if (jQuery(document.body).hasClass("sapUiSizeCozy") || jQuery(document.body).hasClass("sapUiSizeCompact")) {
						this._sContentDensityClass = "";
					} else if (!Device.support.touch) { // apply "compact" mode if touch is not supported
						this._sContentDensityClass = "sapUiSizeCompact";
					} else {
						// "cozy" in case of touch support; default for most sap.m controls, but needed for desktop-first controls like sap.ui.table.Table
						this._sContentDensityClass = "sapUiSizeCozy";
					}
				}
				return this._sContentDensityClass;
			}

		
	});
});