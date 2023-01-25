import type { Question } from "@prisma/client/edge";
import styles from "./quiz.module.css";
import Option from "./QuizOption";

interface Props {
	question: Question;
	index: number;
}

export default function QuestionView({ question, index }: Props) {
	return (
		<div className={styles.quiz}>
			<h5>Question {index + 1}</h5>
			<h1>{question.prompt}</h1>
			<ol className={styles.list}>
				{question.choices.map(choice => (
					<Option key={choice} question={question} choice={choice} />
				))}
			</ol>
		</div>
	);
}
