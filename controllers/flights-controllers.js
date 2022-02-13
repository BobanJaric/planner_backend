const fs = require('fs');

const mongoose = require('mongoose');
const { validationResult } = require('express-validator');

const io = require('../socket');

const HttpError = require('../models/http-errors');
const Flight = require('../models/flights');
const User = require('../models/user');
const Airport = require('../models/airports');
const Caa = require('../models/caa');
const Note = require('../models/notes');

const calcMsp = (dep, arr) => {
  let finalMsp;
  if (dep === null) {
    finalMsp = '';
  } else {
    const depMin = dep.split(':')[1];
    const depHour = dep.split(':')[0];
    const arrHour = arr.split(':')[0];
    const arrMin = arr.split(':')[1];
    let hours;
    let mins;
    if (+arrHour < +depHour) {
      hours = +arrHour + 24 - depHour;
      mins = +arrMin - depMin;
    } else {
      hours = +arrHour - depHour;
      mins = +arrMin - depMin;
    }
    finalMsp = hours + ',' + (mins / 60).toFixed(0);
  }


  return finalMsp;
};

const getFlightById = async (req, res, next) => {
  const flightId = req.params.pid;

  let flight;
  try {
    flight = await Flight.findById(flightId);
  } catch (err) {
    const error = new HttpError('Something went wrong!', 500);
    return next(error);
  }


  if (!flight) {
    const error = new HttpError('Could not find flight for id!!!', 404);
    return next(error);// da bi kod stao ako se pojavi greska
  }

  res.json({ flight: flight.toObject({ getters: true }) });

};

const getFlightsByDate = async (req, res, next) => {
  const flightDate = req.params.pd;
  const startDate = flightDate.substr(0, 10);

  let flights;

  try {
    flights = await Flight.find({ date1: { $gte: startDate } });
  } catch (err) {
    const error = new HttpError('Something went wrong!', 500)
    return next(error);
  }

  if (!flights || flights.length === 0) {
    const error = new HttpError('Could not find flt for id!!!', 404);
    return next(error);// da bi kod stao ako se pojavi greska
  }
  io.getIO().emit('createFlight', { action: 'create', flights: flights.map(flight => flight.toObject({ getters: true })) });
  res.json({ flights: flights.map(flight => flight.toObject({ getters: true })) });
};


const getAirports = async (req, res, next) => {
  let airports;
  try {
    airports = await Airport.find({});
  } catch (err) {
    const error = new HttpError('Something went wrong!', 500);
    return next(error);
  }


  if (!airports) {
    const error = new HttpError('Could not find flight for id!!!', 404);
    return next(error);// da bi kod stao ako se pojavi greska
  }
  res.json({ airports: airports });
}

const getAirportsDatas = async (req, res, next) => {
  let airports;
  try {
    airports = await Airport.find({});
  } catch (err) {
    const error = new HttpError('Something went wrong!', 500);
    return next(error);
  }


  if (!airports) {
    const error = new HttpError('Could not find flt for id!!!', 404);
    return next(error);// da bi kod stao ako se pojavi greska
  }
  res.json({ airports: airports });
}


const getAirportById = async (req, res, next) => {
  const airportId = req.params.aid;
  let airport;

  try {
    airport = await Airport.findById(airportId);
  } catch (err) {
    const error = new HttpError('Something went wrong!', 500);
    return next(error);
  }


  if (!airport) {
    const error = new HttpError('Could not find airport for id!!!', 404);
    return next(error);// da bi kod stao ako se pojavi greska
  }
  res.json({ airport: airport.toObject({ getters: true }) });

};

