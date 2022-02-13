const mongoose = require('mongoose');

const HttpError = require('../models/http-errors');
const { validationResult } = require('express-validator');

const User = require('../models/user');
const Caa = require('../models/caa');

const createCaa = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new HttpError('Invalid inputs please check your data!!!!!!!!!!!!!', 422));
    }

    const { country, permit, contact, workingHours, leadingTime, validity, note, api, covid } = req.body;

    const createdCaa = new Caa({
        country, permit, contact, workingHours, leadingTime, validity, note, api, covid,
        creator: '5fe46d14371ffc10f04ffec5'
    });

    let user;
    try {
        user = await User.findById('5fe46d14371ffc10f04ffec5');
    } catch (err) {
        const error = new HttpError('Creating caa failed', 500);
        return next(error);
    }

    if (!user) {
        const error = new HttpError('Could not find user for provided Id', 404);
        return next(error);
    }

    try {
        await createdCaa.save();
    } catch (err) {
        console.log(err);
        const error = new HttpError('Creating caa  failed!!!', 500);
        return next(error);
    }

    res.status(201).json({ caa: createdCaa })

}

const getCaa = async (req, res, next) => {

    let caas;
    try {
        caas = await Caa.find({});
    } catch (err) {
        const error = new HttpError('Something went wrong!', 500);
        return next(error);
    }


    if (!caas) {
        const error = new HttpError('Could not find broker!!!', 404);
        return next(error);// da bi kod stao ako se pojavi greska
    }
    res.json({ caas: caas });
}

const getCaaById = async (req, res, next) => {

    const caaId = req.params.cid;

    let caa;
    try {
        caa = await Caa.findById(caaId);
    } catch (err) {
        const error = new HttpError('Something went wrong!', 500);
        return next(error);
    }

    if (!caa) {
        const error = new HttpError('Could not find a/c for id!!!', 404);
        return next(error);// da bi kod stao ako se pojavi greska
    }
    res.json({ caa: caa.toObject({ getters: true }) });

};

const getCaaByName = async (req, res, next) => {

    const caaName = req.params.cname;

    let caa;
    try {
        caa = await Caa.find({ country: caaName });
    } catch (err) {
        const error = new HttpError('Something went wrong!', 500);
        return next(error);
    }

    if (!caa) {
        const error = new HttpError('Could not find a/c for id!!!', 404);
        return next(error);// da bi kod stao ako se pojavi greska
    }

    res.json({ caa: caa });

};

const updateCaa = async (req, res, next) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return next(new HttpError('Invalid inputs please check your data', 422));
    }
    const { country, permit, contact, workingHours, leadingTime, validity, note, api, covid, creator } = req.body;

    const caaId = req.params.cid;

    let caaUpdate;
    try {
        caaUpdate = await Caa.findById(caaId);
    } catch (err) {
        const error = new HttpError('Something went wrong!', 500);
        return next(error);
    }

        caaUpdate.country = country,
        caaUpdate.permit = permit,
        caaUpdate.contact = contact,
        caaUpdate.workingHours = workingHours,
        caaUpdate.leadingTime = leadingTime,
        caaUpdate.validity = validity,
        caaUpdate.note = note,
        caaUpdate.api = api
        caaUpdate.covid = covid
        caaUpdate.creator = creator


    try {
        await caaUpdate.save();
    } catch (err) {
        const error = new HttpError('Something went wrong!', 500);
        return next(error);
    }

    res.status(200).json({ caaUpdate: caaUpdate.toObject({ getters: true }) });
};
exports.createCaa = createCaa;
exports.getCaa = getCaa;
exports.getCaaById = getCaaById;
exports.getCaaByName = getCaaByName;
exports.updateCaa = updateCaa;