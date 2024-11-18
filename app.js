const express = require('express');
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require('cookie-parser');
const { parse } = require('csv-parse/sync');
const { stringify } = require('csv-stringify/sync');
const fs = require('fs');
const knex = require('knex')(require('./knexfile.js')["development"])

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));
app.use(cookieParser());


app.get('/', (req, res) => res.send('Hello World'));


app.get('/pets', (req, res) => {
    knex('pet')
        .select('*')
        .then(pets => {
            var petNames = pets.map(pet => pet.name)
            res.json(petNames);
        })
})

module.exports = app;