const getAirportByName3 = async (req, res, next) => {
  const airportName = req.params.nid3;

  let airports = [];
  try {
    airports[0] = await Airport.find({ icao: airportName.split(',')[0] });
  } catch (err) {
    const error = new HttpError('Something went wrong!', 500);
    return next(error);
  }
  try {
    airports[1] = await Airport.find({ icao: airportName.split(',')[1] });
  } catch (err) {
    const error = new HttpError('Something went wrong!', 500);
    return next(error);
  }
  try {
    airports[2] = await Airport.find({ icao: airportName.split(',')[2] });
  } catch (err) {
    const error = new HttpError('Something went wrong!', 500);
    return next(error);
  }


  if (!airports) {
    const error = new HttpError('Could not find airport for id!!!', 404);
    return next(error);// da bi kod stao ako se pojavi greska
  }

  res.json({ airports: airports });

};

const getAirportByName = async (req, res, next) => {
  const airportName = req.params.nid;


  let airport;
  try {
    airport = await Airport.find({ icao: airportName });
  } catch (err) {
    const error = new HttpError('Something went wrong!', 500);
    return next(error);
  }

  let caa;
  try {
    caa = await Caa.find({ country: airport[0].country });
  } catch (err) {
    const error = new HttpError('Something went wrong!', 500);
    return next(error);
  }

  if (!airport) {
    const error = new HttpError('Could not find airport for name!!!', 404);
    return next(error);// da bi kod stao ako se pojavi greska
  }

  res.json({ airport: [...caa, ...airport] });

};

const updateAirport = async (req, res, next) => {

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(new HttpError('Invalid inputs please check your data', 422));
  }
  const { icao, iata, country, city, hendler1, hendler2, hendler3, hendler4, hendler5, note, creator, utc, vip, slot, doz, meetingpoint, longitude, latitude } = req.body;

  const airportId = req.params.aid;

  let airport;
  try {
    airport = await Airport.findById(airportId);
  } catch (err) {
    const error = new HttpError('Something went wrong!', 500);
    return next(error);
  }


  airport.icao = icao,
    airport.iata = iata,
    airport.country = country,
    airport.city = city,
    airport.hendler1 = hendler1,
    airport.hendler2 = hendler2,
    airport.hendler3 = hendler3,
    airport.hendler4 = hendler4,
    airport.hendler5 = hendler5,
    airport.note = note,
    airport.utc = utc,
    airport.vip = vip,
    airport.slot = slot,
    airport.doz = doz,
    airport.creator = creator,
    airport.meetingpoint = meetingpoint,
    airport.longitude = longitude,
    airport.latitude = latitude


  try {
    await airport.save();
  } catch (err) {
    console.log(err);
    const error = new HttpError('Something went wrong!2', 500);
    return next(error);
  }

  res.status(200).json({ airport: airport.toObject({ getters: true }) });
};


const getFlightsByUserId = async (req, res, next) => {

  let flights;
  try {
    flights = await Flight.find();
  } catch (err) {
    const error = new HttpError('Something went wrong!', 500);
    return next(error);
  }

  if (!flights || flights.length === 0) {
    const error = new HttpError('Could not find flight for id!!!', 404);
    return next(error);// da bi kod stao ako se pojavi greska
  }
  flights.sort((a, b) => b.date1.localeCompare(a.date1));
  io.getIO().emit('createFlight', { action: 'create', flights: flights.map(flight => flight.toObject({ getters: true })) });
  res.json({ flights: flights.map(flight => flight.toObject({ getters: true })) });
};

const createAirport = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(new HttpError('Invalid inputs please check your data!!!!!!!!!!!!!', 422));
  }

  const { icao, iata, country, city, hendler1, hendler2, hendler3, hendler4, hendler5, note, utc, vip, slot, doz, meetingpoint, longitude, latitude } = req.body;

  const createdAirport = new Airport({
    icao,
    iata,
    country,
    city,
    hendler1,
    hendler2,
    hendler3,
    hendler4,
    hendler5,
    note,
    utc,
    vip,
    slot,
    doz,
    meetingpoint,
    longitude,
    latitude
  });

  try {
    await createdAirport.save();

  } catch (err) {
    const error = new HttpError('Creating airport failed', 500);
    return next(error);
  }

  res.status(201).json({ airport: createdAirport })


}

