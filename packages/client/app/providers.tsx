"use client";

import { createReactClient, LivepeerConfig, studioProvider } from "@livepeer/react";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

const client = createReactClient({
	provider: studioProvider({ apiKey: "99d58c2e-935e-4258-8079-57ab1d94f6e1" }),
});

export function Providers({ children }: { children: ReactNode }) {
	return (
		<SessionProvider>
			<LivepeerConfig client={client}>{children}</LivepeerConfig>
		</SessionProvider>
	);
}
