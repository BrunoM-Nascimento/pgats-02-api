const request = require('supertest');
const { expect } = require('chai');

describe('Lista de Usuários', () => {
    describe('GET /users', () => {
        it('Deve retornar 200 e uma lista de usuários', async () => {
            const resposta = await request('http://localhost:3000')
                .get('/users')
                .set('Content-Type', 'application/json');

            console.log('Status:', resposta.statusCode);
            console.log(resposta.body);

            expect(resposta.status).to.equal(200);
            expect(resposta.body).to.be.an('array');
            // Se quiser verificar se há pelo menos um usuário
            // expect(resposta.body.length).to.be.greaterThan(0);
        });
    });
});