const createFlight = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(new HttpError('Invalid inputs please check your data!!!!!!!!!!!!!', 422));
  }

  const { flightType1, flightType2, flightType3, flightType4, note, registration, departureTime1, departureTime2, departureTime3, departureTime4,
    msp1, msp2, msp3, msp4, date1, date2, date3, date4, paxnbr1, paxnbr2, paxnbr3, paxnbr4, originIcao1, originIcao2, originIcao3, originIcao4,
    destinationIcao1, destinationIcao2, destinationIcao3, destinationIcao4, arrivalTime1, arrivalTime2, arrivalTime3, arrivalTime4,
    hendlerOrigin, hendlerOrigin1, hendlerOrigin2, hendlerOrigin3, hendlerDestination1, hendlerDestination2, hendlerDestination3, hendlerDestination4,
    airportsData } = req.body;

   let airport;
  try {
    airport = await Airport.findOne({ icao: originIcao1 });
  } catch (err) {
    const error = new HttpError('Something went wrong!', 500);
    return next(error);
  }


  if (!airport) {
    const error = new HttpError('Could not find airport !!!', 404);
    return next(error);// da bi kod stao ako se pojavi greska
  }

  let callsign;
  if (registration === "YUAAA") {
    callsign = 'BBB101';
  } else if (registration === "YUBBB") {
    callsign = 'BBB102';
  } else if (registration === "YUCCC") {
    callsign = 'BBB103';
  } else {
    callsign = 'BBB104';
  }

  const createdFlight = new Flight({
    flightType1,
    flightType2,
    flightType3,
    flightType4,
    note,
    date1,
    date2,
    date3,
    date4,
    paxnbr1,
    paxnbr2,
    paxnbr3,
    paxnbr4,
    registration,
    callsign,
    departureTime1,
    departureTime2,
    departureTime3,
    departureTime4,
    originIcao1,
    originIcao2,
    originIcao3,
    originIcao4,
    destinationIcao1,
    destinationIcao2,
    destinationIcao3,
    destinationIcao4,
    arrivalTime1,
    arrivalTime2,
    arrivalTime3,
    arrivalTime4,
    hendlerOrigin,
    hendlerOrigin1,
    hendlerOrigin2,
    hendlerOrigin3,
    hendlerDestination1,
    hendlerDestination2,
    hendlerDestination3,
    hendlerDestination4,
    msp1,
    msp2,
    msp3,
    msp4,
    brief,
    agreement,
    airportsData
  });


  try {
    await createdFlight.save();
  } catch (err) {
    console.log(err);
    const error = new HttpError('Creating flt failed-2', 500);
    return next(error);
  }

  res.status(201).json({ flight: createdFlight })
};

