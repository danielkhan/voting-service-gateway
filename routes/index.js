const express = require('express');
const router = express.Router();
const axios = require('axios');
/* GET home page. */
router.get('/', async (req, res, next) => {
  try {
    // const s1 = await axios.get('http://localhost:3010');
    // const s2 = await axios.get('http://localhost:3020');
    res.render('index', { title: 'Express' });
  } catch (err) {
    console.log(err);
    return res.status(500);
  }

});

module.exports = router;
