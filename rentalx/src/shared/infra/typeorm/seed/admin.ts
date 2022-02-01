import { hash } from 'bcryptjs';
import { v4 as uuid } from 'uuid';
import createConnection from '@shared/infra/typeorm';

async function create() {
  const connection = await createConnection();

  const id = uuid();
  const password = await hash('admin', 8);

  await connection.query(
    `INSERT INTO USERS(id, name, email, password, driver_license, admin, created_at) values('${id}', 'admin', 'admin@rentalx.com.br', '${password}', '125456577', true, 'now()')`,
  );

  await connection.close;
}

create().then(() => console.log('User admin created!'));
