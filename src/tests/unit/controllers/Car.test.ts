import * as sinon from 'sinon';
import chai from 'chai';
import CarModel from '../../../models/Car.model';
import CarService from '../../../services/Car.service';
import CarController from '../../../controllers/Car.controller';
import * as carMock from '../mocks/carMock';
import { Request, Response } from 'express';


const { expect } = chai;

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

  describe('Método "readOne"', () => {
    before(() => {
      sinon.stub(carService, 'readOne').resolves(carMock.validCarWithId);
    });

    after(() => {
      sinon.restore();
    })

    req.params = { id: carMock.validCarWithId._id };

    it('Retorna status 200', async () => {
      await carController.readOne(req, res);

      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
    });

    it('Retorna o objeto do carro no corpo da response', async () => {
      await carController.readOne(req, res);

    expect((res.json as sinon.SinonStub).calledWith(carMock.validCarWithId)).to.be.true;
    });
  });
});