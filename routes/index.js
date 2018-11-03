const express = require('express');
const router = express.Router();
const axios = require('axios');
const request = require('request');
const opentracing = require('opentracing');
let toggle = 0;


module.exports = (tracer) => {

  router.get('/', (req, res, next) => {
    console.log(req.headers);
    if (1==1 || toggle < 3) {
      const span = tracer.startSpan('http_request');
      request.get(`http://localhost:3010?choice=${req.query.choice}`, (e, r) => {
        if (e) {
          span.setTag(opentracing.Tags.ERROR, true);
          span.log({'event': 'error', 'error.object': e, 'message': e.message, 'stack': e.stack});
          span.finish();
          return next(e);
        }
        if(r.statusCode > 299) {
          toggle++;
          span.setTag(opentracing.Tags.ERROR, true);
          span.log({'event': 'error', type: 'general upstream error'});
          span.finish();
          return res.status(r.statusCode).json({error: 'Something went wrong!'});
        }
        span.log({'event': 'request_end'});
        span.finish();
        toggle++;
        return res.json(JSON.parse(r.body));
      });
    } else {
      toggle = 0;
      request.get(`http://localhost:3020?choice=${req.query.choice}`, (e, r) => {
        if (e) return next(e);
        if(r.statusCode > 299) {
          return res.status(r.statusCode).json({error: 'Something went wrong!'});
        }
        return res.json(JSON.parse(r.body));
      });
    }
  });
  return router;
}
