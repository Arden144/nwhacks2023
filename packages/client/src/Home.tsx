import { useAuth0 } from "@auth0/auth0-react";
import Button from "@lib/Button";
import Hero from "@lib/Hero";
import Title from "@lib/Title";
import Toolbar from "@lib/Toolbar";
import { css, cx } from "@linaria/core";
import { Link } from "react-router-dom";

const heroButt = css`
  color: var(--secondary-label);
  background-color: var(--background-color);
  border: none;
  font-size: 20px;
  font-weight: 500;
  padding: 1.2rem 2.5rem;
  border-radius: 2rem;
  align-items: center;
  align-self: center;
  justify-content: center;
  text-align: center;
  text-decoration: none;
  width: 10em;
  :hover {
    color: white;
    background-color: var(--tertiary-color);
  }
`;

const heroImage = css`
  transform: translateY(-29px) scale(1.4);
  border-radius: 5rem;
  @media only screen and (max-width: 60em) {
    display: none;
  }
`;

const logButt = css`
  margin-left: auto;
  :hover {
    color: white;
    background-color: var(--tertiary-color);
  }
`;
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
const dis34 = css`
  @media only screen and (max-width: 34em) {
    display: none;
  }
`;
const pageAlign = css`
  width: 100%;
  display: flex;
  flex-direction: column;
`;
const titleText = css`
  font-family: InterVariable, Inter;
  font-weight: 900;
  font-size: 3rem;
`;

const content = css`
  flex-grow: 1;
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

function App() {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

  const onLogout = () =>
    logout({ logoutParams: { returnTo: window.location.origin } });

  return (
    <div className={pageAlign}>
      <Toolbar>
        <Link to="/" reloadDocument>
          <img src="logo.svg" />
        </Link>

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
      <div className={content}>
        <Hero>
          <span>
            <h1 className={titleText}>
              Decentralized <br /> knowledge
            </h1>
            <p>
              Learn from anyone, anywhere.
              <br /> Uncensored learning where mentors own their content <br />
              with NFT authentication to secure your progress
            </p>
          </span>
          <img
            className={heroImage}
            src="FrontStudent.png"
            alt="Logo"
            width="268"
            height="385"
          />
        </Hero>
      </div>
      <Link to="/courses" className={heroButt}>
        View Courses
      </Link>
    </div>
  );
}

export default App;
