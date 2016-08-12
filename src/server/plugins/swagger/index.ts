import {IPlugin} from '../interfaces';
import * as Hapi from 'hapi';

export default (): IPlugin => {
  return {
    register: (server: Hapi.Server) => {
      server.register(
        [
          require('inert'),
          require('vision'),
          {
            register: require('hapi-swagger'),
            options: {
              info: {
                title: 'Slide Total Live Api',
                description: 'Slide Total Live Documentation',
                version: '1.0'
              },
              tags: [
                {
                  'name': 'tasks',
                  'description': 'Api tasks interface.'
                },
                {
                  'name': 'users',
                  'description': 'Api users interface.'
                }
              ],
              enableDocumentation: true,
              documentationPath: '/api/docs'
            }
          }
        ],
        (error) => {
          if (error) {
            console.log('error', error);
          }
        });
    },
    info: () => {
      return {
        name: 'Swagger Documentation',
        version: '1.0.0'
      };
    }
  };
};
