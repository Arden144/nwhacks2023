import { useAuth0 } from "@auth0/auth0-react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import { ReactNode, useState } from "react";
import { trpc } from "@lib/trpc";

interface Props {
  children: ReactNode;
}

function TRPCProvider({ children }: Props) {
  const { getAccessTokenSilently, getAccessTokenWithPopup } = useAuth0();
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: "https://server.nwhacks2023.workers.dev/trpc",
          async headers() {
            const getTokenOptions = {
              authorizationParams: {
                audience: "https://server.nwhacks2023.workers.dev",
              },
            };

            let token: string | undefined;

            try {
              token = await getAccessTokenSilently(getTokenOptions);
            } catch (err) {
              token = await getAccessTokenWithPopup(getTokenOptions);
            }

            if (!token) {
              throw new Error("failed to get token interactively");
            }

            return {
              Authorization: `Bearer ${token}`,
            };
          },
        }),
      ],
    })
  );
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpc.Provider>
  );
}

export default TRPCProvider;
