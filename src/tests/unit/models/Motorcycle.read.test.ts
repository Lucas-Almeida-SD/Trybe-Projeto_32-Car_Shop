import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
import MotorcycleModel from '../../../models/Motorcycle.model';
import * as motorcycleMock from '../mocks/motorcycleMock';

describe('Testes de MotorcycleModel', () => {
  const motorcycleModel = new MotorcycleModel();

  describe('Método "read"', () => {

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
});