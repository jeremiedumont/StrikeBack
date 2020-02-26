const express = require('express');
const router = express.Router();
const Remark = require('../models/remark.model')

//GET REQUESTS
router.get('', (req,res,next) => {
    const { remarkId } = req
})

//POST REQUESTS

//PUT REQUESTS

//DELETE REQUESTS

module.exports = router;