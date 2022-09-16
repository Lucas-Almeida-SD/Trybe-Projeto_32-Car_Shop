import { expect } from 'chai';
import sinon from 'sinon';
import { Request, Response } from 'express';
import MotorcycleModel from '../../../models/Motorcycle.model';
import MotorcycleService from '../../../services/Motorcycle.service';
import MotorcycleController from '../../../controllers/Motorcycle.controller';
import * as motorcycleMock from '../mocks/motorcycleMock';

describe('Testes de "MotorcycleController"', () => {
  const motorcycleModel = new MotorcycleModel();
  const motorcycleService = new MotorcycleService(motorcycleModel);
  const motorcycleController = new MotorcycleController(motorcycleService);

  const req = {} as Request;
  const res = {} as Response;

  before(() => {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
    
    sinon
      .stub(motorcycleService, 'update')
      .resolves(motorcycleMock.updatedMotorcycleWithId);
  });

  after(() => {
    sinon.restore();
  });

  describe('Método "update"', () => {
    req.params = { id: motorcycleMock.validMotorcycleWithId._id };
    req.body = motorcycleMock.updatedMotorcycle;

    it('Retorna status 200', async () => {
      await motorcycleController.update(req, res);

      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
    });

    it('Retorna o objeto da moto no corpo da response', async () => {
      await motorcycleController.update(req, res);

      expect(
        (res.json as sinon.SinonStub)
        .calledWith(motorcycleMock.updatedMotorcycleWithId)
      ).to.be.true;
    });
  });
});