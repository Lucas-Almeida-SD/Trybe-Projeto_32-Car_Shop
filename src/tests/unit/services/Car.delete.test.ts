import { expect } from 'chai';
import sinon from 'sinon';
import CarModel from '../../../models/Car.model';
import CarService from '../../../services/Car.service';
import * as carMock from '../mocks/carMock';

const invalidId = '999999999999999999999999';

describe('Testes de CarService', () => {
  const carModel = new CarModel();
  const carService = new CarService(carModel);

  describe('Método "delete"', () => {
    
    before(() => {
      sinon.stub(carModel, 'delete')
      .onCall(0).resolves(carMock.validCarWithId)
      .onCall(1).resolves(null);
    });

    after(() => {
      sinon.restore();
    });

    describe('Quando o carro é deletado com sucesso', () => {

      it('Retorna o objeto do carro deletado', async () => {
        const result = await carService.delete(carMock.validCarWithId._id);

        expect(result).to.be.eqls(carMock.validCarWithId);
      });
    });

    describe('Quando o id é inexistente', () => {

      it('Retorna valor nulo', async () => {
        try{
          await carService.delete(invalidId);
        } catch(err) {
          expect((err as Error).message).to.be.eqls('objectNotFound');
        }
      });
    });
  });
});