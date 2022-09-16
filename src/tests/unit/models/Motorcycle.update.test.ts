import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
import MotorcycleModel from '../../../models/Motorcycle.model';
import * as motorcycleMock from '../mocks/motorcycleMock';

const invalidId = '999999999999999999999999';

describe('Testes de MotorcycleModel', () => {
  const motorcycleModel = new MotorcycleModel();

  describe('Método "update"', () => {

    before(() => {
      sinon.stub(Model, 'findOneAndUpdate')
      .onCall(0).resolves(motorcycleMock.updatedMotorcycleWithId)
      .onCall(1).resolves(null);
    });

    after(() => [
      sinon.restore()
    ]);

    describe('Quando a moto é atualizada com sucesso', () => {
      it('Retorna o objeto da moto atualizado', async () => {
        const result = await motorcycleModel.update(
          motorcycleMock.validMotorcycleWithId._id,
          motorcycleMock.updatedMotorcycle,
        );

        expect(result).to.be.eqls(motorcycleMock.updatedMotorcycleWithId);
      });
    });

    describe('Quando o id é inexistente', () => {
      it('Retorna valor nulo', async () => {
        const result = await motorcycleModel.update(
          invalidId,
          motorcycleMock.updatedMotorcycle,
        );

        expect(result).to.be.eqls(null);
      });
    });
  });
});