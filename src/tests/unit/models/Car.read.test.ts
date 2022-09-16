import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
import * as carMock from '../mocks/carMock';
import CarModel from '../../../models/Car.model';

describe('Testes de CarModel', () => {
  const carModel = new CarModel();

  describe('Método "read"', () => {
    before(() => {
      sinon.stub(Model, 'find')
      .onCall(0).resolves([carMock.validCarWithId])
      .onCall(1).resolves([]);
    });

    after(() => {
      sinon.restore();
    });

    it('É possível listar os carros com sucesso', async () => {
      const result = await carModel.read();

      expect(result).to.be.eqls([carMock.validCarWithId]);
    });

    it('Retorna uma lista vazia se não houver carros', async () => {
      const result = await carModel.read();

      expect(result).to.be.eqls([]);
    });
  });
});