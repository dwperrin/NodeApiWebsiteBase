import * as Mongoose from 'mongoose';
import { IDataConfiguration } from './config';
import { IUser, UserModel } from './users/user';

Mongoose.Promise = global.Promise;

export interface IDatabase {
    userModel: Mongoose.Model<IUser>;
}

export function init(config: IDataConfiguration): IDatabase {

    Mongoose.connect(config.connectionString);

    let mongoDb = Mongoose.connection;

    mongoDb.on('error', () => {
        console.log(`Unable to connect to database: ${config.connectionString}`);
    });

    mongoDb.once('open', () => {
        console.log(`Connected to database: ${config.connectionString}`);
    });

    return {
        userModel: UserModel
    };
}
