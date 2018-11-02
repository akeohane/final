var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Event = require('../models/Event.js');

var passport = require('passport');
require('../config/passport')(passport);


// const newEvent = {name:"Avalanche Game", date:"11182018", attendees:["Dr. Dre","Ice Cube","Easy E", "MC Ren","Yella"], time:1500, type:"sports", locationAprox:"Denver", actualLocation:"Mile High", hostId: "5bc7c61e1c68e01a3b49a7ee"}


const getToken = function (headers) {
  if (headers && headers.authorization) {
    var parted = headers.authorization.split(' ');
    if (parted.length === 2) {
      return parted[1];
    } else {
      return null;
    }
  } else {
    return null;
  }
}

/* GET ALL Events */
router.get('/', passport.authenticate('jwt', {
  session: false
}), function (req, res) {
  var token = getToken(req.headers);
  if (token) {
    Event.find(function (err, events) {
      if (err) return (err);
      res.json(events);
    });
  } else {
    return res.status(403).send({
      success: false,
      msg: 'Unauthorized.'
    });
  }
});

/* SAVE Event */
router.post('/', passport.authenticate('jwt', {
  session: false
}), function (req, res) {
  var token = getToken(req.headers);
  console.log(req.body.params.testParam);
  console.log(req.body.params.testParam1);
  console.log(req.body.params.testParam2);
  if (token) {
    Event.create(req.body.params.testParam2, function (err, post) {
      if (err) return (err);
      res.json(post);
    });
  } else {
    return res.status(403).send({
      success: false,
      msg: 'Unauthorized.'
    });
  }
});


router.post('/:id', passport.authenticate('jwt', {
  session: false
}), function (req, res) {
  var token = getToken(req.headers);
  console.log(req.params.id);
  console.log(req.body.params._id);
  console.log(req.body.params.name);
  console.log("73"+ req.body.params.attendees);


  if (req.body.params.functionToRun === 1) {
    if (token) {

      Event.findOneAndUpdate({
          _id: req.params.id
        }, {
          $set: {
            attendees: req.body.params.attendees
          }
        })
        .then(function (dbEvent) {
          // If the User was updated successfully, send it back to the client
          res.json(dbEvent);
        })
        .catch(function (err) {
          // If an error occurs, send it back to the client
          res.json(err);
        });
    }
  } else if (req.body.params.functionToRun === 2) {
    if (token) {
      console.log("func running2")
      // User.find({},function (err, events) {
      Event.findOneAndUpdate({
          _id: req.params.id
        }, {
          $push: {
            attendees: req.body.params.attendees
          }
        })
        .then(function (dbEvent) {
          console.log(dbEvent);
          // If the User was updated successfully, send it back to the client
          res.json(dbEvent);
        })
        .catch(function (err) {
          // If an error occurs, send it back to the client
          res.json(err);
        });
    }
  }

  // if (token) {
  //   Event.findOneAndUpdate({_id:req.params.id}, { $set: { attendees: req.body.params.attendees } })
  //   .then(function(dbEvent) {
  //     // If the User was updated successfully, send it back to the client
  //     res.json(dbEvent);
  //   })
  //   .catch(function(err) {
  //     // If an error occurs, send it back to the client
  //     res.json(err);
  //   });
  //   } 
});

router.delete('/:id', passport.authenticate('jwt', {
  session: false
}), function (req, res) {
  var token = getToken(req.headers);
  console.log(req.params.id);
  console.log(res)
  if (token) {
    // User.find({},function (err, events) {
    Event.findById({
        _id: req.params.id
      })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
});

// router.post('/:id', passport.authenticate('jwt', { session: false}), function(req, res) {
//   var token = getToken(req.headers);
//   console.log(req.params.id);
//   console.log(res)
//   if (token) {
//     // User.find({},function (err, events) {
//     Event.findById({ _id: req.params.id })
//     .then(dbModel => dbModel.remove())
//     .then(dbModel => res.json(dbModel))
//     .catch(err => res.status(422).json(err));
//     } 
// });

module.exports = router;