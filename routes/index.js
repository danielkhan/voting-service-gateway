const express = require('express');
const router = express.Router();
const axios = require('axios');
/* GET home page. */
router.get('/', async (req, res, next) => {
  const s1 = await axios.get('http://localhost:3010');
  const s2 = await axios.get('http://localhost:3020');
  res.render('index', { title: 'Express' });
});

module.exports = router;
