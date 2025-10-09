const request = require('supertest');
const { expect } = require('chai');
const app = require('../app');
const jwt = require('jsonwebtoken');

// Testes para a API de Transferências
describe('API de Transferências', () => {
  let tokenValido;
  let tokenInvalido;

  // Antes de todos os testes, criamos os tokens
  before(() => {
    // Token válido para usar nos testes
    tokenValido = jwt.sign(
      { userId: 1, username: 'teste' },
      'secret_key',
      { expiresIn: '1h' }
    );

    // Token inválido para testar erros
    tokenInvalido = 'token_que_nao_funciona';
  });

  // Testes para POST /transfers
  describe('POST /transfers - Criar Transferência', () => {
    
    it('deve criar transferência com sucesso quando dados estão corretos', async () => {
      const dadosTransferencia = {
        from: 'usuario1',
        to: 'usuario2',
        value: 100.50
      };

      const resposta = await request(app)
        .post('/transfers')
        .set('Authorization', `Bearer ${tokenValido}`)
        .set('Content-Type', 'application/json')
        .send(dadosTransferencia);

      console.log('Status:', resposta.status);
      console.log('Body:', resposta.body);

      expect(resposta.status).to.equal(201);
      expect(resposta.body).to.exist;
    });

    it('deve retornar erro 400 quando campos obrigatórios estão ausentes', async () => {
      const resposta = await request(app)
        .post('/transfers')
        .set('Authorization', `Bearer ${tokenValido}`)
        .set('Content-Type', 'application/json')
        .send({}); // Enviando objeto vazio

      console.log('Status:', resposta.status);
      console.log('Body:', resposta.body);

      expect(resposta.status).to.equal(400);
    });

    it('deve retornar erro 400 quando valor é zero', async () => {
      const dadosTransferencia = {
        from: 'usuario1',
        to: 'usuario2',
        value: 0
      };

      const resposta = await request(app)
        .post('/transfers')
        .set('Authorization', `Bearer ${tokenValido}`)
        .set('Content-Type', 'application/json')
        .send(dadosTransferencia);

      console.log('Status:', resposta.status);
      console.log('Body:', resposta.body);

      expect(resposta.status).to.equal(400);
    });

    it('deve retornar erro 401 quando token não é fornecido', async () => {
      const dadosTransferencia = {
        from: 'usuario1',
        to: 'usuario2',
        value: 100
      };

      const resposta = await request(app)
        .post('/transfers')
        .set('Content-Type', 'application/json')
        .send(dadosTransferencia); // Sem token

      console.log('Status:', resposta.status);
      console.log('Body:', resposta.body);

      expect(resposta.status).to.equal(401);
    });

    it('deve retornar erro 401 quando token é inválido', async () => {
      const dadosTransferencia = {
        from: 'usuario1',
        to: 'usuario2',
        value: 100
      };

      const resposta = await request(app)
        .post('/transfers')
        .set('Authorization', `Bearer ${tokenInvalido}`)
        .set('Content-Type', 'application/json')
        .send(dadosTransferencia);

      console.log('Status:', resposta.status);
      console.log('Body:', resposta.body);

      expect(resposta.status).to.equal(401);
    });
  });

  // Testes para GET /transfers
  describe('GET /transfers - Listar Transferências', () => {

    it('deve retornar lista de transferências quando token é válido', async () => {
      const resposta = await request(app)
        .get('/transfers')
        .set('Authorization', `Bearer ${tokenValido}`)
        .set('Content-Type', 'application/json');

      console.log('Status:', resposta.status);
      console.log('Body:', resposta.body);

      expect(resposta.status).to.equal(200);
      expect(resposta.body).to.exist;
    });

    it('deve retornar erro 401 quando token não é fornecido', async () => {
      const resposta = await request(app)
        .get('/transfers')
        .set('Content-Type', 'application/json'); // Sem token

      console.log('Status:', resposta.status);
      console.log('Body:', resposta.body);

      expect(resposta.status).to.equal(401);
    });

    it('deve retornar erro 401 quando token é inválido', async () => {
      const resposta = await request(app)
        .get('/transfers')
        .set('Authorization', `Bearer ${tokenInvalido}`)
        .set('Content-Type', 'application/json');

      console.log('Status:', resposta.status);
      console.log('Body:', resposta.body);

      expect(resposta.status).to.equal(401);
    });

  });
});
