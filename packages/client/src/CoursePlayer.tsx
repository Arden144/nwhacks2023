import Quiz from "@lib/Quiz";
import { trpc } from "@lib/trpc";
import { css } from "@linaria/core";
import { styled } from "@linaria/react";
import { Player } from "@livepeer/react";
import { Video } from "model";
import { useLayoutEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const displayContents = css`
  display: contents;
`;

const container = css`
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const Grid = styled.div`
  background-color: var(--background-color);
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow-y: scroll;

  @media only screen and (min-width: 30em) {
    padding: 1rem 2rem;
  }

  @media only screen and (min-width: 60em) {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 2rem;
  }
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 4rem;
  padding: 0 2rem;
  background-color: var(--background-color);
  border-bottom: 1px solid black;

  span {
    display: flex;
    align-items: center;
    gap: 2rem;
  }
`;

const content = css`
  @media only screen and (min-width: 60em) {
    position: sticky;
    top: 0px;
  }
`;

const info = css`
  padding: 0 1rem;
`;

const logo = css`
  height: 100%;
  padding: 1.25rem 0;
`;

const list = css`
  display: flex;
  list-style: none;
  gap: 1rem;
`;

const videoInfo = css`
  background-color: var(--tertiary-background-color);
  padding: 0.5rem 2rem;
  font-size: 1rem;
  font-weight: 900;
  border-radius: 0.5rem;
`;

interface VideoInfoProps {
  video: Video;
  onClick: () => void;
}

const VideoInfo = ({ video, ...props }: VideoInfoProps) => {
  return (
    <div {...props} className={videoInfo}>
      {video.name}
    </div>
  );
};

function CoursePlayer() {
  const { courseId } = useParams();
  const course = trpc.course.get.useQuery(courseId!);
  const [video, setVideo] = useState<Video | undefined>(undefined);

  useLayoutEffect(() => {
    if (!course.data) return;
    setVideo(course.data.videos[0]);
  }, [course.data]);

  if (course.isLoading) {
    return (
      <Grid>
        <div>
          <h2>Loading...</h2>
        </div>
        <div></div>
      </Grid>
    );
  }

  if (!course.data) {
    return (
      <Grid>
        <div>
          <h2>This course does not exist.</h2>
        </div>
        <div></div>
      </Grid>
    );
  }

  return (
    <div className={container}>
      <Header>
        <Link to="/" className={displayContents}>
          <img src="/logo.svg" className={logo} />
        </Link>
        <Link to="/courses">Back to courses</Link>
      </Header>
      <Grid>
        <div>
          <div className={content}>
            {video ? (
              <Player playbackId={video.playbackId} />
            ) : (
              <h3>Select a video</h3>
            )}
            <div className={info}>
              {video && (
                <h2>
                  {course.data.name} | {video?.name}
                </h2>
              )}
              <ul className={list}>
                {(course.data.videos ?? []).map((video) => (
                  <li key={video.id}>
                    <VideoInfo video={video} onClick={() => setVideo(video)} />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div>
          <Quiz course={course.data} />
        </div>
      </Grid>
    </div>
  );
}

export default CoursePlayer;
