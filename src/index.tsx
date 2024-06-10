import "./i18n";
import "./styles/app-base.scss";
import "./styles/app-components.css";
import "./styles/app-utilities.scss";
import { createRoot } from "react-dom/client";
import App from "./app/App";
// import { Auth0Provider } from "@auth0/auth0-react";
// import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { Auth0Provider } from "@auth0/auth0-react";
import { GoogleOAuthProvider } from "@react-oauth/google";

// import * as serviceWorker from './serviceWorker';
// import reportWebVitals from './reportWebVitals';

/**
 * The root element of the application.
 */
const container = document.getElementById("root");

if (!container) {
  throw new Error("Failed to find the root element");
}

/**
 * The root component of the application.
 */
const root = createRoot(container);
const domain = "dev-l1sqgjqe111tczqs.us.auth0.com";
const clientId = "NgQphUFTHoBVtXXBNZtDrIngWgdsvFGD";

root.render(
  // <Auth0Provider
  //   domain={"dev-l1sqgjqe111tczqs.us.auth0.com"}
  //   clientId={"NgQphUFTHoBVtXXBNZtDrIngWgdsvFGD"}
  //   authorizationParams={{
  //     redirect_uri: window.location.origin,
  //   }}
  //   // useRefreshTokens={true}
  //   // cacheLocation="localstorage"
  // >
  <GoogleOAuthProvider clientId="981292054089-7oofrqkplgr50dloeqcnqoi7jbtqqtnq.apps.googleusercontent.com">
    <App />
  </GoogleOAuthProvider>
  // {/* </Auth0Provider> */}
);

// reportWebVitals();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
// serviceWorker.unregister();
