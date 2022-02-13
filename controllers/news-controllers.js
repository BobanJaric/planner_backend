const mongoose = require('mongoose');

const HttpError = require('../models/http-errors');
const { validationResult } = require('express-validator');

const User = require('../models/user');
const News = require('../models/news');

const createNews = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new HttpError('Invalid inputs please check your data!!!!!!!!!!!!!', 422));
    }

    const { info, country, category,city, headline, creator } = req.body;

    const createdNews = new News({
        info,
        headline,
        country,
        city,
        category,
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
        await createdNews.save();
    } catch (err) {
        const error = new HttpError('Creating a/c  failed!!!', 500);
        return next(error);
    }

    res.status(201).json({ news: createdNews })

}

const getNews = async (req, res, next) => {

    let news;
    try {
        news = await News.find({});
    } catch (err) {
        const error = new HttpError('Something went wrong!', 500);
        return next(error);
    }


    if (!news) {
        const error = new HttpError('Could not find broker!!!', 404);
        return next(error);// da bi kod stao ako se pojavi greska
    }
    res.json({ news: news });
}

const getNewsById = async (req, res, next) => {

    const NewsId = req.params.nid;

    let news;
    try {
        news = await News.findById(NewsId);
    } catch (err) {
        const error = new HttpError('Something went wrong!', 500);
        return next(error);
    }

    if (!news) {
        const error = new HttpError('Could not find a/c for id!!!', 404);
        return next(error);// da bi kod stao ako se pojavi greska
    }
    res.json({ news: news.toObject({ getters: true }) });

};

const updateNews = async (req, res, next) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return next(new HttpError('Invalid inputs please check your data', 422));
    }
    const { info, country, category, headline,  creator } = req.body;

    const NewsId = req.params.aid;

    let newsUpdate;
    try {
        newsUpdate = await News.findById(NewsId);
    } catch (err) {
        const error = new HttpError('Something went wrong!', 500);
        return next(error);
    }

        newsUpdate.info = info,
        newsUpdate.headline = headline,
        newsUpdate.country = country,
        newsUpdate.city = city,
        newsUpdate.category = category,
        newsUpdate.creator = creator


    try {
        await newsUpdate.save();
    } catch (err) {
        const error = new HttpError('Something went wrong!', 500);
        return next(error);
    }

    res.status(200).json({ newsUpdate: newsUpdate.toObject({ getters: true }) });
};

const deleteNews = async (req,res,next)=>{
    const newsId= req.params.nid;

    const ObjectId = mongoose.Types.ObjectId;
   
   try{
     await News.findOneAndDelete({_id:newsId});
  }catch(err){
    console.log(err);
    const error= new HttpError('Something went wrong!', 500);
    return next(error);
  } 

    res.status(200).json({message:'deleted note'}); 
 };

exports.createNews = createNews;
exports.getNews = getNews;
exports.getNewsById = getNewsById;
exports.updateNews = updateNews;
exports.deleteNews = deleteNews;