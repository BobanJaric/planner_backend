const mongoose = require('mongoose');

const HttpError= require('../models/http-errors');
const {  validationResult } = require('express-validator');

const User = require('../models/user');
const Broker = require('../models/broker');

  const createBroker= async (req,res,next) =>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
      return next( new HttpError('Invalid inputs please check your data!!!!!!!!!!!!!', 422));
    }

  const {  brokerName,company,email,telephone }=req.body;

  const createdBroker = new Broker({
    brokerName,
    company,
    email,
    telephone,
    creator:'5fe46d14371ffc10f04ffec5'
  });

  let user;
  try{
    user = await User.findById('5fe46d14371ffc10f04ffec5');
  }catch(err){
    const error= new HttpError('Creating broker failed', 500);
      return next(error);
  }

  if(!user){
    const error= new HttpError('Could not find user for provided Id', 404);
      return next(error);
  }

  try{
    await createdBroker.save();
  }catch(err){
    const error= new HttpError('Creating broker  failed!!!', 500);
    return next(error);
  }
  
    res.status(201).json({broker:createdBroker})

}

  const getBroker= async(req,res,next)=>{

    let brokers;
      try{
        brokers= await Broker.find({});
      }catch(err){
        const error= new HttpError('Something went wrong!', 500);
        return next(error);
      }
      

      if (!brokers) {
        const error =  new HttpError('Could not find broker!!!',404);
        return next(error);// da bi kod stao ako se pojavi greska
      }
      res.json({brokers:brokers});
  }

  const getBrokerById = async (req,res,next)=>{

    const brokerId= req.params.bid;

 
    let broker;
    try{
      broker= await Broker.findById(brokerId);
    }catch(err){
      const error= new HttpError('Something went wrong!', 500);
      return next(error);
    }
    
    if (!broker) {
      const error =  new HttpError('Could not find broker for id!!!',404);
      return next(error);// da bi kod stao ako se pojavi greska
    }
    res.json({broker:broker.toObject( { getters:true }) });
  
  };

  const updateBroker =  async (req,res,next)=>{

    const errors = validationResult(req);

    if(!errors.isEmpty()){
      return next(new HttpError('Invalid inputs please check your data', 422)) ;
    }
    const {  brokerName,company,email,telephone, creator }=req.body;

    const brokerId= req.params.bid;
    
     let broker;
    try{
       broker= await Broker.findById(brokerId);
    }catch(err){
      const error= new HttpError('Something went wrong!', 500);
      return next(error);
    }


    broker.brokerName=brokerName,
    broker.company=company,
    broker.email=email,
    broker.telephone=telephone
    

    try{
      await broker.save();
   }catch(err){
     const error= new HttpError('Something went wrong!', 500);
     return next(error);
   } 

    res.status(200).json({broker: broker.toObject( { getters:true })});
  };
  exports.createBroker= createBroker;
  exports.getBroker= getBroker;
  exports.getBrokerById= getBrokerById;
  exports.updateBroker= updateBroker;