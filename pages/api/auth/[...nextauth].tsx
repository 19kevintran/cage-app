import axios from 'axios';
import { NextAuthOptions } from 'next-auth';
import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
  },
  jwt: {
    maxAge: 60 * 60 * 24 * 30,
  },
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',

      credentials: {
        email: { label: 'Username', type: 'text', placeholder: 'jsmith' },
        password: { label: 'Password', type: 'password' },
      },

      async authorize(credentials, req) {
        const base = process.env.API;
        const apiPath = new URL('auth/login', base).toString();

        const apiResult = axios.post(apiPath, credentials);

        let userData = await apiResult
          .then((res) => {
            const data = res.data;
            return data;
          })
          .catch((res) => {
            return null;
          });

        const user = {
          id: userData.access_token,
          name: userData.userID,
          email: userData.email,
          image: userData.userID,
        };

        return user ? user : null;
      },
    }),
  ],
  callbacks: {
    session: async ({ session, token }) => {
      session.user['token'] = token.sub;
      return session;
    },
    jwt: async ({ token, user, ...context }) => {
      return token;
    },
  },
};

export default NextAuth(authOptions);
