const router = require("express").Router();
let Response = require("../models/response");

router.route("/").get((req, res) => {
  Response.find()
    .then((response) => res.json(response))
    .catch((err) => res.status(400).json("Error" + err));
});

router.route("/:id").get((req, res) => {
  Response.findById(req.params.id)
    .then((response) => res.json(response))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const survey = req.body.survey;
  const responses = req.body.responses;
  const newResponse = new Response({
    survey: survey,
    responses: responses,
  });
  newResponse
    .save()
    .then(() => res.json("Response added"))
    .catch((err) => res.status(400).json("Error" + err));
});

router.route("/:id").delete((req, res) => {
  Response.findByIdAndDelete(req.params.id)
    .then(() => res.json("Response deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/survey/:id").get((req, res) => {
  Response.find({
    survey: req.params.id
  })
    .then((response) => res.json(response))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/update/:id").post((req, res) => {
  Response.findById(req.params.id)
    .then((response) => {
      response.name = req.body.name;
      response.questions = req.body.questions;

      response
        .save()
        .then(() => res.json("Survey updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
