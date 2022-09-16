import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
import MotorcycleModel from '../../../models/Motorcycle.model';
import * as motorcycleMock from '../mocks/motorcycleMock';

const invalidId = '999999999999999999999999';

describe('Testes de MotorcycleModel', () => {
  const motorcycleModel = new MotorcycleModel();

  describe('Método "delete"', () => {

    before(() => {
      sinon.stub(Model, 'findOneAndDelete')
      .onCall(0).resolves(motorcycleMock.validMotorcycleWithId)
      .onCall(1).resolves(null);
    });

    after(() => [
      sinon.restore()
    ]);

    describe('Quando a moto é deletada com sucesso', () => {
      it('Retorna o objeto da moto deletada', async () => {
        const result = await motorcycleModel.delete(
          motorcycleMock.validMotorcycleWithId._id,
        );

        expect(result).to.be.eqls(motorcycleMock.validMotorcycleWithId);
      });
    });

    describe('Quando o id é inexistente', () => {
      it('Retorna valor nulo', async () => {
        const result = await motorcycleModel.delete(
          invalidId,
        );

        expect(result).to.be.eqls(null);
      });
    });
  });
});