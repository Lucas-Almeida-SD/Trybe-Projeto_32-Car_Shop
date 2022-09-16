import { expect } from 'chai';
import sinon from 'sinon';
import { ZodError } from 'zod';
import MotorcycleModel from '../../../models/Motorcycle.model';
import MotorcycleService from '../../../services/Motorcycle.service';
import * as motorcycleMock from '../mocks/motorcycleMock';

const invalidId = '999999999999999999999999';
const idWithLengthNotAllowed = '12345678901234567892123';

describe('Testes de MotorcycleService', () => {
  const motorcycleModel = new MotorcycleModel();
  const motorcycleService = new MotorcycleService(motorcycleModel);

  describe('Método "update"', () => {

    describe('Quando a moto é atualizada com sucesso', () => {

      before(() => {
        sinon
          .stub(motorcycleModel, 'update')
          .resolves(motorcycleMock.updatedMotorcycleWithId);
      });

      after(() => {
        sinon.restore();
      });

      it('Retorna o objeto da moto atualizada', async () => {
        const result = await motorcycleService.update(
          motorcycleMock.validMotorcycleWithId._id,
          motorcycleMock.updatedMotorcycle,
        );

        expect(result).to.be.eqls(motorcycleMock.updatedMotorcycleWithId);
      });
    });

    describe('Quando a moto NÃO é atualizada com sucesso', () => {

      before(() => {
        sinon
          .stub(motorcycleModel, 'update')
          .resolves(null);
      });

      after(() => {
        sinon.restore();
      });

      describe('Caso o id possua menos que 24 caracteres', () => {

        it('Lança o erro "idLengthNotAllowed"', async () => {
          try{
            await motorcycleService.update(
              idWithLengthNotAllowed,
              motorcycleMock.updatedMotorcycle,
            );
          } catch(err) {
            expect((err as Error).message).to.be.eql('idLengthNotAllowed');
          }
        });
      });

      describe('Caso o body esteja vazio', () => {

        it('Lança um erro instanciado pelo "zod"', async () => {
          try{
            await motorcycleService.update(
              motorcycleMock.validMotorcycleWithId._id,
              {},
            );
          } catch(err) {
            expect(err).to.be.instanceOf(ZodError);
          }
        });
      });

      describe('Caso o id possua 24 caracteres mas é inválido', () => {

        it('Lança o erro "objectNotFound"', async () => {
          try{
            await motorcycleService.update(
              invalidId,
              motorcycleMock.updatedMotorcycle,
            );
          } catch(err) {
            expect((err as Error).message).to.be.eql('objectNotFound');
          }
        });
      });
    });
  });
});