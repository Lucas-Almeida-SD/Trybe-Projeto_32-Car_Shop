import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
import * as carMock from '../mocks/carMock';
import CarModel from '../../../models/Car.model';

describe('Testes de CarModel', () => {
  const carModel = new CarModel();

  describe('Método "readOne"', () => {
    before(() => {
      sinon.stub(Model, 'findOne')
      .onCall(0).resolves(carMock.validCarWithId)
      .onCall(1).resolves(null);
    });

    after(() => {
      sinon.restore();
    });

    it('É possível listar um carro com sucesso através do id', async () => {
      const result = await carModel.readOne(carMock.validCarWithId._id);

      expect(result).to.be.eqls(carMock.validCarWithId);
    });

    it('Retorna "null" se não encontrar o carro pelo id', async () => {
      const result = await carModel.readOne('idInexistente');

      expect(result).to.be.eqls(null);
    });
  });
});