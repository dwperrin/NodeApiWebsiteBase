/// <reference path='typings/index.d.ts' />
import * as Server from './server';
import * as Database from './database';
import * as Config from './config';

console.log(`Running enviroment ${process.env.NODE_ENV || 'dev'}`);

//  init database
const dbConfigs = Config.getDatabaseConfig();
const database = Database.init(dbConfigs);

//  starting Application Server
const serverConfigs = Config.getServerConfigs();
const server = Server.init(serverConfigs, database);

server.start(() => {
    console.log('Server running at:', server.info.uri);
});