const createFlightFlutter = async (req, res, next) => {

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(new HttpError('Invalid inputs please check your data!!!!!!!!!!!!!', 422));
  }

  let { flightType1, flightType2, flightType3, flightType4, registration, departureTime1, departureTime2,
    departureTime3, departureTime4, date1, date2, date3, date4, paxnbr1, paxnbr2, paxnbr3,
    paxnbr4, originIcao1, originIcao2, originIcao3, originIcao4, destinationIcao1, destinationIcao2,
    destinationIcao3, destinationIcao4, arrivalTime1, arrivalTime2, arrivalTime3, arrivalTime4, note
  } = req.body;

  const hendlerOrigin = '';
  const hendlerOrigin1 = '';
  const hendlerOrigin2 = '';
  const hendlerOrigin3 = '';
  const hendlerDestination1 = '';
  const hendlerDestination2 = '';
  const hendlerDestination3 = '';
  const hendlerDestination4 = '';



  let callsign;
  if (registration === "YUAAA") {
    callsign = 'BBB101';
  } else if (registration === "YUBBB") {
    callsign = 'BBB102';
  } else if (registration === "YUCCC") {
    callsign = 'BBB103';
  } else {
    callsign = 'BBB104';
  }

  const msp1 = calcMsp(departureTime1, arrivalTime1);
  const msp2 = calcMsp(departureTime2, arrivalTime2);
  const msp3 = calcMsp(departureTime3, arrivalTime3);
  const msp4 = calcMsp(departureTime4, arrivalTime4);



  const createdFlight = new Flight({
    flightType1,
    flightType2,
    flightType3,
    flightType4,
    note,
    date1,
    date2,
    date3,
    date4,
    paxnbr1,
    paxnbr2,
    paxnbr3,
    paxnbr4,
    registration,
    callsign,
    departureTime1,
    departureTime2,
    departureTime3,
    departureTime4,
    originIcao1,
    originIcao2,
    originIcao3,
    originIcao4,
    destinationIcao1,
    destinationIcao2,
    destinationIcao3,
    destinationIcao4,
    arrivalTime1,
    arrivalTime2,
    arrivalTime3,
    arrivalTime4,
    msp1,
    msp2,
    msp3,
    msp4,
    hendlerOrigin,
    hendlerOrigin1,
    hendlerOrigin2,
    hendlerOrigin3,
    hendlerDestination1,
    hendlerDestination2,
    hendlerDestination3,
    hendlerDestination4
  });


  try {
    await createdFlight.save();

  } catch (err) {
    console.log(err);
    const error = new HttpError('Creating flight failed-2', 500);
    return next(error);
  }
  io.getIO().emit('createFlight', { action: 'createFlt', flight: createdFlight });
  res.status(201).json({ flight: createdFlight });
};


