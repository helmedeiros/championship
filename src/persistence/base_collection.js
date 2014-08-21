module.exports = (function () {
  'use strict';

  var Backbone = require('backbone');
  var BaseModel = require('./base_model');

  return Backbone.Collection.extend({

    bucket: null,

    _bucketName: function () {
      if (this.bucket) { return this.bucket; }
      if (this.model && this.model.prototype && this.model.prototype.bucket) {
        return this.model.prototype.bucket;
      }
      throw new Error('Coleção sem bucket de armazenamento definido');
    },

    sync: function (method, collection, options) {
      var opts = options || {};
      var done = opts.success || function () {};
      var fail = opts.error || function () {};
      var storage = BaseModel.getStorage();
      try {
        if (method !== 'read') {
          throw new Error('Coleções só suportam sync read; salve modelos individualmente');
        }
        var records = storage.list(collection._bucketName());
        done(records);
        return records;
      } catch (err) {
        fail(err);
        throw err;
      }
    }

  });
}());
