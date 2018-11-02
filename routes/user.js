var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../models/User.js');

var passport = require('passport');
require('../config/passport')(passport);

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

// router.get('/', passport.authenticate('jwt', { session: false}), function(req, res) {
//     var token = getToken(req.headers);
//     if (token) {
//         User.findById(req.params.id,function (err, events) {
//             if (err) return (err);
//             res.json(events);
//           });
//     } else {
//       return res.status(403).send({success: false, msg: 'Unauthorized.'});
//     }
//   });

// router
// .route("/:id")
// .get(function(req, res) {
//   User
//     .findById(req.params.id)
//     .then(dbModel => res.json(dbModel))
//     .catch(err => res.status(422).json(err));
// })


//this one works
router.get('/', passport.authenticate('jwt', {
  session: false
}), function (req, res) {
  var token = getToken(req.headers);
  console.log(req)
  console.log(res)
  if (token) {
    User.find(function (err, events) {
      if (err) return (err);
      console.log(events)
      res.json(events);
    });
  } else {
    return res.status(403).send({
      success: false,
      msg: 'Unauthorized.'
    });
  }
});

router.get('/:id', passport.authenticate('jwt', {
  session: false
}), function (req, res) {
  var token = getToken(req.headers);
  console.log(req.params.id);
  // console.log(res)
  if (token) {
    // User.find({},function (err, events) {
    User.find({
      _id: req.params.id
    }, function (err, events) {
      if (err) return (err);
      console.log(events)
      res.json(events);
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
  console.log("user id: " + req.params.id);
  console.log("user events: " + req.body.params.yourHostedEvents1);
  console.log("user events: " + req.body.params.functionToRun);
  console.log("user events: " + req.body.params.yourNewEvent);
  console.log("user interest: " + req.body.params.interest);


  if (req.body.params.functionToRun === 1) {
    if (token) {
      // User.find({},function (err, events) {
      User.findOneAndUpdate({
          _id: req.params.id
        }, {
          $set: {
            yourHostedEvents: req.body.params.yourHostedEvents1
          }
        })
        .then(function (dbUser) {
          // If the User was updated successfully, send it back to the client
          res.json(dbUser);
        })
        .catch(function (err) {
          // If an error occurs, send it back to the client
          res.json(err);
        });
    }
  } else if (req.body.params.functionToRun === 2){
    if (token) {
      console.log("func running2")
      // User.find({},function (err, events) {
      User.findOneAndUpdate({
          _id: req.params.id
        }, {
          $push: {
            yourHostedEvents: req.body.params.yourHostedEvents1
          }
        })
        .then(function (dbUser) {
          // If the User was updated successfully, send it back to the client
          res.json(dbUser);
        })
        .catch(function (err) {
          // If an error occurs, send it back to the client
          res.json(err);
        });
    }
  } else if(req.body.params.functionToRun === 3){
    if (token) {
      console.log("func running 3")
      
      User.findOneAndUpdate({
          _id: req.params.id
        }, {
          $push: {
            yourEvents: req.body.params.yourNewEvent
          }
        })
        .then(function (dbUser) {
          // If the User was updated successfully, send it back to the client
          res.json(dbUser);
        })
        .catch(function (err) {
          // If an error occurs, send it back to the client
          res.json(err);
        });
    }
  } else if (req.body.params.functionToRun === 4){
    if (token) {
      console.log("func running 4")
      
      User.findOneAndUpdate({
          _id: req.params.id
        }, {
          $push: {
            interests: req.body.params.interest
          }
        })
        .then(function (dbUser) {
          // If the User was updated successfully, send it back to the client
          res.json(dbUser);
        })
        .catch(function (err) {
          // If an error occurs, send it back to the client
          res.json(err);
        });
    }
  }

  // console.log(res)

});

// router.get('/:id', passport.authenticate('jwt', { session: false}), function(req, res) {
//     var token = getToken(req.headers);
//     // console.log(req)
//     // console.log(res)
//     if (token) {
//       // User.find({},function (err, events) {
//       User.find({},function (err, events) {
//       if (err) return (err);
//           console.log(events)
//           res.json(events);
//         });
//       } else {
//         return res.status(403).send({success: false, msg: 'Unauthorized.'});
//       }
//   });

module.exports = router;