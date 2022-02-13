const mongoose = require('mongoose');
const { validationResult } = require('express-validator');

const HttpError = require('../models/http-errors');
const Arhive = require('../models/arhives');

const createArhive = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(new HttpError('Invalid inputs please check your data!!!!!!!!!!!!!', 422));
  }

  const { date,
          registration,
          from,
          to,
          etd,
          eta,
          block,
          msp,
          pax,
          capt,
          fo,
          fa,
          length,
          broker } = req.body;

  let createdArhive;

  try {
    createdArhive = await Arhive.findOneAndUpdate(
      {
        date,
        registration,
        from,
        to,
        etd,
        eta,
      },
      {
        date,
        registration,
        from,
        to,
        etd,
        eta,
        block,
        msp,
        pax,
        capt,
        fo,
        fa,
        length,
        broker
      },
      {
        upsert: true,
        new: true,
      }
    )

  } catch (err) {
    const error = new HttpError('Creating arhive failed', 500);
    return next(error);
  }


  res.status(201).json({ arhive: createdArhive })


}

const getArhive = async (req, res, next) => {
  let arhives;
  try {
    arhives = await Arhive.find({});
  } catch (err) {
    const error = new HttpError('Something went wrong!', 500);
    return next(error);
  }


  if (!arhives) {
    const error = new HttpError('Could not find place for id!!!', 404);
    return next(error);// da bi kod stao ako se pojavi greska
  }
  res.json({ arhives: arhives });
}

const getArhiveByReg = async (req, res, next) => {
  const arhive = req.params.areg;
  const arhiveReg = arhive.substr(0, 6);
  const corrDate = arhive.substr(6, 10);
  const corrDate2 = arhive.substr(16, 26);

  let startDate = dateCorr(corrDate);
  let endDate = dateCorr(corrDate2);
 

  let arhives;
  try {
    arhives = await Arhive.find({ registration: arhiveReg, date: { $gte: startDate, $lte: endDate } });
  } catch (err) {
    const error = new HttpError('Something went wrong!', 500);
    return next(error);
  }

  if (!arhives) {
    const error = new HttpError('Could not find arhive for Reg!', 404);
    return next(error);// da bi kod stao ako se pojavi greska
  }

  res.json({ arhives: arhives });
  /* res.json({arhives:arhives.toObject( { getters:true }) });   */

};

exports.createArhive = createArhive;
exports.getArhive = getArhive;
exports.getArhiveByReg = getArhiveByReg;


function dateCorr(corrDate) {
  let date1 = new Date(corrDate);
  let day = date1.getDate();
  let month = date1.getMonth() + 1;
  let year = date1.getFullYear().toString().substr(-2);


  let dayCorr;
  if (day.toString().length === 1) {
    dayCorr = `0${day}`;
  } else {
    dayCorr = day;
  }

  let monthCorr;
  if (month.toString().length === 1) {
    monthCorr = `0${month}`;
  } else {
    monthCorr = month;
  }
  return showDate = `${dayCorr}.${monthCorr}.${year}`;
}


