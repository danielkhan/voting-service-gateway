const express = require('express');
const router = express.Router();
const axios = require('axios');
const request = require('request');
let toggle = false;

router.get('/', (req, res, next) => {
  if (!toggle) {

    request.get(`http://localhost:3010?choice=${req.query.choice}`, (e, r) => {
      if (e) return next(e);
      return res.json(JSON.parse(r.body));
    });
    toggle = true;
    
  } else {
    request.get(`http://localhost:3020?choice=${req.query.choice}`, (e, r) => {
      if (e) return next(e);
      console.log(r);
      return res.json(JSON.parse(r.body));
    });
  }
});

module.exports = router;
