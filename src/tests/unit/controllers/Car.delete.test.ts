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
    res.end = sinon.stub().returns(res);
  });

  after(()=>{
    sinon.restore();
  });

  describe('Método "delete"', () => {

    before(() => {
      sinon.stub(carService, 'delete').resolves(carMock.updatedCarWithId);
    });
    
    after(() => {
      sinon.restore();
    });

    req.params = { id: carMock.validCarWithId._id };

    it('Retorna status 204', async () => {
      await carController.delete(req, res);
      expect((res.status as sinon.SinonStub).calledWith(204)).to.be.true;
    });

    it('Executa o método "end" ao final da resposta', async () => {
      await carController.delete(req, res);
      expect((res.end as sinon.SinonStub).called).to.be.true;
    });
  });
});