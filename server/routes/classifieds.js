
'use strict';

const express = require('express');
const knex = require('../knex');
const router = express.Router();
const bodyParser = require('body-parser');

// YOUR CODE HERE


let selectAll = () => knex('classifieds').select(['id', 'description', 'item_image', 'price', 'title']).orderBy('title')
let selectOne = (id) => knex('classifieds').select(['id', 'description', 'item_image', 'price', 'title']).where('id', id)
let insertAd = (data) => knex('classifieds').insert(data).returning(['id', 'description', 'item_image', 'price', 'title'])
let updateAd = (data, id) => knex('classifieds').where('id', id).update(data).returning(['id', 'description', 'item_image', 'price', 'title'])
let deleteAd = (id) => knex('classifieds').del().returning(['id', 'description', 'item_image', 'price', 'title']).where('id', id)

router.get('/', (req, res, next) => {
  selectAll()
  .then(data => {
    res.send(data)
  })
})

router.get('/:id', (req, res, next) => {
  selectOne(req.params.id)
  .then(data => {
    res.send(data[0])
  })
})

router.post('/', (req, res, next) => {
insertAd(req.body)
  .then(data => {
    res.send(data[0])
  })
})

router.patch('/:id', (req, res, next) => {
updateAd((req.body),req.params.id)
  .then(data => {
    res.send(data[0])
  })
})

router.delete('/:id', (req, res, next) => {
  deleteAd(req.params.id)
  .then(data => {
    // delete data[0].id
    res.send(data[0])
  })
})

module.exports = router;
