import { css, cx } from "@linaria/core";
import { Course, Question } from "model";
import { useState } from "react";
import { trpc } from "./trpc";

const container = css`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const quiz = css`
  background-color: var(--background-color);
  border-radius: 2rem;
  padding: 2rem;
`;

const listButton = css`
  background-color: transparent;
  border: none;
  font-family: "Open Sans";
  font-size: 1rem;
  color: inherit;
`;

const listItem = css`
  background-color: var(--secondary-background-color);
  padding: 1rem;
  font-family: "Open Sans";
  font-size: 1.5rem;
  font-weight: 900;

  :first-child {
    border-top-left-radius: 0.5rem;
    border-top-right-radius: 0.5rem;
  }

  :last-child {
    border-bottom-left-radius: 0.5rem;
    border-bottom-right-radius: 0.5rem;
    border-bottom: none;
  }

  :hover {
    color: white;
    background-color: var(--primary-color);
  }
`;

const list = css`
  display: flex;
  flex-direction: column;
  border-radius: 0.5rem;
  list-style-position: inside;
  padding: 0;
  margin: 0;
  gap: 2px;
`;

const idle = css``;
const correct = css`
  background-color: green;
`;
const incorrect = css`
  background-color: red;
`;

enum State {
  Idle,
  Incorrect,
  Correct,
}

interface OptionProps {
  question: Question;
  choice: string;
}

function Option({ question, choice }: OptionProps) {
  const [state, setState] = useState<State>(State.Idle);
  const utils = trpc.useContext();

  const answer = (q: Question, s: string) => async () => {
    const result = await utils.client.question.submit.mutate({
      questionId: q.id!,
      answer: s,
    });

    setState(result.correct ? State.Correct : State.Incorrect);
  };

  const stateClass = (() => {
    switch (state) {
      case State.Idle:
        return idle;
      case State.Correct:
        return correct;
      case State.Incorrect:
        return incorrect;
    }
  })();

  return (
    <li key={choice} className={cx(listItem, stateClass)}>
      <button onClick={answer(question, choice)} className={listButton}>
        {choice}
      </button>
    </li>
  );
}

interface QuestionProps {
  question: Question;
  index: number;
}

function QuestionView({ question, index }: QuestionProps) {
  return (
    <div className={quiz}>
      <h5>Question {index + 1}</h5>
      <h1>{question.prompt}</h1>
      <ol className={list}>
        {question.choices.map((choice) => (
          <Option question={question} choice={choice} />
        ))}
      </ol>
    </div>
  );
}

interface Props {
  course: Course;
}

function Quiz({ course }: Props) {
  if (course.questions === undefined || course.questions.length === 0) {
    return (
      <div>
        <h3>This course has no questions.</h3>
      </div>
    );
  }

  return (
    <div className={container}>
      {course.questions.map((question, index) => (
        <QuestionView question={question} index={index} />
      ))}
    </div>
  );
}

export default Quiz;
