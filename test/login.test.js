const request = require('supertest');
const { expect } = require('chai');

// Defina a instância base da API
const api = request('http://localhost:3000');

describe('Login - POST /users/login', () => {
    
    context('Quando as credenciais são válidas', () => {
        it('deve retornar 200 e um token em string', async () => {
            const resposta = await api
                .post('/users/login')
                .set('Content-Type', 'application/json')
                .send({
                    username: 'julio',
                    password: '123456'
                });
            console.log(resposta.body.token)
            expect(resposta.status).to.equal(200);
            expect(resposta.body).to.have.property('token');
            expect(resposta.body.token).to.be.a('string');
        });
    });

    context('Quando as credenciais são inválidas', () => {
        it('deve retornar 400 e não retornar um token', async () => {
            const resposta = await api
                .post('/users/login')
                .set('Content-Type', 'application/json')
                .send({
                    username: 'bruno', // Usuário inexistente ou com senha errada
                    password: '123456'
                });

            expect(resposta.status).to.equal(400);
            expect(resposta.body).to.not.have.property('token');
        });
    });
});


