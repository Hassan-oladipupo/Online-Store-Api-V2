const express = require('express');
const router = express.Router();
const paymentServiceController = require('../Controller/paymentServiceController');
const accessControlValidation = require('../middleware/accessControlValidation');

router.post('/initialize', 
    accessControlValidation.validateToken,
    paymentServiceController.initializeTransaction
);

router.post('/verify/:reference', 
    accessControlValidation.validateToken,
    paymentServiceController.verifyPayment
);

module.exports = router;
