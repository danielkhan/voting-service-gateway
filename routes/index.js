const express = require('express');
const router = express.Router();
const axios = require('axios');
const sa = require('superagent');

let toggle = false;

router.get('/', (req, res, next) => {
  try {
    if(!toggle) {
      sa.get('http://localhost:3010', (err, res) => {
        res.render('index', { title: 'Express 1' });
      });
      toggle = true;
    } else {
      sa.get('http://localhost:3020', (err, res) => {
        res.render('index', { title: 'Express 2' });
      });
      toggle = false;
    }
  } catch (err) {
    console.log(err);
    return res.status(500).end();
  }
});

module.exports = router;
