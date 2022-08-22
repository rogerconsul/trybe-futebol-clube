import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';
import userService from '../services/userService';

chai.use(chaiHttp);

const { expect } = chai;

const serviceMock = {
  status: 200,
  message: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyZXN1bHQiOnsiaWQiOjEsInVzZXJuYW1lIjoiQWRtaW4iLCJyb2xlIjoiYWRtaW4iLCJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsInBhc3N3b3JkIjoiJDJhJDA4JHhpLkh4azFjekFPMG5aUi4uQjM5M3UxMGFFRDBSUTFOM1BBRVhRN0h4dExqS1BFWkJ1LlBXIn0sImlhdCI6MTY2MTIwNTExM30.DKj2v0zfO86n8bpR_y0mZY-oczqcEpuXETYsQMRJ66o',
}

const userMock = [
  {
    "id" : 1,
    "username" : "Admin",
    "role" : "admin",
    "email" : "admin@admin.com",
    "password" : "$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW"
  }
]




describe('Testa o user service', () => {
  let chaiHttpResponse: Response | void;

  beforeEach(async () => {
    sinon
      .stub(userService, "loginUser")
      .resolves(serviceMock);
  });

  afterEach(()=>{
    sinon.restore();
  })

  it('Testa se funciona a loginUser', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .post('/login')
       .send({
        "email": "admin@admin.com",
        "password": "secret_admin"
        })
       .then(function (res) {
          expect(res).to.have.status(200);
          expect(res).to.be.an('object');
          expect(res).not.to.have.status(404);
       })
  });

  // it('Testa se funciona a loginUser', async () => {
  //   chaiHttpResponse = await chai
  //      .request(app)
  //      .get('/login/validate')
  //      .send(serviceMock.message)
  //      .then(function (res) {
  //         expect(res).to.have.status(200);
  //         expect(res).to.be.an('object');
  //         expect(res).not.to.have.status(404);
  //      })
  // });
})