import Hero from "@lib/Hero";
import Image from "next/image";
import Link from "next/link";
import styles from "page.module.css";
import heroImage from "./FrontStudent.png";

export default function App() {
	return (
		<div className={styles.pageAlign}>
			<Hero>
				<span className={styles.descriptionContainer}>
					<h1 className={styles.titleText}>
						Decentralized <br /> knowledge
					</h1>
					<p>
						Learn from anyone, anywhere.
						<br /> Uncensored learning where mentors own their content <br />
						with NFT authentication to secure your progress
					</p>
				</span>
				<Image
					className={styles.heroImage}
					src={heroImage}
					alt="A girl smiling, holding a coffee and her phone."
					height={548}
					width={379}
					priority
				/>
			</Hero>
			<Link href="/courses" className={styles.heroButton}>
				View Courses
			</Link>
		</div>
	);
}
