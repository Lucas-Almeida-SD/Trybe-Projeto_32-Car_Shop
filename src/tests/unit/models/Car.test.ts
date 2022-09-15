import * as sinon from 'sinon';
import chai from 'chai';
import { Model } from 'mongoose';
import * as carMock from '../mocks/carMock';
import CarModel from '../../../models/Car.model';

const { expect } = chai;

describe('Testes de CarModel', () => {
  const carModel = new CarModel();

  describe('Método "create', () => {

    describe('Quando a criação do carro ocorre com sucesso', () => {
      before(async () => {
        sinon
          .stub(Model, 'create')
          .resolves(carMock.validCarWithId);
      });
    
      after(()=>{
        sinon.restore();
      })
    
      it('Retorna o objeto do carro criado', async () => {
        const result = await carModel.create(carMock.validCar);
        
        expect(result).to.be.eqls(carMock.validCarWithId);
      });
    });
    
  });

  describe('Método "read"', () => {
    before(() => {
      sinon.stub(Model, 'find')
      .onCall(0).resolves([carMock.validCarWithId])
      .onCall(1).resolves([]);
    });

    after(() => {
      sinon.restore();
    });

    it('É possível listar os carros com sucesso', async () => {
      const result = await carModel.read();

      expect(result).to.be.eqls([carMock.validCarWithId]);
    });

    it('Retorna uma lista vazia se não houver carros', async () => {
      const result = await carModel.read();

      expect(result).to.be.eqls([]);
    });
  });

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