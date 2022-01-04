const mongoose = require('mongoose');
const Joi = require('joi');
const course_shcema = new mongoose.Schema({
    title : {type:String, unique:true, required : true},
    author : {type:String,  required : true},
    tags : [String],
    price : {type : Number, required : function () { return this.isPublished}},
    date : {type : Date, default : Date.now()},
    isPublished : Boolean
});

const courses_validation_schema = Joi.object({
    title : Joi.string().max(50).min(5).required(),
    author : Joi.string().max(30).required(),
    tags : Joi.array().items(Joi.string()),
    price : Joi.number().positive(),
    isPublished : Joi.boolean()
})

const courses_validation_schema_update = Joi.object({
    title : Joi.string().max(50).min(5),
    author : Joi.string().max(30),
    tags : Joi.array().items(Joi.string()),
    price : Joi.number().positive(),
    isPublished : Joi.boolean()
})

function course_valid(body){
    return courses_validation_schema.validate(body);
}

function course_valid_update(body){
    return courses_validation_schema.validate(body);
}

const Course = mongoose.model('Course',course_shcema);

module.exports.Course = Course
module.exports.course_valid = course_valid
module.exports.course_valid_update = course_valid_update