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
      .stub(motorcycleService, 'create')
      .resolves(motorcycleMock.validMotorcycleWithId);
  });

  after(() => {
    sinon.restore();
  });

  describe('Método "create"', () => {
    req.body = motorcycleMock.validMotorcycle;

    it('Retorna status 201', async () => {
      await motorcycleController.create(req, res);

      expect((res.status as sinon.SinonStub).calledWith(201)).to.be.true;
    });

    it('Retorna o objeto da moto criada no corpo da response', async () => {
      await motorcycleController.create(req, res);

      expect(
        (res.json as sinon.SinonStub)
        .calledWith(motorcycleMock.validMotorcycleWithId)
      ).to.be.true;
    });
  });
});