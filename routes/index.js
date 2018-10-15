const express = require('express');
const router = express.Router();
const axios = require('axios');
let toggle = false;
/* GET home page. */
router.get('/', async (req, res, next) => {
  try {
    if(!toggle) {
      await axios.get('http://localhost:3010');
      toggle = true;
    } else {
      await axios.get('http://localhost:3020');
      toggle = false;
    }
    res.render('index', { title: 'Express' });
  } catch (err) {
    console.log(err);
    return res.status(500).end();
  }

});

module.exports = router;
