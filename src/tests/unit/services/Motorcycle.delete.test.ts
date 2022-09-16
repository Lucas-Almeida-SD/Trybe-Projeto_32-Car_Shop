import { expect } from 'chai';
import sinon from 'sinon';
import MotorcycleModel from '../../../models/Motorcycle.model';
import MotorcycleService from '../../../services/Motorcycle.service';
import * as motorcycleMock from '../mocks/motorcycleMock';

const invalidId = '999999999999999999999999';
const idWithLengthNotAllowed = '12345678901234567892123';

describe('Testes de MotorcycleService', () => {
  const motorcycleModel = new MotorcycleModel();
  const motorcycleService = new MotorcycleService(motorcycleModel);

  describe('Método "delete"', () => {

    describe('Quando uma moto é deletada com sucesso', () => {

      before(() => {
        sinon
          .stub(motorcycleModel, 'delete')
          .resolves(motorcycleMock.validMotorcycleWithId);
      });

      after(() => {
        sinon.restore();
      });

      it('Retorna o objeto da moto deletada', async () => {
        const result = await motorcycleService
          .delete(motorcycleMock.validMotorcycleWithId._id);

        expect(result).to.be.eqls(motorcycleMock.validMotorcycleWithId);
      });
    });

    describe('Quando uma moto NÃO é deletada com sucesso', () => {

      before(() => {
        sinon
          .stub(motorcycleModel, 'delete')
          .resolves(null);
      });

      after(() => {
        sinon.restore();
      });

      describe('Caso o id possua menos que 24 caracteres', () => {
        it('Lança o erro "idLengthNotAllowed"', async () => {
          try{
            await motorcycleService.delete(idWithLengthNotAllowed);
          } catch(err) {
            expect((err as Error).message).to.be.eql('idLengthNotAllowed');
          }
        });
      });

      describe('Caso o id possua 24 caracteres mas é inválido', () => {
        it('Lança o erro "objectNotFound"', async () => {
          try{
            await motorcycleService.delete(invalidId);
          } catch(err) {
            expect((err as Error).message).to.be.eql('objectNotFound');
          }
        });
      });
    });
  });
});