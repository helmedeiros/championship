'use strict';

require('../../../helpers/dom')({ reset: true });

var UploadWidget = require('../../../../src/views/widgets/upload_widget');

function FakeFileReader() {
  this.result = null;
  this.error = null;
  this.onload = null;
  this.onerror = null;
}
FakeFileReader.prototype.readAsDataURL = function (file) {
  var self = this;
  setTimeout(function () {
    self.result = 'data:image/png;base64,' + (file && file.name);
    if (self.onload) { self.onload(); }
  }, 0);
};

describe('views/widgets/UploadWidget', function () {

  it('renderiza placeholder quando não há imagem', function () {
    var widget = new UploadWidget();
    widget.render();
    expect(widget.$('.upload-empty').length).to.equal(1);
    expect(widget.$('input[type="file"]').length).to.equal(1);
  });

  it('renderiza preview quando inicializado com valor data URL', function () {
    var widget = new UploadWidget({ value: 'data:image/png;base64,abc' });
    widget.render();
    expect(widget.$('.upload-preview').attr('src')).to.equal('data:image/png;base64,abc');
  });

  it('dispara upload:loaded com data URL após selecionar arquivo', function (done) {
    var widget = new UploadWidget({ FileReader: FakeFileReader });
    widget.render();
    widget.on('upload:loaded', function (dataUrl) {
      try {
        expect(dataUrl).to.match(/^data:image\/png;base64,escudo\.png$/);
        expect(widget.value).to.equal(dataUrl);
        done();
      } catch (err) { done(err); }
    });
    widget.onPick({ target: { files: [{ name: 'escudo.png' }] } });
  });

  it('ignora seleção vazia sem disparar eventos', function () {
    var widget = new UploadWidget({ FileReader: FakeFileReader });
    widget.render();
    var loaded = sinon.spy();
    widget.on('upload:loaded', loaded);
    widget.onPick({ target: { files: [] } });
    expect(loaded.callCount).to.equal(0);
  });

});
