import Image from "next/image";
import lectureHallImage from "./CIRS-lecture-theatre.jpg";
import styles from "./page.module.css";

export default function Minter() {
	return (
		<div>
			<Image src={lectureHallImage} alt="A lecture hall" priority placeholder="blur" fill />
			<div className={styles.overlay}>
				<p>
					{" "}
					Congratulations on completing your course!
					<br />
					Enter your Polygon wallet address below to recieve your NFT badge.
				</p>
				<form>
					<label>
						<input type="text" name="walletAddress" />
					</label>
					<input type="submit" value="Submit" />
				</form>
			</div>
		</div>
	);
}
