import { expect } from 'chai';
import sinon from 'sinon';
import { Model } from 'mongoose';
import MotorcycleModel from '../../../models/Motorcycle.model';
import * as motorcycleMock from '../mocks/motorcycleMock';

describe('Testes de MotorcycleModel', () => {
  const motorcycleModel = new MotorcycleModel();

  describe('Método "create"', () => {

    before(() => {
      sinon.stub(Model, 'create').resolves(motorcycleMock.validMotorcycleWithId);
    });

    after(() => [
      sinon.restore()
    ]);

    describe('Quando a criação da moto ocorre com sucesso', () => {
      it('Retorna o objeto criado', async () => {
        const result = await motorcycleModel
          .create(motorcycleMock.validMotorcycle);

        expect(result).to.be.eqls(motorcycleMock.validMotorcycleWithId);
      });
    });
  });

  describe('Método "read"', () => {

    before(() => {
      sinon.stub(Model, 'find')
      .onCall(0).resolves([motorcycleMock.validMotorcycleWithId])
      .onCall(1).resolves([]);
    });

    after(() => [
      sinon.restore()
    ]);

    it('É possível listar as motos com sucesso', async () => {
      const result = await motorcycleModel.read();

      expect(result).to.be.eqls([motorcycleMock.validMotorcycleWithId]);
    });

    it('Retorna uma lista vazia se não houver motos', async () => {
      const result = await motorcycleModel.read();

      expect(result).to.be.eqls([]);
    });
  });

  describe('Método "readOne"', () => {

    before(() => {
      sinon.stub(Model, 'findOne')
      .onCall(0).resolves(motorcycleMock.validMotorcycleWithId)
      .onCall(1).resolves(null);
    });

    after(() => [
      sinon.restore()
    ]);

    it('É possível listar uma moto com sucesso pelo id', async () => {
      const result = await motorcycleModel.readOne(motorcycleMock.validMotorcycleWithId._id);

      expect(result).to.be.eqls(motorcycleMock.validMotorcycleWithId);
    });

    it('Retorna "null" se não encontrar a moto pelo id', async () => {
      const result = await motorcycleModel.readOne('999999999999999999999999');

      expect(result).to.be.eqls(null);
    });
  });

  describe('Método "update"', () => {

    before(() => {
      sinon.stub(Model, 'findOneAndUpdate')
      .onCall(0).resolves(motorcycleMock.updatedMotorcycleWithId)
      .onCall(1).resolves(null);
    });

    after(() => [
      sinon.restore()
    ]);

    describe('Quando a moto é atualizada com sucesso', () => {
      it('Retorna o objeto da moto atualizado', async () => {
        const result = await motorcycleModel.update(
          motorcycleMock.validMotorcycleWithId._id,
          motorcycleMock.updatedMotorcycle,
        );

        expect(result).to.be.eqls(motorcycleMock.updatedMotorcycleWithId);
      });
    });

    describe('Quando o id é inexistente', () => {
      it('Retorna valor nulo', async () => {
        const result = await motorcycleModel.update(
          '999999999999999999999999',
          motorcycleMock.updatedMotorcycle,
        );

        expect(result).to.be.eqls(null);
      });
    });
  });

  describe('Método "delete"', () => {

    before(() => {
      sinon.stub(Model, 'findOneAndDelete')
      .onCall(0).resolves(motorcycleMock.validMotorcycleWithId)
      .onCall(1).resolves(null);
    });

    after(() => [
      sinon.restore()
    ]);

    describe('Quando a moto é deletada com sucesso', () => {
      it('Retorna o objeto da moto deletada', async () => {
        const result = await motorcycleModel.delete(
          motorcycleMock.validMotorcycleWithId._id,
        );

        expect(result).to.be.eqls(motorcycleMock.validMotorcycleWithId);
      });
    });

    describe('Quando o id é inexistente', () => {
      it('Retorna valor nulo', async () => {
        const result = await motorcycleModel.delete(
          '999999999999999999999999',
        );

        expect(result).to.be.eqls(null);
      });
    });
  });
});