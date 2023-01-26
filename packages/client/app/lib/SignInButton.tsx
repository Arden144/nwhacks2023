"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import styles from "./SignInButton.module.css";

export default function SignInButton() {
	const { status } = useSession();

	if (status === "loading" || status === "unauthenticated") {
		return (
			<button className={styles.button} onClick={() => signIn()}>
				Sign In
			</button>
		);
	}

	return (
		<button className={styles.button} onClick={() => signOut()}>
			Log Out
		</button>
	);
}
