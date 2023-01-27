"use client";

import { Player as LivepeerPlayer } from "@livepeer/react";
import type { Video } from "@prisma/client/edge";
import { useLayoutEffect, useState } from "react";
import styles from "./Player.module.css";
import { VideoInfo } from "./VideoInfo";

interface Props {
	name: string;
	videos: Video[];
}

export default function Player({ name, videos }: Props) {
	const [video, setVideo] = useState<Video | undefined>(undefined);

	useLayoutEffect(() => {
		if (!videos) return;
		setVideo(videos[0]);
	}, [videos]);

	if (!video) {
		return <h3>Select a video</h3>;
	}

	return (
		<div className={styles.content}>
			<LivepeerPlayer playbackId={video.playbackId} />
			<div className={styles.info}>
				{video && (
					<h2>
						{name} | {video.name}
					</h2>
				)}
				<ul className={styles.list}>
					{(videos ?? []).map(video => (
						<li key={video.id}>
							<VideoInfo video={video} onClick={() => setVideo(video)} />
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}
