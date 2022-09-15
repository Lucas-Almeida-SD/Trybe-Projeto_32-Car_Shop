import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
import MotorcycleModel from '../../../models/Motorcycle.model';
import * as motorcycleMock from '../mocks/motorcycleMock';

describe('Testes de MotorcycleModel', () => {
  const motorcycleModel = new MotorcycleModel();

  describe.only('Método "create"', () => {

    before(() => {
      sinon.stub(Model, 'create').resolves(motorcycleMock.validMotorcycleWithId);
    });

    after(() => [
      sinon.restore()
    ]);

    describe('Quando a criação da moto ocorre com sucesso', () => {
      it('Retorna o objeto criado', async () => {
        const result = await motorcycleModel
          .create(motorcycleMock.validMotorcycle);

        expect(result).to.be.eqls(motorcycleMock.validMotorcycleWithId);
      });
    });
  });

  describe.only('Método "read"', () => {

    before(() => {
      sinon.stub(Model, 'find')
      .onCall(0).resolves([motorcycleMock.validMotorcycleWithId])
      .onCall(1).resolves([]);
    });

    after(() => [
      sinon.restore()
    ]);

    it('É possível listar as motos com sucesso', async () => {
      const result = await motorcycleModel.read();

      expect(result).to.be.eqls([motorcycleMock.validMotorcycleWithId]);
    });

    it('Retorna uma lista vazia se não houver motos', async () => {
      const result = await motorcycleModel.read();

      expect(result).to.be.eqls([]);
    });
  });

  describe.only('Método "readOne"', () => {

    before(() => {
      sinon.stub(Model, 'findOne')
      .onCall(0).resolves(motorcycleMock.validMotorcycleWithId)
      .onCall(1).resolves(null);
    });

    after(() => [
      sinon.restore()
    ]);

    it('É possível listar uma moto com sucesso pelo id', async () => {
      const result = await motorcycleModel.readOne(motorcycleMock.validMotorcycleWithId._id);

      expect(result).to.be.eqls(motorcycleMock.validMotorcycleWithId);
    });

    it('Retorna "null" se não encontrar a moto pelo id', async () => {
      const result = await motorcycleModel.readOne('idInexistente');

      expect(result).to.be.eqls(null);
    });
  });
});