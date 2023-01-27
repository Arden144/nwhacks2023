import type { Video } from "@prisma/client/edge";
import styles from "./VideoInfo.module.css";

interface VideoInfoProps {
	video: Video;
	onClick: () => void;
}

export function VideoInfo({ video, ...props }: VideoInfoProps) {
	return (
		<div {...props} className={styles.videoInfo}>
			{video.name}
		</div>
	);
}
