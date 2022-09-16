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

  describe('Método "create"', () => {

    describe('Quando a criação da moto ocorre com sucesso', () => {

      before(() => {
        sinon.stub(motorcycleModel, 'create').resolves(motorcycleMock.validMotorcycleWithId);
      });

      after(() => {
        sinon.restore();
      });

      it('Retorna o objeto da moto criada', async () => {
        const result = await motorcycleService.create(motorcycleMock.validMotorcycle);

        expect(result).to.be.eqls(motorcycleMock.validMotorcycleWithId);
      });
    });

    describe('Quando a criação da moto NÃO ocorre com sucesso', () => {

      describe('Caso a requisição receba um objeto vazio', () => {
        it('Lança um erro instaceado pelo "zod', async () => {
          try{
            await motorcycleService.create({});
          } catch(err) {
            expect(err).to.be.instanceOf(ZodError);
          }
        });
      });

      describe('Ao tentar criar uma moto com category diferente de "Street", "Custom" ou "Trail"', () => {
        it('Lança um erro instaceado pelo "zod', async () => {
          try{
            await motorcycleService.create(
              motorcycleMock.MotorcycleWrongCategory,
            );
          } catch(err) {
            expect(err).to.be.instanceOf(ZodError);
          }
        });
      });

      describe('Ao tentar criar uma moto com category diferente de "string"', () => {
        it('Lança um erro instaceado pelo "zod', async () => {
          try{
            await motorcycleService.create(
              motorcycleMock.MotorcycleCategoryNotString,
            );
          } catch(err) {
            expect(err).to.be.instanceOf(ZodError);
          }
        });
      });

      describe('Ao tentar criar uma moto com engineCapacity menor ou igual a zero', () => {
        it('Lança um erro instaceado pelo "zod', async () => {
          try{
            await motorcycleService.create(
              motorcycleMock.MotorcycleEngineLteZero,
            );
          } catch(err) {
            expect(err).to.be.instanceOf(ZodError);
          }
        });
      });

      describe('Ao tentar criar uma moto com engineCapacity maior que 2500', () => {
        it('Lança um erro instaceado pelo "zod', async () => {
          try{
            await motorcycleService.create(
              motorcycleMock.MotorcycleEngineGt2500,
            );
          } catch(err) {
            expect(err).to.be.instanceOf(ZodError);
          }
        });
      });

      describe('Ao tentar criar uma moto sem:', () => {

        it('"model": Lança um erro instaceado pelo "zod', async () => {
          try{
            await motorcycleService.create(
              motorcycleMock.noModelMotorcycle,
            );
          } catch(err) {
            expect(err).to.be.instanceOf(ZodError);
          }
        });

        it('"year": Lança um erro instaceado pelo "zod', async () => {
          try{
            await motorcycleService.create(
              motorcycleMock.noYearMotorcycle,
            );
          } catch(err) {
            expect(err).to.be.instanceOf(ZodError);
          }
        });

        it('"color": Lança um erro instaceado pelo "zod', async () => {
          try{
            await motorcycleService.create(
              motorcycleMock.noColorMotorcycle,
            );
          } catch(err) {
            expect(err).to.be.instanceOf(ZodError);
          }
        });

        it('"buyValue": Lança um erro instaceado pelo "zod', async () => {
          try{
            await motorcycleService.create(
              motorcycleMock.noBuyValueMotorcycle,
            );
          } catch(err) {
            expect(err).to.be.instanceOf(ZodError);
          }
        });
      });

      describe('Ao tentar criar um moto sem:', () => {
        it('"category": Lança um erro instaceado pelo "zod', async () => {
          try{
            await motorcycleService.create(
              motorcycleMock.noCategoryMotorcycle,
            );
          } catch(err) {
            expect(err).to.be.instanceOf(ZodError);
          }
        });

        it('"engineCapacity": Lança um erro instaceado pelo "zod', async () => {
          try{
            await motorcycleService.create(
              motorcycleMock.noEngineCapacityMotorcycle,
            );
          } catch(err) {
            expect(err).to.be.instanceOf(ZodError);
          }
        });
      });


    });
  });

  describe('Método "read"', () => {

    before(() => {
      sinon
        .stub(motorcycleModel, 'read')
        .onCall(0).resolves([motorcycleMock.validMotorcycleWithId])
        .onCall(1).resolves([]);
    });

    after(() => {
      sinon.restore();
    });

    it('É possível listar as motos com sucesso', async() => {
      const result = await motorcycleService.read();

      expect(result).to.be.eqls([motorcycleMock.validMotorcycleWithId]);
    });

    it('Retorna uma lista vazia se não houver motos', async() => {
      const result = await motorcycleService.read();

      expect(result).to.be.eqls([]);
    });
  });

  describe('Método "readOne"', () => {

    describe('Quando a leitura ocorre com sucesso', () => {

      before(() => {
        sinon
          .stub(motorcycleModel, 'readOne')
          .resolves(motorcycleMock.validMotorcycleWithId);
      });

      after(() => {
        sinon.restore();
      });

      it('É possível listar uma moto com sucesso através do id', async() => {
        const result = await motorcycleService
          .readOne(motorcycleMock.validMotorcycleWithId._id);
  
        expect(result).to.be.eqls(motorcycleMock.validMotorcycleWithId);
      });
    });

    describe('Quando a leitura NÃO ocorre com sucesso', () => {

      before(() => {
        sinon.stub(motorcycleModel, 'readOne').resolves(null);
      });

      after(() => {
        sinon.restore();
      });

      describe('Caso o id possua menos que 24 caracteres', () => {

        it('Lança o erro "idLengthNotAllowed"', async () => {
          try{
            await motorcycleService.readOne(idWithLengthNotAllowed);
          } catch(err) {
            expect((err as Error).message).to.be.equal('idLengthNotAllowed');
          }
        });
      });

      describe('Caso o id possua 24 caracteres mas é inválido', () => {

        it('Lança o erro "objectNotFound"', async () => {
          try{
            await motorcycleService.readOne(invalidId);
          } catch(err) {
            expect((err as Error).message).to.be.equal('objectNotFound');
          }
        });
      });
    });
  });

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