import CourseWidget from "@lib/CourseWidget";
import { prisma } from "@lib/prisma";
import Image from "next/image";
import Link from "next/link";
import courseImage from "./IntroCS.jpg";
import styles from "./page.module.css";

const subjects = [
	"Computer Science",
	"Mathematics",
	"Biology",
	"Physics",
	"Economics",
	"Philosophy",
];

export default async function Courses() {
	const courses = await prisma.course.findMany();

	return (
		<div className={styles.courseDisplay2}>
			<div className={styles.sideMenu}>
				<h3>Filter by: </h3>
				<p>
					Subject <br />
					{subjects.map(subject => (
						<span key={subject}>
							<input type="checkbox" />
							{subject}
							<br />
						</span>
					))}
					. . .
				</p>
				<p>
					Level <br />
					<input type="checkbox"></input>
					Beginner <br />
					<input type="checkbox"></input>
					Intermediate <br />
					<input type="checkbox"></input>
					Advanced <br />
				</p>
				<p>
					Duration
					<br />
					<input type="checkbox"></input>
					Less than 1 day <br />
					<input type="checkbox"></input>
					1 - 4 weeks <br />
					<input type="checkbox"></input>
					1 - 2 months
					<br />
					<input type="checkbox"></input>6 - 12 months{" "}
				</p>
				<p>
					Language
					<br />
					<input type="checkbox"></input>
					English <br />
					<input type="checkbox"></input>
					French <br />
					<input type="checkbox"></input>
					Hindi <br />
					<input type="checkbox"></input>
					Mandarin <br />. . .{" "}
				</p>
			</div>
			{courses.map(course => (
				<div key={course.id} className={styles.courseDisplay}>
					<CourseWidget>
						<Link href={`/courses/${course.id}`}>
							<Image src={courseImage} alt="Intro to CS" placeholder="blur" />
							<h2>How to Code</h2>
							<p>
								Teacher: Arden Sinclair <br />
								Computer Science | Beginner
							</p>
						</Link>
					</CourseWidget>
				</div>
			))}
		</div>
	);
}
