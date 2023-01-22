import { trpc } from "@lib/trpc";
import { Player } from "@livepeer/react";

function Courses() {
  const courses = trpc.course.list.useQuery({ questions: true, videos: true });

  if (courses.data === undefined) {
    return <div>Loading...</div>;
  }

  return (
    <ul>
      {courses.data.map((course) => (
        <li key={course.id}>
          <h3>{course.name}</h3>
          <h4>Questions:</h4>
          <ul>
            {course.questions.map((question) => (
              <li key={question.id}>
                <h5>{question.prompt}</h5>
                <ul>
                  {question.choices.map((choice) => (
                    <li key={choice}>{choice}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
          <h4>Videos:</h4>
          <ul>
            {course.videos.map((video) => (
              <li key={video.id}>
                <Player playbackId={video.playbackId} />
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
}

export default Courses;
