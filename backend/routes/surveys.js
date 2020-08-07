const router = require('express').Router();
let Survey = require('../models/survey');

router.route('/').get((req, res) => {
    Survey.find()
        .then(users=>res.json(users))
        .catch(err => res.status(400).json('Error' + err));
});

router.route('/:id').get((req, res) => {
    Survey.findById(req.params.id)
      .then(survey => res.json(survey))
      .catch(err => res.status(400).json('Error: ' + err));
  });

router.route('/add').post((req, res) => {
    const name = req.body.name; 
    const newSurvey = new Survey({name});
    newSurvey.save()
        .then(()=>res.json('Survey added'))
        .catch(err => res.status(400).json('Error' + err));
});

router.route('/:id').delete((req, res) => {
    Survey.findByIdAndDelete(req.params.id)
      .then(() => res.json('Survey deleted.'))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  
  router.route('/update/:id').post((req, res) => {
    Survey.findById(req.params.id)
      .then(survey => {
        survey.name = req.body.name;
        survey.questions = req.body.questions;
  
        survey.save()
          .then(() => res.json('Survey updated!'))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
  });
  


module.exports = router;