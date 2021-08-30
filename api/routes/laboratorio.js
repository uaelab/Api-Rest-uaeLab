const express = require('express');
const labs = require('../models/laboratorio');
const router = express.Router();

router.get('/', (req, res) => {
    labs.find()
        .exec()
        .then( x => res.status(200).send(x) );
});

/*
router.get('/:id', (req, res) => {
    labs.find({"_id": req.params.id})
        .exec()
        .then( x => res.status(200).send(x) )
});
*/

router.get('/:asignatura', (req, res) => {
    //`${req.params.asignatura}`
    labs.find({"asignatura_id": req.params.asignatura })
        .exec()
        .then( x => res.status(200).send(x) )
});

router.post('/', (req, res) => {
    labs.create(req.body).then( x => res.status(201).send(x))
});

router.put('/:id', (req, res) => {
    labs.findByIdAndUpdate(req.params.id, req.body)
        .then(() => res.sendstatus(204))
});

router.delete('/:id', (req, res) => {
    labs.findByIdAndDelete(req.params.id).exec().then(() => res.sendstatus(204))
});

module.exports = router;