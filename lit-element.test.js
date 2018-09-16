// needed to make Jest play nicely with esm
require = require('esm')(module, {mode: 'auto'});
module.exports = require('./lit-element.js');
