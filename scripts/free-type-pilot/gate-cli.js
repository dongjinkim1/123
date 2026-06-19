'use strict';
var gate = require('./gate.js');
var fs = require('fs');
var elem = process.argv[2];
var text = fs.readFileSync(process.argv[3], 'utf8');
console.log(JSON.stringify(gate.scoreText(elem, text)));
