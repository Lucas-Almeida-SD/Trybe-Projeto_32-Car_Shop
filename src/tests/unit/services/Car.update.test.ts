import { expect } from 'chai';
import sinon from 'sinon';
import CarModel from '../../../models/Car.model';
import CarService from '../../../services/Car.service';
import * as carMock from '../mocks/carMock';
import { ZodError } from 'zod';

const invalidId = '999999999999999999999999';
const idWithLengthNotAllowed = '12345678901234567892123';

describe('Testes de CarService', () => {
  const carModel = new CarModel();
  const carService = new CarService(carModel);

  describe('Método "update"', () => {

    describe('Quando o carro é atualizado com sucesso', () => {

      before(() => {
        sinon.stub(carModel, 'update').resolves(carMock.updatedCarWithId);
      });

      after(() => {
        sinon.restore();
      });

      it('Retorna o objeto do carro atualizado', async () => {
        const result = await carService.update(carMock.validCarWithId._id, carMock.updatedCar);

        expect(result).to.be.eqls(carMock.updatedCarWithId);
      });
    });

    describe('Quando o carro NÃO é atualizado com sucesso', () => {

      before(() => {
        sinon.stub(carModel, 'update')
        .onCall(0).resolves(null)
        .onCall(1).resolves(carMock.updatedCarWithId);
      });

      after(() => {
        sinon.restore();
      });

      describe('Caso o id possua menos que 24 caracteres', () => {

        it('Lança o erro "idLengthNotAllowed"', async () => {
          try{
            await carService.update(idWithLengthNotAllowed, carMock.updatedCar);
          } catch(err) {
            expect((err as Error).message).to.be.eqls('idLengthNotAllowed');
          }
        });
      });

      describe('Caso o id seja inexistente', () => {

        it('Lança o erro "objectNotFound"', async () => {
          try{
            await carService.update(invalidId, carMock.updatedCar);
          } catch(err) {
            expect((err as Error).message).to.be.eqls('objectNotFound');
          }
        });
      });

      describe('Caso o body esteja vazio', () => {

        it('Lança um erro instaciado do "zod"', async () => {
          try{
            await carService.update(carMock.validCarWithId._id, {});
          } catch(err) {
            expect(err).to.be.instanceOf(ZodError);
          }
        });
      });
    });
  });
});