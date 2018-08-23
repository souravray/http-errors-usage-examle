const express = require('express')
  , router = express.Router()
  , { BadRequest, Unauthorized, 
    Forbidden, PaymentRequired } = require('http-errors')
  , createErr = require('http-errors');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('this is not an error');
});

router.get('/bad-request', function(req, res, next) {
  next(createErr(400, 'I dont like your request', 
    {info: { mssage: 'missing', key: 'email'}}));
});


router.get('/unauthorized', function(req, res, next) {
  next(BadRequest('Who are you?'));
});

router.post('/forbidden', function(req, res, next) {
  next(Unauthorized('Gosh! What are you doing here?'));
});

router.get('/pay-required', function(req, res, next) {
  next(PaymentRequired('You already owe me a boat load of money!!', 
    { info: {message: 'Wire me some money', key: 'ImBroke'}}));
});

module.exports = router;
