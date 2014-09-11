module.exports = (function () {
  'use strict';

  function LocalStorageAdapter(options) {
    var opts = options || {};
    this.prefix = opts.prefix || 'championship';
    this.storage = opts.storage || (typeof window !== 'undefined' && window.localStorage);
    if (!this.storage) {
      throw new Error('LocalStorageAdapter: window.localStorage indisponível');
    }
    var raw = this.storage.getItem(this.prefix + ':seq');
    this.nextId = raw ? parseInt(raw, 10) : 1;
  }

  function copy(src) {
    var out = {};
    var key;
    for (key in src) {
      if (src.hasOwnProperty(key)) { out[key] = src[key]; }
    }
    return out;
  }

  LocalStorageAdapter.prototype._key = function (bucket) {
    return this.prefix + ':' + bucket;
  };

  LocalStorageAdapter.prototype._load = function (bucket) {
    var raw = this.storage.getItem(this._key(bucket));
    return raw ? JSON.parse(raw) : [];
  };

  LocalStorageAdapter.prototype._save = function (bucket, list) {
    this.storage.setItem(this._key(bucket), JSON.stringify(list));
  };

  LocalStorageAdapter.prototype._nextId = function () {
    var id = String(this.nextId);
    this.nextId = this.nextId + 1;
    this.storage.setItem(this.prefix + ':seq', String(this.nextId));
    return id;
  };

  LocalStorageAdapter.prototype.create = function (bucket, attrs) {
    var record = copy(attrs);
    record.id = attrs.id || this._nextId();
    var list = this._load(bucket);
    list.push(record);
    this._save(bucket, list);
    return record;
  };

  LocalStorageAdapter.prototype.update = function (bucket, attrs) {
    if (!attrs.id) {
      throw new Error('update requer um id');
    }
    var list = this._load(bucket);
    var i;
    for (i = 0; i < list.length; i = i + 1) {
      if (list[i].id === attrs.id) {
        list[i] = copy(attrs);
        this._save(bucket, list);
        return list[i];
      }
    }
    list.push(copy(attrs));
    this._save(bucket, list);
    return attrs;
  };

  LocalStorageAdapter.prototype.read = function (bucket, id) {
    var list = this._load(bucket);
    var i;
    for (i = 0; i < list.length; i = i + 1) {
      if (list[i].id === id) { return list[i]; }
    }
    return null;
  };

  LocalStorageAdapter.prototype.list = function (bucket) {
    return this._load(bucket);
  };

  LocalStorageAdapter.prototype.destroy = function (bucket, id) {
    var list = this._load(bucket);
    var kept = [];
    var i;
    for (i = 0; i < list.length; i = i + 1) {
      if (list[i].id !== id) { kept.push(list[i]); }
    }
    this._save(bucket, kept);
    return true;
  };

  LocalStorageAdapter.prototype.reset = function () {
    var keys = [];
    var i;
    for (i = 0; i < this.storage.length; i = i + 1) {
      var k = this.storage.key(i);
      if (k && k.indexOf(this.prefix + ':') === 0) {
        keys.push(k);
      }
    }
    for (i = 0; i < keys.length; i = i + 1) {
      this.storage.removeItem(keys[i]);
    }
    this.nextId = 1;
  };

  return LocalStorageAdapter;
}());
