import NextAuth from 'next-auth';
import GitHubProvider from 'next-auth/providers/github'; // Update to use the specific provider

export default NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  database: process.env.DATABASE_URL,
});
