var express = require('express');
var router = express.Router();
//var path = require('path');
// import the global schema, this can be done in any file that needs the model
var pH = require('../db/pH.js');
var pHSchema =require('mongoose').model('pH').schema;
var Chlore = require('../db/Chlore.js');
var Temp = require('../db/Temperature.js');

/******************************************************************************
***********************************pH******************************************
*******************************************************************************/
//add a new pH mesure
router.post('/pH', function(req, res, next) {
    var data = {
        mesure: req.body.mesure,
        bac:req.body.bac
    };

    pH.add(data, function(err, ph) {
        if (err) {
            return res.status(500).json({
                success: false,
                msg: err
            });
        }
        res.status(200).json({
            success: true,
            msg: 'Successful added pH mesure'
        });
    });
});
//get last pH mesure
router.get('/pH', function(req, res, next) {
    pH.findlast(function(err,ph) {
      if(err)
      {
        return res.status(500).json({
            success: false,
            msg: err
        });
      }
        res.status(200).json(ph);
    });
});

//get all phH mesures
router.get('/pH/historique', function(req, res, next) {
    pH.findall(function(err,historique) {
      if(err)
      {
        return res.status(500).json({
            success: false,
            msg: err
        });
      }
        res.status(200).json(historique);
    });
});
/*******************************************************************************
************************************Chlore**************************************
*******************************************************************************/
//add a new chlore mesure
router.post('/chlore', function(req, res, next) {
  var data = {
      mesure: req.body.mesure,
      bac: req.body.bac
  };

  Chlore.add(data, function(err, chlore) {
      if (err) {
          return res.status(500).json({
              success: false,
              msg: err
          });
      }
      res.status(200).json({
          success: true,
          msg: 'Successful added Chlore mesure'
      });
  });
});
//find last chlore mesure
router.get('/chlore', function(req, res, next) {
  Chlore.findlast(function(err,chlore) {
    if(err)
    {
      return res.status(500).json({
          success: false,
          msg: err
      });
    }
      res.status(200).json(chlore);
  });
});
//get all chlore mesures
router.get('/chlore/historique', function(req, res, next) {
  Chlore.findall(function(err,historique) {
    if(err)
    {
      return res.status(500).json({
          success: false,
          msg: err
      });
    }
      res.status(200).json(historique);
  });
});
/*******************************************************************************
*********************************Temperature************************************
*******************************************************************************/
//add a temperature mesure
router.post('/Temperature', function(req, res, next) {
  var data = {
      mesure: req.body.mesure
  };
  Temp.add(data, function(err, temp) {
      if (err) {
          return res.status(500).json({
              success: false,
              msg: err.msg
          });
      }
      res.status(200).json({
          success: true,
          msg: 'Successful added Temperature mesure'
      });
  });
});
//get the last temperature mesure
router.get('/Temperature', function(req, res, next) {
  Temp.findlast(function(err,temp) {
    if(err)
    {
      return res.status(500).json({
          success: false,
          msg: err
      });
    }
      res.status(200).json(temp);
  });
});
//get all the temperature mesures
router.get('/Temperature/historique', function(req, res, next) {
  Temp.findall(function(err,historique) {
    if(err)
    {
      return res.status(500).json({
          success: false,
          msg: err
      });
    }
      res.status(200).json(historique);
  });
});

//test
router.post('/toto', function(req, res, next) {

      res.send(req.body);
});
module.exports = router;
