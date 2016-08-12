import * as Database from '../database';

export interface DummyUser {
  name: string;
  email: string;
  password: string;
}

export function createUserDummy(email?: string): DummyUser {
  let user = {
    email: email || 'dummy@mail.com',
    name: 'Dummy Jones',
    password: '123123'
  };

  return user;
}

export function clearDatabase(database: Database.IDatabase, done: MochaDone): void {
  let promiseUser = database.userModel.remove({});

  Promise.all([promiseUser]).then(() => {
    done();
  }).catch((error) => {
    console.log(error);
  });
}

export function createSeedUserData(database: Database.IDatabase, done: MochaDone): void {
  database.userModel.create(createUserDummy())
    .then((user) => {
      done();
    })
    .catch((error) => {
      console.log(error);
    });
}
