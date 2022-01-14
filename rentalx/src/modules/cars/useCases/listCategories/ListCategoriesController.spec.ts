import { app } from '@shared/infra/http/app';
import createConnection from '@shared/infra/typeorm';
import { hash } from 'bcryptjs';
import request from 'supertest';
import { Connection } from 'typeorm';
import { v4 as uuid } from 'uuid';

let connection: Connection;

describe('List Categories Controller', () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();

    const id = uuid();
    const password = await hash('admin', 8);
    await connection.query(
      `INSERT INTO USERS(id, name, email, password, driver_license, admin, created_at) values('${id}', 'admin', 'admin@rentalx.com.br', '${password}', '125456577', true, 'now()')`,
    );
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it('should be able to list all categories', async () => {
    const token = await request(app)
      .post('/sessions')
      .send({ email: 'admin@rentalx.com.br', password: 'admin' })
      .then((response) => response.body.token);

    await request(app)
      .post('/categories')
      .send({
        name: 'Category Supertest',
        description: 'Category Supertest',
      })
      .set({ Authorization: `Bearer ${token}` });

    await request(app)
      .post('/categories')
      .send({
        name: 'Category Supertest 2',
        description: 'Category Supertest 2',
      })
      .set({ Authorization: `Bearer ${token}` });

    const response = await request(app).get('/categories');

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(2);
    expect(response.body[0]).toHaveProperty('id');
    expect(response.body[1].name).toEqual('Category Supertest 2');
  });
});
