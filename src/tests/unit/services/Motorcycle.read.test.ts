import { expect } from 'chai';
import sinon from 'sinon';
import MotorcycleModel from '../../../models/Motorcycle.model';
import MotorcycleService from '../../../services/Motorcycle.service';
import * as motorcycleMock from '../mocks/motorcycleMock';

describe('Testes de MotorcycleService', () => {
  const motorcycleModel = new MotorcycleModel();
  const motorcycleService = new MotorcycleService(motorcycleModel);

  describe('Método "read"', () => {

    before(() => {
      sinon
        .stub(motorcycleModel, 'read')
        .onCall(0).resolves([motorcycleMock.validMotorcycleWithId])
        .onCall(1).resolves([]);
    });

    after(() => {
      sinon.restore();
    });

    it('É possível listar as motos com sucesso', async() => {
      const result = await motorcycleService.read();

      expect(result).to.be.eqls([motorcycleMock.validMotorcycleWithId]);
    });

    it('Retorna uma lista vazia se não houver motos', async() => {
      const result = await motorcycleService.read();

      expect(result).to.be.eqls([]);
    });
  });
});