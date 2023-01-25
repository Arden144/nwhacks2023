import Toolbar from "@lib/Toolbar";
import { Catamaran, Inter } from "@next/font/google";
import "index.css";
import styles from "./layout.module.css";
import { Providers } from "./providers";

const inter = Inter({
	subsets: ["latin"],
	display: "fallback",
	variable: "--font-inter",
});

const catamaran = Catamaran({
	subsets: ["latin"],
	display: "optional",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" className={`${catamaran.className} ${inter.variable}`}>
			<body>
				<Providers>
					<div className={styles.container}>
						<Toolbar />
						<div className={styles.content}>{children}</div>
					</div>
				</Providers>
			</body>
		</html>
	);
}
