/*global QUnit*/

sap.ui.define([
	"de/itsfullofstars/wol/WOL/model/Helper",
	"sap/ui/model/json/JSONModel",
	"sap/ui/thirdparty/sinon",
	"sap/ui/thirdparty/sinon-qunit"
], function (Helper, JSONModel) {
	"use strict";

	//QUnit.module("Helper - send WOL");
	
	var server;
	
	QUnit.module("test.unit.model.Helper", {
	    beforeEach: function () {},
	    afterEach: function () {}
	});

	function startServerTest(assert, mac, bExpectedStatus) {
	    
	    var done = assert.async();
	    
		var testData = { success: true, mac: 'aa' };
        this.server = sinon.fakeServer.create();
        this.server.respondWith("POST", "/wol/wol.php?mac=aa", [200, { "Content-Type": "application/json" }, JSON.stringify(testData)]);
        this.server.respondImmediately = true;
        
		var sStatus = Helper.startServer(mac);
		assert.strictEqual(sStatus.success, bExpectedStatus, "WOL POST was correctly send");
		
		this.server.restore();
		
		done();
	}

	QUnit.test("Should give back success true", function (assert) {
		assert.expect(1);
		startServerTest.call(this, assert, "aa", true);
	});
	
	//
	// Test ping single server
	//
	function pingServerTest(assert, oModel, ip, index, bExpectedStatus) {
	    
	    var done = assert.async();
	    
        this.server = sinon.fakeServer.create();
	    this.server.respondImmediately = true;
	    var testData = { up: true, host: "192.168.0.164" };
        this.server.respondWith("GET", "/wol/ping.php?host=192.168.0.164", [200, { "Content-Type": "application/json" }, JSON.stringify(testData)]);
    
		var sStatus = Helper.checkAvailabilityServer(oModel, ip, index);
		//this.server.respond();
		console.log(sStatus);
		assert.strictEqual(sStatus.up, bExpectedStatus, "Ping was successfull");
		
		this.server.restore();
		
		done();
	}

	QUnit.test("Should check up status of single server", function (assert) {
		assert.expect(1);
		
	    var done = assert.async();
	      
		var oModel = new JSONModel("base/model/servers.json");
		oModel.attachRequestCompleted(function(){
			pingServerTest.call(this, assert, oModel, "192.168.0.164", 0, true);
			done();
		});
	});

	//
	// Test ping all servers in model
	//
	function pingAllServerTest(assert, oModel, bExpectedStatus) {
	    
	    var done = assert.async();

		var testData = { up: true, host: "192.168.0.164" };
        
        this.server = sinon.fakeServer.create();
	    this.server.respondImmediately = true;
        this.server.respondWith("GET", /\/wol\/ping.php.*/, [200, { "Content-Type": "application/json" }, JSON.stringify(testData)]);
        
		var sStatus = Helper.checkAvailability(oModel);
		for (var index in sStatus) {
			assert.strictEqual(sStatus[index].up, bExpectedStatus, "Ping was successfull");
		}
		
		this.server.restore();
		
		done();
	}

	QUnit.test("Should check up status of all servers", function (assert) {
	    // 2 as we have 2 faked backend services
		assert.expect(2);
		
	    var done = assert.async();

		var oModel = new JSONModel("base/model/servers.json");
		oModel.attachRequestCompleted(function(){
			pingAllServerTest.call(this, assert, oModel, true);
			done();
		});
		
	});
	

});