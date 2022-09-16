import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
import * as carMock from '../mocks/carMock';
import CarModel from '../../../models/Car.model';

const invalidId = '999999999999999999999999';

describe('Testes de CarModel', () => {
  const carModel = new CarModel();

  describe('Método "update"', () => {

    before(() => {
      sinon.stub(Model, 'findOneAndUpdate')
      .onCall(0).resolves(carMock.updatedCarWithId)
      .onCall(1).resolves(null);
    });

    after(() => {
      sinon.restore();
    });

    describe('Quando o carro é atualizado com sucesso', () => {
      it('Retorna o objeto do carro atualizado', async () => {
        const result = await carModel.update(carMock.validCarWithId._id, carMock.updatedCar);
  
        expect(result).to.be.eqls(carMock.updatedCarWithId);
      });
    });

    describe('Quando o id não existe', () => {
      it('Retorna valor nulo', async () => {
        const result = await carModel.update(invalidId, carMock.updatedCar);
  
        expect(result).to.be.eqls(null);
      });
    })
  });
});