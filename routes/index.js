var express = require('express');
var router = express.Router();
var User = require('../models/index');
var Project = require('../models/project');
var Work = require('../models/work');

router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Express'
  });
});

var auth = function (req, res, next) {
  if (req.session && req.session.userData)
    return next();
  else
    return res.sendStatus(401);
};



//login
router.post('/login', function (req, res, next) {
  if (req.body) {
    if (req.body.email && req.body.password) {
      User.login(req.body, function (err, rows) {
        if (err) {
          res.json(err);
        } else {
          if (rows.length > 0) {
            req.session.userData = rows[0];
            console.log("user logged in", req.session.userData)
            res.json({
              value: true,
              data: rows[0]
            });
          } else {
            res.json({
              value: false,
              message: "Please enter correct username/password"
            });
          }
        }
      });
    } else {
      res.json({
        value: false,
        message: "Please provide parameters"
      });
    }
  } else {
    res.json({
      value: false,
      message: "Invalid Request"
    });
  }

});


//logout
router.get('/logout', function (req, res) {
  req.session.destroy();
  res.json({
    value: false,
    message: "Logout successful"
  });
});


//user
router.get('/getUser/:id?', function (req, res, next) {
  if (req.params.id) {
    User.getUserById(req.params.id, function (err, rows) {
      if (err) {
        res.json(err);
      } else {
        if (rows && rows.length > 0) {
          res.json({
            value: true,
            data: rows[0]
          });
        } else {
          res.json({
            value: false,
            message: "User not found"
          });
        }

      }
    });
  } else {
    User.getAllUser(function (err, rows) {
      if (err) {
        res.json(err);
      } else {

        res.json({
          value: true,
          data: rows
        });
      }
    });
  }
});


router.get('/deleteUser/:id?', function (req, res, next) {
  if (req.params.id) {
    User.deleteUser(req.params.id, function (err, rows) {
      if (err) {
        res.json(err);
      } else {
        res.json({
          value: true,
          message: "User deleted"
        });
      }
    });
  } else {
    res.json({
      value: false,
      message: "Please provide user id"
    });
  }
});

router.post('/addUser', auth, function (req, res, next) {
  if (req.body) {
    if (req.body.username && req.body.password) {
      User.addUser(req.body, function (err, respo) {
        if (err) {
          res.json(err);
        } else {
          res.json({
            value: true,
            message: "User added"
          });
        }
      });
    } else {
      res.json({
        value: false,
        message: "Please provide parameters"
      });
    }
  } else {
    res.json({
      value: false,
      message: "Invalid Request"
    });
  }

});


router.post('/updateUser', auth, function (req, res, next) {
  if (req.body) {
    if (req.body.id && req.body.password) {
      User.updateUser(req.body, function (err, respo) {
        if (err) {
          res.json(err);
        } else {

          res.json({
            value: true,
            message: "User updated"
          });
        }
      });
    } else {
      res.json({
        value: false,
        message: "Please provide parameters"
      });
    }
  } else {
    res.json({
      value: false,
      message: "Invalid Request"
    });
  }

});



module.exports = router;