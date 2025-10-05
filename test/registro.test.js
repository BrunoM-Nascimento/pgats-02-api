const request = require('supertest');
const { expect } = require('chai');

describe('Registro', () => {
    describe('POST /users/register', () => {
        it('Deve retornar 201 quando um novo usuário é registrado com sucesso', async () => {
            const resposta = await request('http://localhost:3000')
                .post('/users/register')
                .set('Content-Type', 'application/json')
                .send({
                    'username': 'usuario' + Date.now(), // evitar duplicados
                    'password': '123456',
                    'favorecidos':['string']
                });

            console.log(resposta.status);
            console.log(resposta.body);

            expect(resposta.status).to.equal(201);
            // Caso a API retorne algo como mensagem ou dados do user
            // expect(resposta.body).to.have.property('message');
        });

        it('Deve retornar 400 se tentar registrar um usuário já existente', async () => {
            const userData = {
                'username': 'julio',
                'password': '123456'
            };

            const resposta = await request('http://localhost:3000')
                .post('/users/register')
                .set('Content-Type', 'application/json')
                .send(userData);

            console.log(resposta.status);
            expect(resposta.status).to.equal(400);
        });
    });
});
