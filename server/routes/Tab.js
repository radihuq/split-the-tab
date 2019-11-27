const express = require('express');
const router = express.Router();
const TabModel = require('../models/TabModel');
const crypto = require('crypto');

router.post(`/new`, async (req, res) => {
    const userInfo = {
        id: req.body.creator
    }

    const modelDetails = {
        id: crypto.randomBytes(8).toString('hex'),
        creator: req.body.creator,
        data: {
            info: {
                title: req.body.title,
                description: req.body.description,
                budget: req.body.budget
            },
            users: [userInfo]
        },
        users: [req.body.creator]
    }

    const tab = new TabModel(modelDetails);

    try {
        const addTab = await tab.save();
        res.status(200).json({message: `Received POST request`, response: addTab});
    } catch(err) {
        console.log(err);
        res.status(400).json({message: `error`, error: err});
    }
});

module.exports = router;