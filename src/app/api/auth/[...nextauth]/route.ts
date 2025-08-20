import NextAuth, { NextAuthOptions } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';

export const authOptions: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID || '',
      clientSecret: process.env.GITHUB_CLIENT_SECRET || '',
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: '/login',
    error: '/auth/error',
  },
  callbacks: {
    async jwt({ token, user, account }) {
      // 초기 로그인 시 user 정보를 token에 저장
      if (account && user) {
        return {
          ...token,
          accessToken: account.access_token,
          userId: user.id,
        };
      }
      return token;
    },
    async session({ session, token }) {
      // session에 추가 정보 포함
      if (session.user) {
        session.user.id = token.userId as string;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      // 로그인 성공 후 메인 페이지로 리다이렉트
      if (url.startsWith(baseUrl)) return url;
      // Allows relative callback URLs
      else if (url.startsWith('/')) return `${baseUrl}${url}`;
      return baseUrl;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
