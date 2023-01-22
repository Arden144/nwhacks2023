import Button from "@lib/Button";
import Quiz from "@lib/Quiz";
import { trpc } from "@lib/trpc";
import { css } from "@linaria/core";
import { styled } from "@linaria/react";
import { Player } from "@livepeer/react";
import { Video } from "model";
import { useLayoutEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const container = css`
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const Grid = styled.div`
  background-color: white;
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
  padding: 1rem 2rem;
  flex-grow: 1;
  overflow-y: scroll;
  position: relative;
`;

const Sidebar = styled.div``;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 4rem;
  padding: 0 2rem;
  background-color: white;
  border-bottom: 1px solid black;

  span {
    display: flex;
    align-items: center;
    gap: 2rem;
  }
`;

const content = css`
  // padding: 2rem;
  position: sticky;
  top: 0px;
`;

const title = css`
  font-family: CormorantVariable, Cormorant;
  font-weight: 900;
  font-variant: small-caps;
`;

interface VideoInfoProps {
  video: Video;
  onClick: () => void;
}

const list = css`
  display: flex;
  list-style: none;
  padding: 0;
`;

const link = css`
  text-decoration: none;
  color: inherit;
`;

const videoInfo = css`
  background-color: var(--secondary-background-color);
  padding: 0.5rem 2rem;
  font-size: 1rem;
  font-weight: 900;
  border-radius: 0.5rem;
`;

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
  }, [course]);

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
        <h1 className={title}>ChainLearn</h1>
        <span>
          <Link to="/courses" className={link}>
            Back to courses
          </Link>
          <Button>Sign out</Button>
        </span>
      </Header>
      <Grid>
        <div>
          <div className={content}>
            {video ? (
              <>
                <Player playbackId={video.playbackId} />
                <h2>
                  {course.data.name} | {video?.name}
                </h2>
              </>
            ) : (
              <h3>Select a video</h3>
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
        <Sidebar>
          <Quiz course={course.data} />
        </Sidebar>
      </Grid>
    </div>
  );
}

export default CoursePlayer;
