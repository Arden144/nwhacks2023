"use client";

import type { Question } from "@prisma/client/edge";
import { useSession } from "next-auth/react";
import { useState } from "react";
import styles from "./quiz.module.css";

enum State {
	Idle,
	Incorrect,
	Correct,
}

interface OptionProps {
	question: Question;
	choice: string;
}

export default function Option({ question, choice }: OptionProps) {
	useSession({ required: true });
	const [state, setState] = useState<State>(State.Idle);

	const answer = (q: Question, s: string) => async () => {
		const res = await fetch("/api/question/submit", {
			method: "POST",
			body: JSON.stringify({ questionId: q.id, answer: s }),
		});
		const result = await res.json();
		if (!result.success) {
			throw new Error(result.error);
		}

		setState(result.correct ? State.Correct : State.Incorrect);
	};

	const stateClass = (() => {
		switch (state) {
			case State.Idle:
				return styles.idle;
			case State.Correct:
				return styles.correct;
			case State.Incorrect:
				return styles.incorrect;
		}
	})();

	return (
		<li key={choice} className={`${styles.listItem} ${stateClass}`}>
			<button onClick={answer(question, choice)} className={styles.listButton}>
				{choice}
			</button>
		</li>
	);
}
