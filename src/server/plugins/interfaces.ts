import * as Hapi from 'hapi';
import { IDatabase } from '../database';
import { IServerConfigurations } from '../config';

export interface IPluginOptions {
    database: IDatabase;
    serverConfigs: IServerConfigurations;
}

export interface IPlugin {
    register(server: Hapi.Server, options?: IPluginOptions): void;
    info(): IPluginInfo;
}

export interface IPluginInfo {
    name: string;
    version: string;
}
