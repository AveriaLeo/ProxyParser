"use strict";

var
    express = require('express'),
    app = express(),
    rmq = require('./module/executor');

module.exports = app;