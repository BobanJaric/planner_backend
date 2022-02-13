const mongoose = require('mongoose');
const {  validationResult } = require('express-validator');
const HttpError= require('../models/http-errors');

const Note = require('../models/notes');

const getNotes = async (req,res,next)=>{
    let notes;
    try{
       notes= await Note.find();
    }catch(err){
      const error= new HttpError('Something went wrong!', 500);
      return next(error);
    }
    res.json({notes:notes.map(note =>note.toObject( { getters:true })) });
};

exports.getNotes=getNotes;