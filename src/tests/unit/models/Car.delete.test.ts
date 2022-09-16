import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
import * as carMock from '../mocks/carMock';
import CarModel from '../../../models/Car.model';

const invalidId = '999999999999999999999999';

describe('Testes de CarModel', () => {
  const carModel = new CarModel();

  describe('Método "delete"', () => {

    before(() => {
      sinon.stub(Model, 'findOneAndDelete')
      .onCall(0).resolves(carMock.validCarWithId)
      .onCall(1).resolves(null);
    });

    after(() => {
      sinon.restore();
    });

    describe('Quando o carro é deletado com sucesso', () => {
      it('Retorna o objeto do carro deletado', async () => {
        const result = await carModel.delete(carMock.validCarWithId._id);
  
        expect(result).to.be.eqls(carMock.validCarWithId);
      });
    });

    describe('Quando o id não existe', () => {
      it('Retorna valor nulo', async () => {
        const result = await carModel.delete(invalidId);
  
        expect(result).to.be.eqls(null);
      });
    })
  });
});