﻿const router = require('express').Router();
const _ = require('lodash');
const Q = require('q');
const errorHelper = require('../lib/errorHelper');
const truckService = require('../services/truckService');

// Routers
router.get('/list', Q.async(function* (req, res, next) {	
	try
	{
		let query = _.pick(req.query, ['PageCurrent', 'PageSize']);
		let trucks = yield truckService.getList(query);
		res.status(200).json(trucks);
		next();
	}
	catch(err){
		res.status(500).json(err);
		next(err);
	}
}));

router.get('/item', Q.async(function* (req, res, next) {
	try
	{
		let query = _.pick(req.query, ['TruckKey']);	
		let truck = yield truckService.getItem(query.TruckKey);
		res.status(200).json(truck);
	}
	catch(err){
		res.status(500).json(err);
		next(err);
	}
}));

router.post('/update', Q.async(function* (req, res, next) {
	try
	{
		let truck = _.pick(req.body, ['TruckKey', 'TruckName', 'TruckNumber', 'Description']);
		if(!truck) throw errorHelper.ERROR_INVALID_TRUCK;

		let result;
		if(truck.TruckKey){
			let data = yield truckService.update(truck);
			if(data.rowsAffected.length > 0) result = true;
			else result = false;
		}
		else {
			let data = yield truckService.create(truck);
			if(data.rowsAffected.length > 0) result = true;
			else result = false;
		}
		res.status(200).json(result);
	}
	catch(err){
		res.status(500).json(err);
		next(err);
	}	
}));

module.exports = router;