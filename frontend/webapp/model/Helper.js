sap.ui.define(function() {
	"use strict";

	var Helper = {

		startServer: function(mac) {
			jQuery.sap.log.debug("startServer");
			var retVal= "";
			
			var params = {"mac": mac};
			var uriBase = "/wol/wol.php";
			$.ajax({
            	url: uriBase + "?" + $.param(params),
            	type: "POST"
            })
        	.done(function(data) {
        		jQuery.sap.log.debug(data);
        		retVal = data;
        	});
        	return retVal;
		},
		
		checkAvailabilityServer: function(oModel, ip, index) {
			jQuery.sap.log.debug("checkAvailabilityServer");
			var retVal = "";
			
			var params = {"host": ip};
			var uriBase = "/wol/ping.php";
			$.ajax({
            	url: uriBase + "?" + $.param(params),
            	type: "GET"
	        }).done(function(data) {
	    		jQuery.sap.log.debug(data.host);
	    		oModel.oData.servers[index].running = data.up;
	    		oModel.refresh();
	    		retVal = data;
			});
			return retVal;
		},
		
		/**
		 * Check availability of server
		 * Pings all servers included in the server model. For each server, a ping is executed exactly one time.
		 * If the ping returns as status true, the server is considered up.
		 * @param oModel Server model containing information about all servers
		 * @public
		 */
		checkAvailability: function(oModel) {
			jQuery.sap.log.debug("checkAvailability");
			var retVal = [];
			
			var servers = oModel.oData.servers;
			jQuery.sap.log.debug(servers);
			// go through all servers in the model and ping each one
			for (var index in servers) {
				var params = {
					"host": servers[index].ip
				};
				var uriBase = "/wol/ping.php";
				// ping servers, calls remote service
				$.ajax({
	            	url: uriBase + "?" + $.param(params),
	            	type: "GET"
	            }).done(function(data) {
	        		jQuery.sap.log.debug(data.host);
	        		retVal.push(data);
	        		
	        		for (var i in servers) {
	        			if (servers[i].ip === data.host) {
	        				jQuery.sap.log.debug("index: " + i + " " + servers[i].ip + " " + data.up);
	        				oModel.oData.servers[i].running = data.up;
	        				oModel.refresh();
	        			}
	        		}
				});
			}
			return retVal;
		}
	};
	
	return Helper;

}, /* bExport= */ true);