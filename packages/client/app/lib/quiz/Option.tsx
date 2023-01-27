"use client";

import type { Question } from "@prisma/client/edge";
import { useState } from "react";
import styles from "./Option.module.css";

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
	const [state, setState] = useState<State>(State.Idle);

	const answer = (q: Question, s: string) => async () => {
		const res = await fetch("/api/question/submit", {
			method: "POST",
			body: JSON.stringify({ questionId: q.id, answer: s }),
			headers: {
				"Content-Type": "application/json",
			},
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
		<li
			key={choice}
			onClick={answer(question, choice)}
			className={`${styles.listItem} ${stateClass}`}
		>
			{choice}
		</li>
	);
}
