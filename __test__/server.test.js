"use strict";
const { app } = require("../src/server");
const supertest = require("supertest");
const request = supertest(app);

const { db } = require('../src/models/index.model');
const basicAuth = require("../src/auth/basicAuth");

beforeAll(async () => {
  await db.sync();
});

describe('web server', () => {
  it('it should create a new user', async () => {
    const response = await request.post('/signup').send({
      "username": "test",
      "password": "test"
    })
    expect(response.status).toBe(201);
  });
  it('it should login as a user', async () => {
    const response = await request.post('/signin').send({
      "username": "test",
      "password": "test"
    })
    expect(response.status).toBe(200);
  });
  it('it should not login as a user', async () => {
    const response = await request.post('/signin').send({
      "username": "test",
      "password": "test1"
    })
    expect(response.status).toBe(403);
  });
});


afterAll(async () => {
  await db.drop();
});