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
                budget: req.body.budget,
                public_id: crypto.randomBytes(3).toString('hex')
            },
            users: [userInfo],
            feed: []
        },
        users: [req.body.creator]
    }

    const tab = new TabModel(modelDetails);

    try {
        // res.status(200).json({message: `New tab created`, response: modelDetails});
        const addTab = await tab.save();
        res.status(200).json({message: `New tab created`, response: addTab});
    } catch(err) {
        console.log(err);
        res.status(400).json({message: `error`, error: err});
    }
});

router.post(`/load`, async (req, res) => {
    try {
        TabModel.findOne({id: req.body.id}, (err, doc) => {
            if (err) {
                console.log(err);
                res.status(400).json({message: `error`, error: err});
            }

            const tabDetails = {
                creator: doc.creator,
                data: doc.data,
                date: doc.date,
                users: doc.users,
                id: doc.id
            }

            res.status(200).json({message: `Tab loaded`, response: tabDetails});
        });

    } catch(err) {
        console.log(err);
        res.status(400).json({message: `error`, error: err});
    }
});

router.post(`/purchase`, async (req, res) => {
    
    let purchase = {
        id: req.body.id,
        item: req.body.item,
        amount: req.body.amount,
        details: req.body.details,
        userId: req.body.userId,
        name: req.body.name,
        avatar: req.body.avatar,
        action: req.body.action,
        time: req.body.time
    }

    try {

        TabModel.updateOne({id: req.body.id}, {$push: {'data.feed': purchase}}, (err, doc) => {
            if (err) {
                console.log(err);
                res.status(400).json({message: `error`, error: err});
            }

            res.status(200).json({message: `Purchase added`, response: {}});
        });

    } catch(err) {
        console.log(err);
        res.status(400).json({message: `error`, error: err});
    }
});

router.post(`/join`, async (req, res) => {
    try {
        TabModel.findOne({'data.info.public_id': req.body.code}, (err, doc) => {
            if (err) {
                console.log(err);
                res.status(400).json({message: `error`, error: err});
                return;
            }

            if (doc === null) {
                res.status(201).json({message: `Invalid Code`, response: {}});
                return;
            }

            const response = {
                id: doc.id
            }

            res.status(200).json({message: `Valid code`, response: response});
        });
    } catch(err) {
        console.log(err);
        res.status(400).json({message: `error`, error: err});
    }
});

module.exports = router;