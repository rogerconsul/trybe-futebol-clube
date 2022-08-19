import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';
import teamService from '../services/teamService';

chai.use(chaiHttp);

const { expect } = chai;

const getAllMock = {
  status: 200,
  message: [
    {
      "id": 1,
      "teamName": "Avaí/Kindermann"
    },
    {
      "id": 2,
      "teamName": "Bahia"
    }
  ]
}

describe('Testa se a rota /teams', () => {
  let chaiHttpResponse: Response | void;

  beforeEach(async () => {
    sinon
      .stub(teamService, "getAll")
      .resolves(getAllMock);
  });

  afterEach(()=>{
    sinon.restore();
  })

  it('Testa se existe a rota /teams', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .get('/teams')
       .then(function (res) {
          expect(res).to.have.status(200);
          expect(res).to.be.an('object');
          expect(res).not.to.have.status(404);
       })
  });

  it('Testa se existe a rota /teams/:id', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .get('/teams/1')
       .then(function (res) {
          expect(res).to.have.status(200);
          expect(res).to.be.an('object');
          expect(res).not.to.have.status(404);
       })
  });

  it('Testa se existe a rota /teams/:id com id inexistente', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .get('/teams/999')
       .then(function (res) {
          expect(res).to.have.status(404);
       })
  });

})