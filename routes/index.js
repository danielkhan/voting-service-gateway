const express = require('express');
const router = express.Router();
const axios = require('axios');
const sa = require('superagent');
let toggle = false;

router.get('/', (req, res, next) => {
  if (!toggle) {
    sa.get('http://localhost:3010', (e, r) => {
      if (e) return next(e);
    });
    toggle = true;
    return res.render('index', { title: 'Express 1' });
  } else {
    sa.get('http://localhost:3020', (e, r) => {
      if (e) return next(e);
    });
    toggle = false;
    return res.render('index', { title: 'Express 2' });
  }
});

module.exports = router;
