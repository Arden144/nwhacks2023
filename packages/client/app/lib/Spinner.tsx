import styles from "./Spinner.module.css";

export default function Spinner() {
	return (
		<div className={styles.ldsEllipsis}>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
		</div>
	);
}
