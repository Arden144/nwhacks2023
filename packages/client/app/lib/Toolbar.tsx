import Image from "next/image";
import Link from "next/link";
import logo from "./logo.svg";
import SignInButton from "./SignInButton";
import styles from "./Toolbar.module.css";

export default function Toolbar() {
	return (
		<div className={styles.toolbar}>
			<Link href="/" style={{ display: "contents" }}>
				<Image src={logo} alt="ChainLearn" placeholder="blur" />
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