const updateFlight = async (req, res, next) => {

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(new HttpError('Invalid inputs please check your data', 422));
  }
  const { flightType1, flightType2, flightType3, flightType4, note, registration, departureTime1, departureTime2, departureTime3, departureTime4,
    msp1, msp2, msp3, msp4, date1, date2, date3, date4, paxnbr1, paxnbr2, paxnbr3, paxnbr4, originIcao1, originIcao2, originIcao3, originIcao4,
    destinationIcao1, destinationIcao2, destinationIcao3, destinationIcao4, arrivalTime1, arrivalTime2, arrivalTime3, arrivalTime4,
    hendlerOrigin, hendlerOrigin1, hendlerOrigin2, hendlerOrigin3, hendlerDestination1, hendlerDestination2, hendlerDestination3, hendlerDestination4, slot, doz, vip, ovf, noteOps, handling,
    agreement,
    agreement2,
    agreement3,
    agreement4,
    brief,
    brief2,
    brief3,
    brief4,
    broker1,
    broker2,
    broker3,
    broker4,
    racun,
    racun1,
    racun2,
    racun3,
    ket,
    ket1,
    ket2,
    ket3,
    price1,
    price2,
    price3,
    price4,
    manjak1,
    manjak2,
    manjak3,
    manjak4,
    fltrac1,
    fltrac2,
    fltrac3,
    fltrac4,
    payment1,
    payment2,
    payment3,
    payment4,
    airportsData
  } = req.body;

  const flightId = req.params.pid;


  let flight;
  try {
    flight = await Flight.findById(flightId);
  } catch (err) {
    const error = new HttpError('Something went wrong!!!!!!', 500);
    return next(error);
  }


  let callsign;
  if (registration === "YUAAA") {
    callsign = 'BBB101';
  } else if (registration === "YUBBB") {
    callsign = 'BBB102';
  } else if (registration === "YUCCC") {
    callsign = 'BBB103';
  } else {
    callsign = 'BBB104';
  }

  flight.flightType1 = flightType1;
  flight.flightType2 = flightType2;
  flight.flightType3 = flightType3;
  flight.flightType4 = flightType4;
  flight.note = note;
  flight.date1 = date1;
  flight.date2 = date2;
  flight.date3 = date3;
  flight.date4 = date4;
  flight.registration = registration;
  flight.callsign = callsign;
  flight.paxnbr1 = paxnbr1;
  flight.paxnbr2 = paxnbr2;
  flight.paxnbr3 = paxnbr3;
  flight.paxnbr4 = paxnbr4;
  flight.departureTime1 = departureTime1;
  flight.departureTime2 = departureTime2;
  flight.departureTime3 = departureTime3;
  flight.departureTime4 = departureTime4;
  flight.originIcao1 = originIcao1;
  flight.originIcao2 = originIcao2;
  flight.originIcao3 = originIcao3;
  flight.originIcao4 = originIcao4;
  flight.destinationIcao1 = destinationIcao1;
  flight.destinationIcao2 = destinationIcao2;
  flight.destinationIcao3 = destinationIcao3;
  flight.destinationIcao4 = destinationIcao4;
  flight.arrivalTime1 = arrivalTime1;
  flight.arrivalTime2 = arrivalTime2;
  flight.arrivalTime3 = arrivalTime3;
  flight.arrivalTime4 = arrivalTime4;
  flight.hendlerOrigin = hendlerOrigin;
  flight.hendlerOrigin1 = hendlerOrigin1;
  flight.hendlerOrigin2 = hendlerOrigin2;
  flight.hendlerOrigin3 = hendlerOrigin3;
  flight.hendlerDestination1 = hendlerDestination1;
  flight.hendlerDestination2 = hendlerDestination2;
  flight.hendlerDestination3 = hendlerDestination3;
  flight.hendlerDestination4 = hendlerDestination4;
  flight.msp1 = msp1;
  flight.msp2 = msp2;
  flight.msp3 = msp3;
  flight.msp4 = msp4;
  flight.slot = slot;
  flight.doz = doz;
  flight.vip = vip;
  flight.ovf = ovf;
  flight.handling = handling;
  flight.agreement = agreement;
  flight.agreement2 = agreement2;
  flight.agreement3 = agreement3;
  flight.agreement4 = agreement4;
  flight.brief = brief;
  flight.brief2 = brief2;
  flight.brief3 = brief3;
  flight.brief4 = brief4;
  flight.racun = racun;
  flight.racun2 = racun2;
  flight.racun3 = racun3;
  flight.racun1 = racun1;
  flight.ket = ket;
  flight.ket2 = ket2;
  flight.ket3 = ket3;
  flight.ket1 = ket1;
  flight.broker1 = broker1;
  flight.broker2 = broker2;
  flight.broker3 = broker3;
  flight.broker4 = broker4;
  flight.price1 = price1;
  flight.price2 = price2;
  flight.price3 = price3;
  flight.price4 = price4;
  flight.manjak1 = manjak1;
  flight.manjak2 = manjak2;
  flight.manjak3 = manjak3;
  flight.manjak4 = manjak4;
  flight.fltrac1 = fltrac1;
  flight.fltrac2 = fltrac2;
  flight.fltrac3 = fltrac3;
  flight.fltrac4 = fltrac4;
  flight.payment1 = payment1;
  flight.payment2 = payment2;
  flight.payment3 = payment3;
  flight.payment4 = payment4;
  flight.airportsData = airportsData

  try {
    await flight.save();
  } catch (err) {
    console.log(err);
    const error = new HttpError('Something went wrong!', 500);
    return next(error);
  }

  res.status(200).json({ flight: flight.toObject({ getters: true }) });
};
const updateFlightFlutter = async (req, res, next) => {

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(new HttpError('Invalid inputs please check your data', 422));
  }
  const { flightType1, flightType2, flightType3, flightType4, note, registration, departureTime1, departureTime2, departureTime3, departureTime4,
    date1, date2, date3, date4, paxnbr1, paxnbr2, paxnbr3, paxnbr4, originIcao1, originIcao2, originIcao3, originIcao4,
    destinationIcao1, destinationIcao2, destinationIcao3, destinationIcao4, arrivalTime1, arrivalTime2, arrivalTime3, arrivalTime4,

  } = req.body;

  const flightId = req.params.pid;

  const msp1 = calcMsp(departureTime1, arrivalTime1);
  const msp2 = calcMsp(departureTime2, arrivalTime2);
  const msp3 = calcMsp(departureTime3, arrivalTime3);
  const msp4 = calcMsp(departureTime4, arrivalTime4);

  let flight;
  try {
    flight = await Flight.findById(flightId);
  } catch (err) {
    const error = new HttpError('Something went wrong!!!!!!', 500);
    return next(error);
  }


  let callsign;
  if (registration === "YUAAA") {
    callsign = 'BBB101';
  } else if (registration === "YUBBB") {
    callsign = 'BBB102';
  } else if (registration === "YUCCC") {
    callsign = 'BBB103';
  } else {
    callsign = 'BBB104';
  }


  flight.flightType1 = flightType1;
  flight.flightType2 = flightType2;
  flight.flightType3 = flightType3 === null ? '' : flightType3;
  flight.flightType4 = flightType4 === null ? '' : flightType4;
  flight.note = note;
  flight.date1 = date1;
  flight.date2 = date2;
  flight.date3 = date3 === null ? '' : date3;
  flight.date4 = date4 === null ? '' : date4;
  flight.registration = registration;
  flight.callsign = callsign;
  flight.paxnbr1 = paxnbr1;
  flight.paxnbr2 = paxnbr2;
  flight.paxnbr3 = paxnbr3 === null ? '' : paxnbr3;
  flight.paxnbr4 = paxnbr4 === null ? '' : paxnbr4;
  flight.departureTime1 = departureTime1;
  flight.departureTime2 = departureTime2;
  flight.departureTime3 = departureTime3 === null ? '' : departureTime3;
  flight.departureTime4 = departureTime4 === null ? '' : departureTime4;
  flight.originIcao1 = originIcao1;
  flight.originIcao2 = originIcao2;
  flight.originIcao3 = originIcao3 === null ? '' : originIcao3;
  flight.originIcao4 = originIcao4 === null ? '' : originIcao4;
  flight.destinationIcao1 = destinationIcao1;
  flight.destinationIcao2 = destinationIcao2;
  flight.destinationIcao3 = destinationIcao3 === null ? '' : destinationIcao3;
  flight.destinationIcao4 = destinationIcao4 === null ? '' : destinationIcao4;
  flight.arrivalTime1 = arrivalTime1;
  flight.arrivalTime2 = arrivalTime2;
  flight.arrivalTime3 = arrivalTime3 === null ? '' : arrivalTime3;
  flight.arrivalTime4 = arrivalTime4 === null ? '' : arrivalTime4;
  flight.msp1 = msp1;
  flight.msp2 = msp2;
  flight.msp3 = msp3;
  flight.msp4 = msp4;

  try {
    await flight.save();
  } catch (err) {
    console.log(err);
    const error = new HttpError('Something went wrong!', 500);
    return next(error);
  }

  res.status(200).json({ flight: flight.toObject({ getters: true }) });
};
const deleteFlight = async (req, res, next) => {
  const flightId = req.params.pid;

  let flight;
  try {
    flight = await Flight.findById(flightId).populate('creator');

  } catch (err) {
    const error = new HttpError('Something went wrong!', 500);
    return next(error);
  }

  if (!flight) {
    const error = new HttpError('Could not find flight for this Id', 404);
    return next(error);
  }

  try {

    await flight.remove();
  } catch (err) {
    const error = new HttpError('Something went wrong!', 500);
    return next(error);
  }
  io.getIO().emit('createFlight', { action: 'deleteFlt', flight: flight });
  res.status(200).json({ message: 'deleted flight' });
};



