const request = require('supertest');
const { expect } = require('chai');

const api = request('http://localhost:3000'); // ou URL da sua API

// Função que faz login e retorna o token JWT
async function loginAndGetToken() {
  const loginResponse = await api
    .post('/users/login')
    .send({
      username: 'julio', // Certifique-se de que esse usuário existe
      password: '123456' // E que essa é a senha correta
    });

  const token = loginResponse.body.token;
  return token;
}

describe('Testes de Transferências', () => {
  it('deve realizar uma transferência com sucesso e retornar 201', async () => {
    const token = await loginAndGetToken();

    const resposta = await api
      .post('/transfers')
      .set('Authorization', `Bearer ${token}`)
      .send({
        from: 'julio',
        to: 'priscila',
        value: 100
      });
    console.log('Status:', resposta.statusCode);
    expect(resposta.statusCode).to.equal(201); // Usando chai, então .to.equal() ao invés de .toBe()
  });

    it('deve falhar ao transferir com saldo insuficiente e retornar 400 com mensagem "Saldo insuficiente"', async () => {
        const token = await loginAndGetToken();

        const resposta = await api
            .post('/transfers')
            .set('Authorization', `Bearer ${token}`)
            .send({
                from: 'julio',
                to: 'priscila',
                value: 999999 // valor alto para simular saldo insuficiente
        });

        console.log('Status:', resposta.statusCode);
        console.log('Body:', resposta.body);

        expect(resposta.statusCode).to.equal(400);
        expect(resposta.body.message || resposta.body.mensagem || resposta.body.error).to.include('Saldo insuficiente');
    });

    it('deve retornar 401 ao tentar realizar transferência sem fornecer o token', async () => {
        const resposta = await api
        .post('/transfers')
        .send({
            from: 'julio',
            to: 'priscila',
            value: 50
        });

        console.log('Status:', resposta.statusCode);
        expect(resposta.statusCode).to.equal(401);
    });

    it('deve retornar 401 ao tentar realizar transferência com token inválido', async () => {
        const resposta = await api
            .post('/transfers')
            .set('Authorization', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWUsImlhdCI6MTUxNjIzOTAyMn0.KMUFsIDTnFmyG3nMiGM6H9FNFUROf3wh7SmqJp-QV30')
            .send({
                from: 'julio',
                to: 'priscila',
                value: 50
         });

        console.log('Status:', resposta.statusCode);
        expect(resposta.statusCode).to.equal(401);
    });

});

   