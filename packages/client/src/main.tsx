import { Auth0Provider } from "@auth0/auth0-react";
import TRPCProvider from "@lib/TRPCProvider";
import {
  createReactClient,
  LivepeerConfig,
  studioProvider,
} from "@livepeer/react";
import Courses from "Courses";
import Home from "Home";
import "index.css";
import "@fontsource/catamaran";
import "@fontsource/cormorant";
import "@fontsource/open-sans";
import "@fontsource/inter";
import "@fontsource/catamaran/variable.css";
import "@fontsource/cormorant/variable.css";
import "@fontsource/open-sans/variable.css";
import "@fontsource/inter/variable.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CoursePlayer from "CoursePlayer";

const client = createReactClient({
  provider: studioProvider({ apiKey: "99d58c2e-935e-4258-8079-57ab1d94f6e1" }),
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "courses",
    element: <Courses />,
  },
  {
    path: "courses/:courseId",
    element: <CoursePlayer />,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Auth0Provider
      domain="nwhacks2023.us.auth0.com"
      clientId="AhniyiCqDbHs5Odk7wkZEeF1wAysIruU"
      useRefreshTokens
      cacheLocation="localstorage"
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
    >
      <TRPCProvider>
        <LivepeerConfig client={client}>
          <RouterProvider router={router} />
        </LivepeerConfig>
      </TRPCProvider>
    </Auth0Provider>
  </React.StrictMode>
);
