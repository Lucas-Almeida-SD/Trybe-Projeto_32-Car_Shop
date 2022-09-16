import sinon from 'sinon';
import { expect } from 'chai';
import CarModel from '../../../models/Car.model';
import CarService from '../../../services/Car.service';
import CarController from '../../../controllers/Car.controller';
import * as carMock from '../mocks/carMock';
import { Request, Response } from 'express';

describe('Testes de CarController', () => {
  const carModel = new CarModel();
  const carService = new CarService(carModel);
  const carController = new CarController(carService);

  const req = {} as Request;
  const res = {} as Response;

  before(() => {
    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
  });

  after(()=>{
    sinon.restore();
  });

  describe('Método "read"', () => {
    before(() => {
      sinon.stub(carService, 'read').resolves([carMock.validCarWithId]);
    });

    it('Retorna status 200', async () => {
      await carController.read(req, res);

      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
    });

    it('Retorna uma lista de carros no corpo da response', async () => {
      await carController.read(req, res);

    expect((res.json as sinon.SinonStub).calledWith([carMock.validCarWithId])).to.be.true;
    });
  });
});