const express = require('express');
const router = express.Router();
const campgrounds = require('../controllers/campgrounds');
const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');
const Campground = require('../models/campground');

const { isLoggedIn, isAuthor, validateCampground } = require('../middleware');

router.get('/', catchAsync(campgrounds.index));

router.get('/new', isLoggedIn, catchAsync(campgrounds.renderNewForm)); 

router.post('/', isLoggedIn, validateCampground, catchAsync(campgrounds.createCampground));

router.get('/:id', isLoggedIn, catchAsync(campgrounds.showCampground));

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(campgrounds.renderEditForm));

router.put('/:id', isLoggedIn, isAuthor, validateCampground, catchAsync(campgrounds.updateCampground));

router.delete('/:id', isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCampground));

module.exports = router;