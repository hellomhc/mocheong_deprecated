import {Resolvers} from '../types/api';

const resolvers: Resolvers = {
  Query: {
    user: () => {
      return {
        id: '1',
      };
    },
  },
};

export default resolvers;
