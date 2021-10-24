import {Resolvers} from '../types/api';

const resolvers: Resolvers = {
  Query: {
    user: async (_, args, {prisma}) => {
      const foundUser = await prisma.user.findFirst({
        where: {id: Number(args.id)},
      });

      if (!foundUser) return null;
      return {id: foundUser.id};
    },
  },
};

export default resolvers;