const createNote = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(new HttpError('Invalid inputs please check your data!!!!!!!!!!!!!', 422));
  }

  const { date, note } = req.body;


  const createdNote = new Note({
    date,
    note,
  });

  try {
    await createdNote.save();

  } catch (err) {
    const error = new HttpError('Creating note failed', 500);
    return next(error);
  }


  res.status(201).json({ note: createdNote })

}



const deleteNote = async (req, res, next) => {
  const noteId = req.params.nid;

  const ObjectId = mongoose.Types.ObjectId;
  let id2 = ObjectId(String(noteId));

  try {
    await Note.findOneAndDelete({ _id: noteId });
  } catch (err) {
    console.log(err);
    const error = new HttpError('Something went wrong!', 500);
    return next(error);
  }

  res.status(200).json({ message: 'deleted note' });
};


const createSales = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(new HttpError('Invalid inputs please check your data!!!!!!!!!!!!!', 422));
  }

  const { agreement, brief, agreement2, brief2, agreement3, brief3, agreement4, brief4, broker1, broker2, broker3,
    broker4, racun, racun1, racun2, racun3, ket, ket1, ket2, ket3, price1, price2, price3, price4, manjak1,
    manjak2, manjak3, manjak4, fltrac1, fltrac2, fltrac3, fltrac4, payment1, payment2, payment3, payment4, noteSales1, noteSales2, noteSales3, noteSales4, id } = req.body;

  let createdFlight;

  try {
    createdFlight = await Flight.findOneAndUpdate(
      {
        _id: id
      },
      {
        agreement,
        brief,
        agreement2,
        brief2,
        agreement3,
        brief3,
        agreement4,
        brief4,
        broker1,
        broker2,
        broker3,
        broker4,
        racun,
        racun1,
        racun2,
        racun3,
        ket,
        ket1,
        ket2,
        ket3,
        price1,
        price2,
        price3,
        price4,
        manjak1,
        manjak2,
        manjak3,
        manjak4,
        fltrac1,
        fltrac2,
        fltrac3,
        fltrac4,
        payment1,
        payment2,
        payment3,
        payment4,
        noteSales1,
        noteSales2,
        noteSales3,
        noteSales4

      },
      {
        upsert: true,
        new: true,
      }
    )

  } catch (err) {
    const error = new HttpError('Creating flight failed', 500);
    return next(error);
  }
  res.status(201).json({ flight: createdFlight })
}

