const request = require('supertest');
const { expect } = require('chai');

describe('Login', () => {
    describe('POST /users/login', () =>{
        it('Deve retornar 200 e um token em string quando utilizado credenciais válidas', async() =>{
            const resposta= await request('http://localhost:3000')
                .post('/users/login')
                .set('Content-Type', 'application/json')
                .send({
                    'username': 'julio',
                    'password': '123456'
                 })
            console.log(resposta.status)
            console.log(resposta.body.token)
            expect(resposta.status).be.equal(200);     
            expect(resposta.body.token).to.be.a('string');
        });
    });
});

describe('Login', () => {
    describe('POST /users/login', () =>{
        it('Deve retornar 400 e não gerar um token em string quando utilizado credenciais não válidas', async() =>{
            const resposta= await request('http://localhost:3000')
                .post('/users/login')
                .set('Content-Type', 'application/json')
                .send({
                    'username': 'bruno',
                    'password': '123456'
                 })
            console.log(resposta.status)
            expect(resposta.status).be.equal(400);     
        });
    });
});

