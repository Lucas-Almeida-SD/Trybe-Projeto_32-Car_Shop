import * as sinon from 'sinon';
import chai from 'chai';
import CarModel from '../../../models/Car.model';
import CarService from '../../../services/Car.service';
import * as carMock from '../mocks/carMock';
import { ZodError } from 'zod';

const { expect } = chai;

describe('Testes de CarService', () => {
  const carModel = new CarModel();
  const carService = new CarService(carModel);

  describe('Método "create', () => {

    describe('Quando a criação do carro ocorre com sucesso', () => {
      before(async () => {
        sinon
          .stub(carModel, 'create')
          .resolves(carMock.validCarWithId);
      });
    
      after(()=>{
        sinon.restore();
      })
    
      it('Retorna o objeto do carro criado', async () => {
        const result = await carService.create(carMock.validCar);
        
        expect(result).to.be.eqls(carMock.validCarWithId);
      });
    });

    describe('Quando a criação do carro NÃO ocorre com sucesso', () => {

      describe('Caso o método receba um objeto vazio', () => {

        it('Lança um erro', async () => {
          try {
            await carService.create({});
          } catch(err) {
            expect(err).to.be.instanceof(ZodError);
          }
        });
      });

      describe('Caso o método tenta criar um carro com quantidade de assentos inferior a 2', () => {

        it('Lança um erro', async () => {
          try {
            await carService.create(carMock.carSeatsLtTwo);
          } catch(err) {
            expect(err).to.be.instanceof(ZodError);
          }
        });
      });

      describe('Caso o método tenta criar um carro com quantidade de portas inferior a 2', () => {

        it('Lança um erro', async () => {
          try {
            await carService.create(carMock.carDoorsLtTwo);
          } catch(err) {
            expect(err).to.be.instanceof(ZodError);
          }
        });
      });

      describe('Caso o método tenta criar um carro sem:', () => {

        it('"model": lança um erro', async () => {
          try {
            await carService.create(carMock.noModelCar);
          } catch(err) {
            expect(err).to.be.instanceof(ZodError);
          }
        });

        it('"year": lança um erro', async () => {
          try {
            await carService.create(carMock.noYearCar);
          } catch(err) {
            expect(err).to.be.instanceof(ZodError);
          }
        });

        it('"color": lança um erro', async () => {
          try {
            await carService.create(carMock.noColorCar);
          } catch(err) {
            expect(err).to.be.instanceof(ZodError);
          }
        });

        it('"buyValue": lança um erro', async () => {
          try {
            await carService.create(carMock.noBuyValueCar);
          } catch(err) {
            expect(err).to.be.instanceof(ZodError);
          }
        });
      });

      describe('Caso o método tenta criar um carro sem:', () => {

        it('"doorsQty": lança um erro', async () => {
          try {
            await carService.create(carMock.noDoorsCar);
          } catch(err) {
            expect(err).to.be.instanceof(ZodError);
          }
        });

        it('"seatsQty": lança um erro', async () => {
          try {
            await carService.create(carMock.noSeatsCar);
          } catch(err) {
            expect(err).to.be.instanceof(ZodError);
          }
        });
      });
    });

  });

  describe('Método "read"', () => {
    before(() => {
      sinon.stub(carModel, 'read')
      .onCall(0).resolves([carMock.validCarWithId])
      .onCall(1).resolves([]);
    });

    after(() => {
      sinon.restore();
    });

    it('É possível listar os carros com sucesso', async () => {
      const result = await carService.read();

      expect(result).to.be.eqls([carMock.validCarWithId]);
    });

    it('Retorna uma lista vazia se não houver carros', async () => {
      const result = await carService.read();

      expect(result).to.be.eqls([]);
    });
  });

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
            await carService.readOne('12345678901234567892123');
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
            await carService.readOne('999999999999999999999999');
          } catch(err) {
            expect((err as Error).message).to.be.equal('objectNotFound');
          }
        });
      });
    });
  })
});