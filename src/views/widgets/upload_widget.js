module.exports = (function () {
  'use strict';

  var Marionette = require('backbone.marionette');

  function readAsDataURL(file, FileReaderCtor, done) {
    var reader = new FileReaderCtor();
    reader.onload = function () { done(null, reader.result); };
    reader.onerror = function () { done(reader.error || new Error('falha de leitura')); };
    reader.readAsDataURL(file);
  }

  return Marionette.ItemView.extend({

    className: 'upload-widget',

    template: function (data) {
      var current = data && data.value;
      var preview = current ?
        '<img class="upload-preview" src="' + current + '" alt="">' :
        '<span class="upload-empty text-muted">sem imagem</span>';
      return '' +
        '<div class="upload-preview-wrapper">' + preview + '</div>' +
        '<input type="file" accept="image/*" class="upload-input">';
    },

    events: {
      'change .upload-input': 'onPick'
    },

    initialize: function (options) {
      this.value = (options && options.value) || '';
      this.FileReaderCtor = (options && options.FileReader) ||
        (typeof window !== 'undefined' ? window.FileReader : null);
    },

    serializeData: function () {
      return { value: this.value };
    },

    onPick: function (e) {
      var files = e && e.target && e.target.files;
      if (!files || files.length === 0) { return; }
      if (!this.FileReaderCtor) {
        this.trigger('upload:error', new Error('FileReader indisponível'));
        return;
      }
      var view = this;
      readAsDataURL(files[0], this.FileReaderCtor, function (err, dataUrl) {
        if (err) { view.trigger('upload:error', err); return; }
        view.value = dataUrl;
        view.render();
        view.trigger('upload:loaded', dataUrl);
      });
    }

  });
}());
