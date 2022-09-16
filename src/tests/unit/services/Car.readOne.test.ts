import { expect } from 'chai';
import sinon from 'sinon';
import CarModel from '../../../models/Car.model';
import CarService from '../../../services/Car.service';
import * as carMock from '../mocks/carMock';

const invalidId = '999999999999999999999999';
const idWithLengthNotAllowed = '12345678901234567892123';

describe('Testes de CarService', () => {
  const carModel = new CarModel();
  const carService = new CarService(carModel);

  describe('Método "readOne"', () => {

    describe('Quando a leitura ocorre com sucesso', () => {

      before(() => {
        sinon.stub(carModel, 'readOne').resolves(carMock.validCarWithId);
      });
  
      after(() => {
        sinon.restore();
      });
  
      it('É possível listar um carro com sucesso através do id', async () => {
        const result = await carService.readOne(carMock.validCarWithId._id);
  
        expect(result).to.be.eqls(carMock.validCarWithId);
      });
    });

    describe('Quando a leitura NÃO ocorre com sucesso', () => {

      describe('Caso o id possua menos que 24 caracteres', () => {

        it('Lança o erro "idLengthNotAllowed"', async () => {
          try {
            await carService.readOne(idWithLengthNotAllowed);
          } catch(err) {
            expect((err as Error).message).to.be.equal('idLengthNotAllowed');
          }
        });
      });

      describe('Caso o id possua 24 caracteres mas é inválido', () => {

        before(() => {
          sinon.stub(carModel, 'readOne').resolves(null);
        });
    
        after(() => {
          sinon.restore();
        });

        it('Lança o erro "idLengthNotAllowed"', async () => {
          try {
            await carService.readOne(invalidId);
          } catch(err) {
            expect((err as Error).message).to.be.equal('objectNotFound');
          }
        });
      });
    });
  });
});