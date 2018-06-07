/*global QUnit*/

sap.ui.define([
	"de/itsfullofstars/wol/WOL/model/models",
	"sap/ui/thirdparty/sinon",
	"sap/ui/thirdparty/sinon-qunit"
], function (models) {
	"use strict";

	QUnit.module("test.unit.model.BusyDialogModel", {
		afterEach : function () {
			this.oBusyDialogModel.destroy();
		}
	});

	function busyDialogModelTestCase(assert, oObject) {
		// System under test
		this.oBusyDialogModel = models.createBusyDialogModel();

		// Assert
		assert.strictEqual(this.oBusyDialogModel.getData().text, oObject.text, "BusyDialog Model property text is correct");
		assert.strictEqual(this.oBusyDialogModel.getData().seconds, oObject.seconds, "BusyDialog Model property seconds is correct");
	}
	
	QUnit.test("The busy Dialog model should be set correctly", function (assert) {
		var oObject = {};
		oObject.text = "Waiting for server to start: ";
		oObject.seconds = 0;
		busyDialogModelTestCase.call(this, assert, oObject);
	});
	
});