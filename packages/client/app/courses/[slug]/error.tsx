"use client";

import { useEffect } from "react";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
	useEffect(() => {
		console.error(error);
	}, [error]);

	return (
		<div>
			<h3>Sorry, that course doesn&apos;t exist.</h3>
			<button onClick={() => reset()}>Try again</button>
		</div>
	);
}
