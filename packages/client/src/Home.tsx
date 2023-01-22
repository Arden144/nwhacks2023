import { useAuth0 } from "@auth0/auth0-react";
import Button from "@lib/Button";
import Hero from "@lib/Hero";
import Title from "@lib/Title";
import Toolbar from "@lib/Toolbar";
import { Link } from "react-router-dom";

function App() {
  const { isAuthenticated, isLoading, loginWithRedirect, logout } = useAuth0();

  const onLogout = () =>
    logout({ logoutParams: { returnTo: window.location.origin } });

  if (isLoading) {
    return <p>Loading</p>;
  }

  if (!isAuthenticated) {
    return <button onClick={() => loginWithRedirect()}>Login</button>;
  }

  return (
    <div>
      <Toolbar>
        <img src="logo.svg" />
        <span>
          <Link to="courses">Courses</Link>
          <Button onClick={onLogout}>Logout</Button>
        </span>
      </Toolbar>
      <Hero>
        <Title>Hello there</Title>
      </Hero>
      <p>some random text</p>
    </div>
  );
}

export default App;
