import Link from "next/link";
import SignInButton from "SignInButton";
import styles from "./Toolbar.module.css";

export default function Toolbar() {
	return (
		<div className={styles.toolbar}>
			<Link href="/" style={{ display: "contents" }}>
				<img src="/logo.svg" />
			</Link>

			<span>
				<input className={styles.searchBar} placeholder="Search Courses" />
				<Link className={styles.links} href="/courses">
					Courses
				</Link>
				<Link className={`${styles.links} ${styles.dis41}`} href="/mint">
					Mint
				</Link>
				<SignInButton />
			</span>
		</div>
	);
}
