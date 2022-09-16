import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
import MotorcycleModel from '../../../models/Motorcycle.model';
import * as motorcycleMock from '../mocks/motorcycleMock';

const invalidId = '999999999999999999999999';

describe('Testes de MotorcycleModel', () => {
  const motorcycleModel = new MotorcycleModel();

  describe('Método "readOne"', () => {

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
      const result = await motorcycleModel.readOne(invalidId);

      expect(result).to.be.eqls(null);
    });
  });
});