/*global QUnit*/

sap.ui.define([
	"de/itsfullofstars/wol/WOL/model/models",
	"sap/ui/model/json/JSONModel",
	"sap/ui/thirdparty/sinon",
	"sap/ui/thirdparty/sinon-qunit"
], function (models, JSONModel) {
	"use strict";

	QUnit.module("test.unit.model.ServerModel", {
		afterEach : function () {}
	});

	function busyServerModelTestCase(assert, oModel) {
		
		var done = assert.async();
		
		// System under test
		this.oServerModel = models.createServerModel();
		var that = this;
		this.oServerModel.attachRequestCompleted(function(oEvent){
    		// assert that model contains servers array
    		assert.ok(Array.isArray(that.oServerModel.getData().servers));
    		// assert that model equals reference model
    		assert.deepEqual(that.oServerModel.getData(), oModel.getData(), "Server model loaded successfully from server");
    		
    		done();	
		});
	}
	
	QUnit.test('load ServerModel from server', function (assert) {
		assert.expect(2);
		
		var done = assert.async();
		
		var oModel = new JSONModel("base/model/servers.json");
		oModel.attachRequestCompleted(function(){
			busyServerModelTestCase.call(this, assert, oModel);
			done();
		});
		
	});

});