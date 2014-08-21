module.exports = (function () {
  'use strict';

  var Backbone = require('backbone');

  var storage = null;

  var DISPATCHERS = {
    create: function (s, bucket, model) {
      return s.create(bucket, model.toJSON());
    },
    update: function (s, bucket, model) {
      return s.update(bucket, model.toJSON());
    },
    patch: function (s, bucket, model) {
      return s.update(bucket, model.toJSON());
    },
    read: function (s, bucket, model) {
      if (model.id !== undefined && model.id !== null) {
        return s.read(bucket, model.id);
      }
      return s.list(bucket);
    },
    'delete': function (s, bucket, model) {
      return s.destroy(bucket, model.id);
    }
  };

  var BaseModel = Backbone.Model.extend({

    bucket: null,

    _bucketName: function () {
      if (!this.bucket) {
        throw new Error('Modelo sem bucket de armazenamento definido');
      }
      return this.bucket;
    },

    sync: function (method, model, options) {
      var opts = options || {};
      var dispatcher = DISPATCHERS[method];
      if (!dispatcher) {
        throw new Error('Método de sync desconhecido: ' + method);
      }
      try {
        var result = dispatcher(storage, model._bucketName(), model);
        (opts.success || function () {})(result);
        return result;
      } catch (err) {
        (opts.error || function () {})(err);
        throw err;
      }
    }

  });

  BaseModel.setStorage = function (instance) {
    storage = instance;
  };

  BaseModel.getStorage = function () {
    return storage;
  };

  return BaseModel;
}());
