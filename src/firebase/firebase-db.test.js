import database from './firebase-db';

describe('Firebase db initialization', () => {
  const DB_INSTANCE = 'dbInstance';
  let config = null;
  let dbCalled = false;
  const firebaseMock = {
    initializeApp: (_config) => { config = _config; },
    database: () => { dbCalled = true; return DB_INSTANCE; }
  };

  it('should initialize the database and return an instance', () => {
    const dbInstance = database(firebaseMock);
    expect(config.authDomain).toMatch('firebaseapp.com');
    expect(config.databaseURL).toMatch('firebaseio.com');
    expect(config.storageBucket).toMatch('appspot.com');
    expect(config.apiKey.length > 25).toBeTruthy();
    expect(config.projectId.length > 5).toBeTruthy();
    expect(config.messagingSenderId.length > 5).toBeTruthy();
  });

});