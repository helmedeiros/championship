module.exports = (function () {
  'use strict';

  function MemoryStorage() {
    this.buckets = {};
    this.nextId = 1;
  }

  MemoryStorage.prototype._bucket = function (name) {
    if (!this.buckets[name]) {
      this.buckets[name] = {};
    }
    return this.buckets[name];
  };

  MemoryStorage.prototype.create = function (name, attrs) {
    var bucket = this._bucket(name);
    var id = attrs.id || String(this.nextId);
    this.nextId = this.nextId + 1;
    var record = {};
    var key;
    for (key in attrs) {
      if (attrs.hasOwnProperty(key)) {
        record[key] = attrs[key];
      }
    }
    record.id = id;
    bucket[id] = record;
    return record;
  };

  MemoryStorage.prototype.update = function (name, attrs) {
    if (!attrs.id) {
      throw new Error('update requer um id');
    }
    var bucket = this._bucket(name);
    bucket[attrs.id] = attrs;
    return attrs;
  };

  MemoryStorage.prototype.read = function (name, id) {
    var bucket = this._bucket(name);
    return bucket[id] || null;
  };

  MemoryStorage.prototype.list = function (name) {
    var bucket = this._bucket(name);
    var out = [];
    var key;
    for (key in bucket) {
      if (bucket.hasOwnProperty(key)) {
        out.push(bucket[key]);
      }
    }
    return out;
  };

  MemoryStorage.prototype.destroy = function (name, id) {
    var bucket = this._bucket(name);
    delete bucket[id];
    return true;
  };

  MemoryStorage.prototype.reset = function () {
    this.buckets = {};
    this.nextId = 1;
  };

  return MemoryStorage;
}());
