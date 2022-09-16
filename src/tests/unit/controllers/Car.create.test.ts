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

  describe('Método "create', () => {
    before(async () => {
      sinon
        .stub(carService, 'create')
        .resolves(carMock.validCarWithId);
    });
  
    after(()=>{
      sinon.restore();
    });

    describe('Quando a criação do carro ocorre com sucesso', () => {
      req.body = carMock.validCar;

      it('Retorna status 201', async () => {
        await carController.create(req, res);

        expect((res.status as sinon.SinonStub).calledWith(201)).to.be.true;
      });

      it('Retorna um objeto no corpo da response', async () => {
        await carController.create(req, res);

        expect((res.json as sinon.SinonStub).calledWith(carMock.validCarWithId)).to.be.true;
      });
    });
  });
});