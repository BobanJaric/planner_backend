const HttpError= require('../models/http-errors');

const Crew = require('../models/crew');
const Aircraft = require('../models/aircraft');
const Airports = require('../models/airports');

const pdf = require('html-pdf');
const pdfTemplate = require('../documents');


const createPdf= async (req, res,next) => {

 
  try {
      captCorr = await Crew.find({fullname:req.body.fullname1.value});
  } catch (err) {

  }
  let foCorr;
  try {
      foCorr = await Crew.find({fullname:req.body.fullname2.value});
  } catch (err) {

  }
  let acmCorr;
  try {
      acmCorr = await Crew.find({fullname:req.body.fullname3.value});
  } catch (err) {

  }
  let aircraftCorr;
  try {
    aircraftCorr = await Aircraft.find({aircraft:req.body.aircraft.value});
  } catch (err) {

  }

  let originCorr;
  try {
    originCorr = await Airports.find({icao:req.body.origin.value.toUpperCase()});
  } catch (err) {
    const error = new HttpError('Could not find Airport', 500);
        return next(error);
  }

  if (!originCorr[0]) {
    const error = new HttpError('Please check origin airport CODE', 404);
    return next(error);
}

  let destinationCorr;
  try {
    destinationCorr = await Airports.find({icao:req.body.destination.value.toUpperCase()});
  } catch (err) {
    const error = new HttpError('Could not find Airport', 500);
        return next(error);
  }

  if (!destinationCorr[0]) {
    const error = new HttpError('Please check destination airport CODE', 404);
    return next(error);
}


    pdf.create(pdfTemplate({...req.body,captCorr,foCorr,acmCorr, aircraftCorr, originCorr, destinationCorr  }), {}).toFile('result.pdf', (err) => {
      console.log(err);
        if(err!==null) {
             return res.send(Promise.reject());

        }
        return res.send(Promise.resolve());
    });

    
}


  exports.createPdf= createPdf;

