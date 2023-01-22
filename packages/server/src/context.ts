import { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";
import { createRemoteJWKSet, jwtVerify } from "jose";

const JWKS = createRemoteJWKSet(
  new URL("https://nwhacks2023.us.auth0.com/.well-known/jwks.json")
);

export async function createContext({
  req,
  resHeaders,
}: FetchCreateContextFnOptions) {
  const getUser = async () => {
    const [type, token] = req.headers.get("Authorization")?.split(" ") ?? [
      "",
      "",
    ];
    if (type !== "Bearer" || !token) return undefined;

    try {
      const { payload } = await jwtVerify(token, JWKS, {
        issuer: "https://nwhacks2023.us.auth0.com/",
        audience: "https://server.nwhacks2023.workers.dev",
      });

      return payload.sub;
    } catch (err) {
      console.error(err);
      return undefined;
    }
  };

  const user = await getUser();

  return { req, resHeaders, user };
}
