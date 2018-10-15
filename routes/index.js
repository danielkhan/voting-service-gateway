const express = require('express');
const router = express.Router();
const axios = require('axios');
const sa = require('superagent');

let toggle = false;

router.get('/', (req, res, next) => {
  try {
    if(!toggle) {
      sa.get('http://localhost:3010', (e, r) => {
        res.render('index', { title: 'Express 1' });
      });
      toggle = true;
    } else {
      sa.get('http://localhost:3020', (e, r) => {
        res.render('index', { title: 'Express 2' });
      });
      toggle = false;
    }
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
