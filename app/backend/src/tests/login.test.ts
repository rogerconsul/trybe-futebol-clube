import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';
import loginController from '../controllers/loginController';
import userService from '../services/userService';

chai.use(chaiHttp);

const { expect } = chai;

const validUser = {
  email: 'user@user.com',
  password: 'oJardineiroEhJesus'
};

const invalidEmail = {
  email: 'email',
  password: 'oJardineiroEhJesus'
}

const missingPassword = {
  email: 'roger@roger.com.br',
  password: ''
}

const missingEmail = {
  email: '',
  password: 'oJardineiroEhJesus'
}

const token = {
  status: 200,
  message: {token: 'elTokenMasCabuloso'}
}

describe('Testa as funcionalidades do LoginController', () => {
  /**
   * Exemplo do uso de stubs com tipos
   */

  let chaiHttpResponse: Response;

  beforeEach(async () => {
    sinon
      .stub(loginController, "loginUser")
      .resolves();
  });

  afterEach(()=>{
    sinon.restore();
  })

  it('Testa se a rota "/login" existe', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .post('/login')

    expect(chaiHttpResponse.status).not.to.equal(404);
  });
  
});

describe('Testa as funcionalidades do loginService que esta dentro de user', () => {
  let chaiHttpResponse: Response | void;

  beforeEach(async () => {
    sinon
      .stub(userService, "loginUser")
      .resolves(token);
  });

  afterEach(()=>{
    sinon.restore();
  })

  it('Testa /login com usuario valido', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .post('/login')
       .send(validUser)
       .then(function (res) {
          expect(res).to.have.status(200);
          expect(res).to.be.an('object')
       })
  });

  it('Testa /login com email faltante', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .post('/login')
       .send(missingEmail)
       .then(function (res) {
          expect(res).to.have.status(400);
          expect(res).to.be.an('object')
        })
  });

  it('Testa /login com senha faltante', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .post('/login')
       .send(missingPassword)
       .then(function (res) {
          expect(res).to.have.status(400);
          expect(res).to.be.an('object')
        })
  });

  it('Testa /login com email invalido', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .post('/login')
       .send(invalidEmail)
       .then(function (res) {
          expect(res).to.have.status(401);
          expect(res).to.be.an('object')
        })
  });

});