const fs = require('fs');

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`),
);
// create a check body middleware
// check if body contains the name and the price property
// if not, send back 400(bad request)

exports.checkBody = (req, res, next) => {
  console.log(req.body);
  const name = req.body.name;
  const pricePro = req.body.price;

  if (!name || !pricePro) {
    return res.status(400).json({
      status: 'fail',
      message: 'bad request',
    });
  }
  next();
};

exports.checkID = (req, res, next, val) => {
  console.log(`tour id is ${val}`);
  if (req.params.id * 1 > tours.length) {
    res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }
  next();
};

exports.getAllTours = (req, res) => {
  console.log(req.requestTime);
  res.status(200).json({
    status: 'success',
    requestedto: req.requestTime,
    results: tours.length,
    tours,
  });
};

exports.getTour = (req, res) => {
  const id = req.params.id * 1;

  const tour = tours.find((el) => el.id === id);

  res.status(200).json({
    status: 'success',
    tour,
  });
};

exports.createTour = (req, res) => {
  // console.log(req.body);

  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'success',
        tour: newTour,
      });
    },
  );
};

exports.updateTour = (req, res) => {
  res.status(200).json({
    status: 'success',
    tour: '<Updated tour here>',
  });
};

exports.deleteTour = (req, res) => {
  res.status(204).json({
    status: 'success',
    data: null,
  });
};
