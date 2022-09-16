import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
import * as carMock from '../mocks/carMock';
import CarModel from '../../../models/Car.model';

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
});