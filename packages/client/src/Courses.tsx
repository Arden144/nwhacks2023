import { trpc } from "@lib/trpc";
import { Player } from "@livepeer/react";
import { Link } from "react-router-dom";
import Toolbar from "@lib/Toolbar";
import { css, cx } from "@linaria/core";
import { useAuth0 } from "@auth0/auth0-react";
import Button from "@lib/Button";
import CourseWidget from "@lib/CourseWidget";

const links = css`
  text-decoration: none;
  color: var(--secondary-label)
  margin-left: 50px; 
  margin-right: 50px;
`;

const dis41 = css`
  @media only screen and (max-width: 41em) {
    display: none;
  }
`;

const searchBar = css`
  font-size: 16px;
  margin-right: 50px;
  padding: 6px;
  border: 1px solid #ccc;
  border-radius: 2rem;

  @media only screen and (max-width: 60em) {
    display: none;
  }
`;

const logButt = css`
  margin-left: auto;
`;

const dis34 = css`
  @media only screen and (max-width: 34em) {
    display: none;
  }
`;

const sideMenu = css`
  margin: 4rem 5rem;
  padding: 2rem 2rem;
  background-color: var(--background-color);
  border-radius: 2rem;
  width: 300px;
`;

const courseDisplay = css`
  display: grid;
  grid-template-columns: auto auto auto;
`;

const courseDisplay2 = css`
  display: flex;
`;

function Courses() {
  const courses = trpc.course.list.useQuery({ questions: true, videos: true });
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

  if (courses.data === undefined) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Toolbar>
        <img src="logo.svg" />
        <input className={searchBar} placeholder="Search Courses" />
        <Link className={links} to="courses">
          Courses
        </Link>
        <Link className={cx(links, dis41)} to="courses">
          About Us
        </Link>
        {isAuthenticated ? (
          <Button onClick={() => logout()} className={cx(logButt, dis34)}>
            Log Out
          </Button>
        ) : (
          <Button onClick={() => loginWithRedirect()} className={logButt}>
            Log In / Sign up
          </Button>
        )}
      </Toolbar>
      <div className={courseDisplay2}>
        <div className={sideMenu}>
            <h3>Filter by: </h3>
            <p>Subject <br/>
            <input type="checkbox"></input>
            Computer Science <br/>
            <input type="checkbox"></input>
             Mathematics <br/>
             <input type="checkbox"></input>
             Biology <br/>
             <input type="checkbox"></input>
             Physics <br/>
             <input type="checkbox"></input>
             Economics <br/>
             <input type="checkbox"></input>
             Philosophy <br/>
             . . .</p>
            <p>Level <br/>
            <input type="checkbox"></input>
            Beginner <br/>
            <input type="checkbox"></input>
            Intermediate <br/>
            <input type="checkbox"></input>
            Advanced <br/>
            </p>
            <p>Duration<br/>
            <input type="checkbox"></input>
            Less than 1 day <br/>
            <input type="checkbox"></input>
            1 - 4 weeks <br/>
            <input type="checkbox"></input>
            1 - 2 months<br/>
            <input type="checkbox"></input>
            6 - 12 months </p>
            <p>Language<br/>
            <input type="checkbox"></input>
            English <br/>
            <input type="checkbox"></input>
            French <br/>
            <input type="checkbox"></input>
            Hindi <br/>
            <input type="checkbox"></input>
            Chinease <br/>
            . . . </p>
        </div>
        {courses.data.map((course) => (
        <div className={courseDisplay}>
            <CourseWidget>
            <Link to={course.id}>
            <img src="IntroCS.jpg" />
              <h2>How to Code</h2>
              <p>Teacher: Arden Sinclair <br/>
              Computer Science | Beginner</p>
              </Link>
            </CourseWidget>
            <CourseWidget>
            <Link to={course.id}>
            <img src="IntroCS.jpg" />
              <h2>How to Code</h2>
              <p>Teacher: Arden Sinclair <br/>
              Computer Science | Beginner</p>
              </Link>
            </CourseWidget>
            <CourseWidget>
            <Link to={course.id}>
            <img src="IntroCS.jpg" />
              <h2>How to Code</h2>
              <p>Teacher: Arden Sinclair <br/>
              Computer Science | Beginner</p>
              </Link>
            </CourseWidget>
            <CourseWidget>
            <Link to={course.id}>
            <img src="IntroCS.jpg" />
              <h2>How to Code</h2>
              <p>Teacher: Arden Sinclair <br/>
              Computer Science | Beginner</p>
              </Link>
            </CourseWidget>
            <CourseWidget>
            <Link to={course.id}>
            <img src="IntroCS.jpg" />
              <h2>How to Code</h2>
              <p>Teacher: Arden Sinclair <br/>
              Computer Science | Beginner</p>
              </Link>
            </CourseWidget>
            <CourseWidget>
            <Link to={course.id}>
            <img src="IntroCS.jpg" />
              <h2>How to Code</h2>
              <p>Teacher: Arden Sinclair <br/>
              Computer Science | Beginner</p>
              </Link>
            </CourseWidget>
        </div>
        ))}
      </div>
    </div>
  );
}

export default Courses;
