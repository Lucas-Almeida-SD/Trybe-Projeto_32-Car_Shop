import { expect } from 'chai';
import sinon from 'sinon';
import CarModel from '../../../models/Car.model';
import CarService from '../../../services/Car.service';
import * as carMock from '../mocks/carMock';

describe('Testes de CarService', () => {
  const carModel = new CarModel();
  const carService = new CarService(carModel);

  describe('Método "read"', () => {
    before(() => {
      sinon.stub(carModel, 'read')
      .onCall(0).resolves([carMock.validCarWithId])
      .onCall(1).resolves([]);
    });

    after(() => {
      sinon.restore();
    });

    it('É possível listar os carros com sucesso', async () => {
      const result = await carService.read();

      expect(result).to.be.eqls([carMock.validCarWithId]);
    });

    it('Retorna uma lista vazia se não houver carros', async () => {
      const result = await carService.read();

      expect(result).to.be.eqls([]);
    });
  });
});