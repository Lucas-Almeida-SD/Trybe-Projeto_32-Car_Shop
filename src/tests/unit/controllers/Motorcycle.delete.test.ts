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
    res.end = sinon.stub().returns(res);

    sinon
      .stub(motorcycleService, 'delete')
      .resolves(motorcycleMock.validMotorcycleWithId);
  });

  after(() => {
    sinon.restore();
  });

  describe('Método "delete"', () => {
    req.params = { id: motorcycleMock.validMotorcycleWithId._id };

    it('Retorna status 204', async () => {
      await motorcycleController.delete(req, res);

      expect((res.status as sinon.SinonStub).calledWith(204)).to.be.true;
    });

    it('Retorna o objeto da moto no corpo da response', async () => {
      await motorcycleController.delete(req, res);

      expect((res.end as sinon.SinonStub).called).to.be.true;
    });
  });
});