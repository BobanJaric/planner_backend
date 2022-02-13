const mongoose = require('mongoose');

const HttpError = require('../models/http-errors');
const { validationResult } = require('express-validator');

const User = require('../models/user');
const Aircraft = require('../models/aircraft');

const createAircraft = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new HttpError('Invalid inputs please check your data!!!!!!!!!!!!!', 422));
    }

    const { aircraft, callsign, type, mtow, totalTime, nextMaintenance } = req.body;

    const createdAircraft = new Aircraft({
        aircraft,
        callsign,
        type, 
        mtow,
        totalTime,
        nextMaintenance,
        startMaintenance,
        endMaintenance,
        creator: '5fe46d14371ffc10f04ffec5'
    });

    let user;
    try {
        user = await User.findById('5fe46d14371ffc10f04ffec5');
    } catch (err) {
        const error = new HttpError('Creating a/c failed', 500);
        return next(error);
    }

    if (!user) {
        const error = new HttpError('Could not find user for provided Id', 404);
        return next(error);
    }

    try {

        await createdAircraft.save();


    } catch (err) {
        const error = new HttpError('Creating a/c  failed!!!', 500);
        return next(error);
    }

    res.status(201).json({ aircraft: createdAircraft })

}

const getAircraft = async (req, res, next) => {

    let aircrafts;
    try {
        aircrafts = await Aircraft.find({});
    } catch (err) {
        const error = new HttpError('Something went wrong!', 500);
        return next(error);
    }


    if (!aircrafts) {
        const error = new HttpError('Could not find broker!!!', 404);
        return next(error);// da bi kod stao ako se pojavi greska
    }

    res.json({ aircrafts: aircrafts });
}

const getAircraftById = async (req, res, next) => {

    const aircraftId = req.params.aid;

    let aircraft;
    try {
        aircraft = await Aircraft.findById(aircraftId);
    } catch (err) {
        const error = new HttpError('Something went wrong!', 500);
        return next(error);
    }

    if (!aircraft) {
        const error = new HttpError('Could not find a/c for id!!!', 404);
        return next(error);// da bi kod stao ako se pojavi greska
    }
    res.json({ aircraft: aircraft.toObject({ getters: true }) });

};

const updateAircraft  = async (req, res, next) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return next(new HttpError('Invalid inputs please check your data', 422));
    }
    const { aircraft, callsign, type, mtow, totalTime, nextMaintenance,startMaintenance,endMaintenance, creator } = req.body;

    const aircraftId = req.params.aid;

    let aircraftUpdate;
    try {
        aircraftUpdate = await Aircraft.findById(aircraftId);
    } catch (err) {
        const error = new HttpError('Something went wrong!', 500);
        return next(error);
    }

    aircraftUpdate.aircraft = aircraft,
        aircraftUpdate.callsign = callsign,
        aircraftUpdate.type = type,
        aircraftUpdate.mtow = mtow,
        aircraftUpdate.totalTime = totalTime,
        aircraftUpdate.nextMaintenance = nextMaintenance,
        aircraftUpdate.startMaintenance = startMaintenance,
        aircraftUpdate.endMaintenance = endMaintenance

    try {
        await aircraftUpdate.save();
    } catch (err) {
        const error = new HttpError('Something went wrong!', 500);
        return next(error);
    }

    res.status(200).json({ aircraftUpdate: aircraftUpdate.toObject({ getters: true }) });
};
exports.createAircraft = createAircraft;
exports.getAircraft = getAircraft;
exports.getAircraftById = getAircraftById;
exports.updateAircraft = updateAircraft;