const express = require('express');
const router = express.Router();
const axios = require('axios');
const request = require('request');
let toggle = 0;

router.get('/', (req, res, next) => {
  if (toggle % 3 !== 0) {
    request.get(`http://localhost:3010?choice=${req.query.choice}`, (e, r) => {
      if (e) return next(e);
      if(r.statusCode > 299) {
        return res.status(r.statusCode).json({error: 'Something went wrong!'});
      }
      toggle++;
      return res.json(JSON.parse(r.body));
    });
  } else {
    request.get(`http://localhost:3020?choice=${req.query.choice}`, (e, r) => {
      if (e) return next(e);
      if(r.statusCode > 299) {
        return res.status(r.statusCode).json({error: 'Something went wrong!'});
      }
      toggle++;
      return res.json(JSON.parse(r.body));
    });
  }
});

module.exports = router;
