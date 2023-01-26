import { prisma } from "@lib/prisma";
import Quiz from "@lib/quiz/Quiz";
import styles from "./page.module.css";
import Player from "./Player";

export async function generateStaticParams() {
	const courses = await prisma.course.findMany();

	return courses.map(post => ({
		slug: post.id,
	}));
}

interface Props {
	params: {
		slug: string;
	};
}

export default async function CoursePlayer({ params }: Props) {
	const course = await prisma.course.findUnique({
		where: { id: params.slug },
		include: { videos: true, questions: true },
	});

	if (!course) {
		return (
			<div className={styles.grid}>
				<div>
					<h2>This course does not exist.</h2>
				</div>
				<div></div>
			</div>
		);
	}

	return (
		<div className={styles.scroll}>
			<div className={styles.grid}>
				<div>
					<Player name={course.name} videos={course.videos} />
				</div>
				<Quiz course={course} />
			</div>
		</div>
	);
}
