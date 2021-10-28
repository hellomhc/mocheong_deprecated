import {UserInputError} from 'apollo-server-errors';
import {Resolvers} from '../types/api';
import {
  hashPassword,
  sendRefreshToken,
  signAccessToken,
  signRefreshToken,
} from '../utils/auth';
import {isValidPassword, isValidUserName} from '../utils/regex';

const resolvers: Resolvers = {
  Query: {
    user: async (_, args, {prisma}) => {
      const foundUser = await prisma.user.findFirst({
        where: {id: Number(args.id)},
      });

      if (!foundUser) return null;
      return foundUser;
    },
  },
  Mutation: {
    async signUp(_, {input: {username, password}}, {res, prisma}) {
      if (!isValidUserName(username)) {
        throw new UserInputError(
          'Username requires only Korean letter, uppercase, lowercase, number',
          {argumentName: 'username'},
        );
      }
      if (!isValidPassword(password)) {
        throw new UserInputError(
          'Password requires minimum eight characters, at least one letter and one number',
          {argumentName: 'password'},
        );
      }

      const foundUserCount = await prisma.user.count({
        where: {name: username},
      });

      if (foundUserCount > 0) {
        throw new UserInputError('Username already exits');
      }

      const hashedPassword = await hashPassword(password);
      const newUser = await prisma.user.create({
        data: {
          name: username,
          password: hashedPassword,
        },
      });
      const accessToken = await signAccessToken(newUser.name);
      const refreshToken = await signRefreshToken(
        newUser.name,
        newUser.tokenVersion,
      );

      sendRefreshToken(res, refreshToken);
      return {user: newUser, accessToken};
    },
  },
};

export default resolvers;
