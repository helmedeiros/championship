'use strict';

describe('infraestrutura de testes', function () {

  it('disponibiliza expect do chai como global', function () {
    expect(expect).to.be.a('function');
  });

  it('disponibiliza sinon como global', function () {
    expect(sinon).to.be.an('object');
    expect(sinon.spy).to.be.a('function');
  });

  it('integra sinon-chai para asserções em spies', function () {
    var spy = sinon.spy();
    spy('oi');
    expect(spy).to.have.been.calledWith('oi');
  });

});
