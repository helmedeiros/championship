'use strict';

var Photo = require('../../../src/models/photo');

describe('models/Photo', function () {

  it('aceita URL externa', function () {
    var foto = new Photo({ ownerType: 'team', ownerId: 'sao', url: 'sao.jpg' });
    expect(foto.get('url')).to.equal('sao.jpg');
  });

  it('aceita data URL embutida', function () {
    var foto = new Photo({
      ownerType: 'player', ownerId: 'p1',
      url: 'data:image/png;base64,aGVsbG8='
    });
    expect(foto.isValid()).to.equal(true);
  });

  it('mantém legenda e tags', function () {
    var foto = new Photo({
      ownerType: 'match', ownerId: 'm1', url: 'gol.jpg',
      caption: 'Gol do título', tags: ['gol', 'final']
    });
    expect(foto.get('caption')).to.equal('Gol do título');
    expect(foto.get('tags')).to.deep.equal(['gol', 'final']);
  });

  it('exige URL ou data: para a foto', function () {
    var foto = new Photo({ ownerType: 'team', ownerId: 'x' });
    expect(foto.isValid()).to.equal(false);
    expect(foto.validationError).to.equal('A foto precisa de uma URL ou conteúdo data:');
  });

  it('rejeita tipo de proprietário desconhecido', function () {
    var foto = new Photo({ ownerType: 'arbitro', ownerId: 'a', url: 'x.jpg' });
    expect(foto.isValid()).to.equal(false);
    expect(foto.validationError).to.equal('Tipo de proprietário da foto desconhecido');
  });

});
