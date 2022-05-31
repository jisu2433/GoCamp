const express = require('express');
const router = express.Router();
const campgrounds = require('../controllers/campgrounds');
const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');
const Campground = require('../models/campground');
const multer = require('multer');
const {storage} = require('../cloudinary');
const upload = multer({ storage });
const { isLoggedIn, isAuthor, validateCampground } = require('../middleware');

router.route('/')
  .get(catchAsync(campgrounds.index))
  .post(isLoggedIn, upload.array('image'), validateCampground, catchAsync(campgrounds.createCampground))
  // .post(upload.array('image'), (req, res) => {
  //   console.log(req.body, req.files);
  // })


router.get('/new', isLoggedIn, catchAsync(campgrounds.renderNewForm)); 

router.route('/:id')
  .get(isLoggedIn, catchAsync(campgrounds.showCampground))
  .put(isLoggedIn, isAuthor, upload.array('image'), validateCampground, catchAsync(campgrounds.updateCampground))
  .delete(isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCampground))

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(campgrounds.renderEditForm));

module.exports = router;