const createOps = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return next(new HttpError('Invalid inputs please check your data!', 422));
  }

  const { handling, slot,
    ovf,
    doz,
    vip, crew, noteOps, selectCapt, id } = req.body;

  let createdFlight;

  try {
    createdFlight = await Flight.findOneAndUpdate(
      {
        _id: id
      },
      {
        handling,
        slot,
        ovf,
        doz,
        vip,
        crew,
        noteOps,
        selectCapt
      },
      {
        upsert: true,
        new: true,
      }
    )

  } catch (err) {
    const error = new HttpError('Creating flight failed', 500);
    return next(error);
  }

  io.getIO().emit('createFlight', { action: 'createhnd', flight: createdFlight });
  res.status(201).json({ flight: createdFlight })


}


exports.getFlightById = getFlightById;
exports.getFlightsByUserId = getFlightsByUserId;
exports.createFlight = createFlight;
exports.updateFlight = updateFlight;
exports.deleteFlight = deleteFlight;
exports.createAirport = createAirport;
exports.createSales = createSales;
exports.createOps = createOps;
exports.getFlightsByDate = getFlightsByDate;
exports.createNote = createNote;
exports.getAirports = getAirports;
exports.getAirportsDatas = getAirportsDatas;
exports.getAirportById = getAirportById;
exports.getAirportByName = getAirportByName;
exports.getAirportByName3 = getAirportByName3;
exports.updateAirport = updateAirport;
exports.deleteNote = deleteNote;
exports.updateFlightFlutter = updateFlightFlutter;
exports.createFlightFlutter = createFlightFlutter;
