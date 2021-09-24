
/* eslint-disable no-undef */
const express = require( "express" );
const router = express.Router();

const apiController = require( "./modules/api/api.controller");

module.exports = function ( app ) {
	router.get( "/", apiController.index );
	app.use( "/", router );
};
