import { Course, Question } from "@prisma/client/edge";
import QuestionView from "./QuestionView";
import styles from "./Quiz.module.css";

interface Props {
	course: Course & { questions: Question[] };
}

function Quiz({ course }: Props) {
	if (course.questions.length === 0) {
		return (
			<div>
				<h3>This course has no questions.</h3>
			</div>
		);
	}

	return (
		<div className={styles.container}>
			{course.questions.map((question, index) => (
				<QuestionView key={question.id} question={question} index={index} />
			))}
		</div>
	);
}

export default Quiz;
