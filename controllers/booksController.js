const db = require("../models");

// Defining methods for the booksController
module.exports = {
  findAll: function(req, res) {
   db.Recipes
     .find()
     .then(dbModel => res.json(dbModel))
     .catch(err => res.status(422).json(err));
     console.log("In Find All");
 },
  findById: function(req, res) {
    db.Recipes
      .findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    console.log('received save request');
    console.log(req.body);
    db.Recipes
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  update: function(req, res) {
    db.Recipes
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    db.Recipes
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};
