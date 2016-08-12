import { IPlugin } from '../interfaces';
import * as Hapi from 'hapi';

export default (): IPlugin => {
  return {
    register: (server: Hapi.Server) => {
      const opts = {
        ops: {
          interval: 1000,
        },
        reporters: {
          console: [{
            module: 'good-squeeze',
            name: 'Squeeze',
            args: [{ error: '*', request: '*', log: '*', response: '*' }]
          }, {
            module: 'good-console'
          }, 'stdout']
        }
      };
      server.register(
        {
          register: require('good'),
          options: opts
        },
        (error) => {
          if (error) {
            console.log('error', error);
          }
        });
    },
    info: () => {
      return {
        name: 'Good Logger',
        version: '1.0.0'
      };
    }
  };
};
