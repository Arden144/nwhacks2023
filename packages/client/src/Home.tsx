import { useAuth0 } from "@auth0/auth0-react";
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
    <>
      <Link to="courses">Courses</Link>
      <button onClick={onLogout}>Logout</button>
    </>
  );
}

export default App;
