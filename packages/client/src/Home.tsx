import { useAuth0 } from "@auth0/auth0-react";
import Button from "@lib/Button";
import Hero from "@lib/Hero";
import Title from "@lib/Title";
import Toolbar from "@lib/Toolbar";
import { css } from "@linaria/core";
import { Link } from "react-router-dom";

const heroButt = css`
  color: var(--secondary-label);
  background-color: var(--background-color);
  border: none;
  font-size: 20px;
  font-weight: 500;
  padding: 1.2rem 2.5rem;
  border-radius: 2rem;
  margin-left: 42%;
  align-items: center;
  justify-content: center;
  text-align: center;
  text-decoration: none;
`;

const heroImage = css`
  transform: translateY(-29px) scale(1.4);
  border-radius: 5rem;
`;

const links = css`
  text-decoration: none;
  color: var(--secondary-label)
  margin-left: 50px; 
  margin-right: 50px;
`;

const titleText = css`
  font-family: InterVariable, Inter;
  font-weight: 900;
  font-size: 3rem;
`;

const searchBar = css`
  font-size: 16px;
  margin-right: 50px;
  padding: 6px;
  border: 1px solid #ccc;
  border-radius: 2rem;
`;

function App() {
  const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

  const onLogout = () =>
    logout({ logoutParams: { returnTo: window.location.origin } });

  return (
    <div>
      <Toolbar>
        <span>
          <img src="logo.svg" />
          <input className={searchBar} placeholder="Search Courses" />
          <Link className={links} to="courses">
            Courses
          </Link>
          <Link className={links} to="courses">
            Programs
          </Link>
          <Link className={links} to="courses">
            About Us
          </Link>
        </span>
        {isAuthenticated ? (
          <Button onClick={() => logout()}>Log Out</Button>
        ) : (
          <span>
            <Button onClick={() => loginWithRedirect()}>
              Log In / Sign up
            </Button>
          </span>
        )}
      </Toolbar>
      <Hero>
        <span>
          <h1 className={titleText}>
            Decentralized <br /> knowledge
          </h1>
          <p>
            Learn from anyone, anywhere <br />
            Uncensored learning where mentors own their content <br />
            NFT authenitication to secure your progress
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
      <Link to="/courses" className={heroButt}>
        View Courses
      </Link>
    </div>
  );
}

export default App;
