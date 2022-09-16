import { expect } from 'chai';
import sinon from 'sinon';
import { ZodError } from 'zod';
import MotorcycleModel from '../../../models/Motorcycle.model';
import MotorcycleService from '../../../services/Motorcycle.service';
import * as motorcycleMock from '../mocks/motorcycleMock';

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
});