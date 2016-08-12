import * as Hapi from 'hapi';
import { IPlugin } from './plugins/interfaces';
import { IServerConfigurations } from './config';
import * as Users from './users';
import { IDatabase } from './database';

export function init(configs: IServerConfigurations,
                     database: IDatabase): Hapi.Server {

    const port = process.env.port || configs.port;
    const server = new Hapi.Server();

    server.connection({
        port: port,
        routes: {
            cors: true
        }
    });

    //   Setup Hapi Plugins
    const plugins: Array<string> = configs.plugins;
    const pluginOptions = {
        database: database,
        serverConfigs: configs
    };

    plugins.forEach((pluginName: string) => {
        let plugin: IPlugin = (require('./plugins/' + pluginName)).default();
        console.log(`Register Plugin ${plugin.info().name} v${plugin.info().version}`);
        plugin.register(server, pluginOptions);
    });

    // Init Features
    Users.init(server, configs, database);

    return server;
};
