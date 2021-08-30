const express = require('express');
const material = require('../models/material');
const router = express.Router();

router.get('/', (req, res) => {
    material.find()
        .exec()
        .then( x => res.status(200).send(x) );
});

/*
router.get('/:id', (req, res) => {
    material.findById(req.params.id)
        .exec()
        .then( x => res.status(200).send(x) )
});
*/


router.get('/:guia', (req, res) => {
    //`${req.params.asignatura}`
    material.find({"guia_id": req.params.guia })
        .exec()
        .then( x => res.status(200).send(x) )
});

router.post('/', (req, res) => {
    material.create(req.body).then( x => res.status(201).send(x))
});

router.put('/:id', (req, res) => {
    material.findByIdAndUpdate(req.params.id, req.body)
        .then(() => res.sendstatus(204))
});

router.delete('/:id', (req, res) => {
    material.findByIdAndDelete(req.params.id).exec().then(() => res.sendstatus(204))
});

module.exports = router;