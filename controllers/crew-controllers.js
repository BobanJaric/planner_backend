const mongoose = require('mongoose');

const HttpError = require('../models/http-errors');
const { validationResult } = require('express-validator');

const Crew = require('../models/crew');

const createCrew = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new HttpError('Invalid inputs please check your data!!!!!!!!!!!!!', 422));
    }

    const { rank, rankNbr, fullname, dob, nationality, passport, passportValidity, opc, lpc, totalHours, workingFrom, licenceNbr } = req.body;

    const createdCrew = new Crew({
        rank,
        rankNbr,
        fullname,
        dob,
        nationality,
        passport,
        passportValidity,
        opc,
        lpc,
        totalHours,
        workingFrom,
        licenceNbr,
     });

     try {
        await createdCrew.save();
    } catch (err) {
        const error = new HttpError('Creating crew  failed!!!', 500);
        return next(error);
    }

    res.status(201).json({ crew: createdCrew })

}

const getCrew = async (req, res, next) => {

    let crews;
    try {
        crews = await Crew.find({});
    } catch (err) {
        const error = new HttpError('Something went wrong!', 500);
        return next(error);
    }


    if (!crews) {
        const error = new HttpError('Could not find crew!!!', 404);
        return next(error);// da bi kod stao ako se pojavi greska
    }
    res.json({ crews: crews });
}

const getCrewById = async (req, res, next) => {

    const crewId = req.params.crid;

    let crew;
    try {
        crew = await Crew.findById(crewId);
    } catch (err) {
        const error = new HttpError('Something went wrong!', 500);
        return next(error);
    }

    if (!crew) {
        const error = new HttpError('Could not find a/c for id!!!', 404);
        return next(error);// da bi kod stao ako se pojavi greska
    }
    res.json({ crew: crew.toObject({ getters: true }) });

};

const updateCrew = async (req, res, next) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return next(new HttpError('Invalid inputs please check your data', 422));
    }
    const { rank, fullname, dob, nationality, passport,
        passportValidity, opc, lpc, totalHours, workingFrom,  rankNbr, licenceNbr } = req.body;


    const crewId = req.params.crid;

    let crewUpdate;
    try {
        crewUpdate = await Crew.findById(crewId);
    } catch (err) {
        const error = new HttpError('Something went wrong!', 500);
        return next(error);
    }

    crewUpdate.rank = rank,
        crewUpdate.rankNbr = rankNbr,
        crewUpdate.fullname = fullname,
        crewUpdate.dob = dob,
        crewUpdate.nationality = nationality,
        crewUpdate.passport = passport,
        crewUpdate.passportValidity = passportValidity,
        crewUpdate.licenceNbr = licenceNbr,
        crewUpdate.opc = opc,
        crewUpdate.lpc = lpc,
        crewUpdate.totalHours = totalHours,
        crewUpdate.workingFrom = workingFrom
   
    try {
        await crewUpdate.save();
    } catch (err) {
        const error = new HttpError('Something went wrong!', 500);
        return next(error);
    }

    res.status(200).json({ crewUpdate: crewUpdate.toObject({ getters: true }) });
};

exports.createCrew = createCrew;
exports.getCrew = getCrew;
exports.getCrewById = getCrewById;
exports.updateCrew = updateCrew;
