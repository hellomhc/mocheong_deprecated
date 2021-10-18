const resolvers = {
  Query: {
    user: () => {
      return {
        id: '1',
      };
    },
  },
};

export default resolvers;
