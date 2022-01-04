const express = require('express');
const router = express.Router();
const {Course, course_valid, course_valid_update} = require('../models/course');
const _ =require('lodash')


router.get('',async (req,res)=>{
    let courses = await Course.find();
    res.send(courses)
});

router.post('',async (req,res)=>{
    let valid_res = course_valid(req.body);
    if(valid_res.error)
        return res.status(400).send(valid_res.error.details[0].message)
    let course = new Course(_.pick(req.body,['title','author','tags','price','isPublished']));
    try{
    course = await course.save();
    }catch(err){
        return res.status(400).send('Error : ' + err.message)
    }
    res.status(201).send(course)
});

router.get('/id/:id',async (req,res)=>{
    let course = await Course.findById(req.params.id);
    if(!course)
        return res.status(404).send('Course with this is is not found')
    res.send(course)
});

router.get('/title/:title',async (req,res)=>{
    let courses = await Course.find({title:req.params.title});
    if(courses.length == 0)
        return res.status(404).send('No Courses found')
    res.send(courses)
});
// eq
// neq 
// gt   greater than
// gte   greater than and equal
//lt less than
// lte less than equal
router.get('/price/more/:price',async (req,res)=>{
    let courses = await Course.find({price : {$gte : req.params.price}});
    if(courses.length == 0)
        return res.status(404).send('No Courses found')
    res.send(courses)
});


router.get('/price/less/:price',async (req,res)=>{
    let courses = await Course.find({price : {$lte : req.params.price}})
                                .limit(1);
    if(courses.length == 0)
        return res.status(404).send('No Courses found')
    res.send(courses)
});

router.put('/id/:id',async (req,res)=>{
    let valid_res = course_valid_update(req.body);
    if(valid_res.error)
        return res.status(400).send(valid_res.error.details[0].message)
    let course = await Course.findById(req.params.id);
    if(!course)
        return res.status(404).send('Course with this is is not found');
    course = _.merge(course,req.body);
    try{
        course = await course.save();
        }catch(err){
            return res.status(400).send('Error : ' + err.message)
        }
    res.send(course)
});

router.delete('/id/:id',async (req,res)=>{
    let course = await Course.findByIdAndDelete(req.params.id);
    if(!course)
        return res.status(404).send('Course with this is is not found');
    res.send(course)
});
module.exports=router