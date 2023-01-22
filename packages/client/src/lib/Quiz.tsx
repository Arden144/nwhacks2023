import { css } from "@linaria/core";
import { Course } from "model";

const container = css`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const quiz = css`
  background-color: var(--background-color);
  border-radius: 2rem;
  padding: 0 1rem;
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

  const answer = (i: number) => () => {
    // console.log(question.choices[i]);
  };

  return (
    <div className={container}>
      {course.questions.map((question, index) => (
        <div className={quiz}>
          <h5>Question {index + 1}</h5>
          <h1>{question.prompt}</h1>
          <ol className={list}>
            {question.choices.map((choice, i) => (
              <li key={choice} className={listItem}>
                <button onClick={answer(i)} className={listButton}>
                  {choice}
                </button>
              </li>
            ))}
          </ol>
        </div>
      ))}
    </div>
  );
}

export default Quiz;
