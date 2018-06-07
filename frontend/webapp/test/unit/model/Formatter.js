/*global QUnit*/

sap.ui.define([
	"sap/m/Text",
	"de/itsfullofstars/wol/WOL/model/Formatter"
], function (Text, formatter) {
	"use strict";

	QUnit.module("test.unit.model.Formatter");

	function checkReturnValue(assert, bStatus, sExpectedStatus) {
		var sStatus = formatter.status(bStatus);
		assert.strictEqual(sStatus, sExpectedStatus, "Status was correctly calculated");
	}

	function checkReturnText(assert, bStatus, sExpectedStatus) {
		var sStatus = formatter.statusText(bStatus);
		assert.strictEqual(sStatus, sExpectedStatus, "Status Text was correctly calculated");
	}
	
	QUnit.test("Should give back status Success", function (assert) {
		checkReturnValue.call(this, assert, true, "Success");
	});
	
	QUnit.test("Should give back status Error", function (assert) {
		checkReturnValue.call(this, assert, false, "Error");
	});
	
	QUnit.test("Should give back text Running", function (assert) {
		checkReturnText.call(this, assert, true, "Running");
	});

	QUnit.test("Should give back text Down", function (assert) {
		checkReturnText.call(this, assert, false, "Down");
	});

});