import NextAuth, { AuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";

if (!process.env.GITHUB_ID || !process.env.GITHUB_SECRET) {
	throw new Error("missing oauth provider credentials");
}

export const authOptions: AuthOptions = {
	providers: [
		GithubProvider({
			clientId: process.env.GITHUB_ID,
			clientSecret: process.env.GITHUB_SECRET,
		}),
	],
	callbacks: {
		session({ session, token }) {
			if (session.user) {
				if (!token.sub) {
					throw new Error("missing sub in jwt");
				}
				session.user.id = token.sub;
			}
			return session;
		},
	},
};

export default NextAuth(authOptions);
