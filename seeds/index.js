// 데이터베이스에 시드하고 싶을 때마다 Node 앱과는 별도로 실행
const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

const mongoDB = 'mongodb://localhost:27017/go-camp';
mongoose.connect(mongoDB);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i=0; i < 200; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: '629017b2669dd34a4d83e212',
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description: 'hi my name is dana',
      price,
      geometry: {
        type: "Point",
        coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude,
        ]
      },
      images :  [
        {
          url: 'https://res.cloudinary.com/djf95umtp/image/upload/v1653917258/GoCamp/youle4wxlw8cllkzitvm.jpg',
          filename: 'GoCamp/youle4wxlw8cllkzitvm',
        },
        {
          url: 'https://res.cloudinary.com/djf95umtp/image/upload/v1653917258/GoCamp/youle4wxlw8cllkzitvm.jpg',
          filename: 'GoCamp/youle4wxlw8cllkzitvm',
        }
      ]
    })
    await camp.save();
  }
}

seedDB().then(() => {
  mongoose.connection.close();
})