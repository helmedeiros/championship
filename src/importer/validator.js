module.exports = (function () {
  'use strict';

  var Ajv = require('ajv');
  var schema = require('./schema');

  var ajv = new Ajv({ allErrors: true });
  var compiled = ajv.compile(schema);

  function validate(fixture) {
    var ok = compiled(fixture);
    if (ok) { return { valid: true, errors: [] }; }
    var errors = (compiled.errors || []).map(function (err) {
      return {
        path: err.dataPath || err.schemaPath || '',
        message: err.message,
        params: err.params || {}
      };
    });
    return { valid: false, errors: errors };
  }

  return { validate: validate };
}());
