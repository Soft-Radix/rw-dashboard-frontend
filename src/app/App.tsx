import FuseLayout from "@fuse/core/FuseLayout";
import FuseTheme from "@fuse/core/FuseTheme";
import { SnackbarProvider } from "notistack";
import { useSelector } from "react-redux";
import rtlPlugin from "stylis-plugin-rtl";
import createCache, { Options } from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { selectCurrentLanguageDirection } from "app/store/i18nSlice";
import themeLayouts from "app/theme-layouts/themeLayouts";
import { selectMainTheme } from "@fuse/core/FuseSettings/store/fuseSettingsSlice";
import MockAdapterProvider from "@mock-api/MockAdapterProvider";
import withAppProviders from "./withAppProviders";
import { AuthRouteProvider } from "./auth/AuthRouteProvider";
import { Toaster } from 'react-hot-toast';

// import axios from 'axios';
/**
 * Axios HTTP Request defaults
 */
// axios.defaults.baseURL = "";
// axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
// axios.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded';

const emotionCacheOptions = {
  rtl: {
    key: "muirtl",
    stylisPlugins: [rtlPlugin],
    insertionPoint: document.getElementById("emotion-insertion-point"),
  },
  ltr: {
    key: "muiltr",
    stylisPlugins: [],
    insertionPoint: document.getElementById("emotion-insertion-point"),
  },
};

/**
 * The main App component.
 */
function App() {
  /**
   * The language direction from the Redux store.
   */
  const langDirection = useSelector(selectCurrentLanguageDirection);

  /**
   * The main theme from the Redux store.
   */
  const mainTheme = useSelector(selectMainTheme);

  return (
    <MockAdapterProvider>
      <CacheProvider
        value={createCache(emotionCacheOptions[langDirection] as Options)}
      >
        <FuseTheme theme={mainTheme} direction={langDirection}>
          <AuthRouteProvider>
            <FuseLayout layouts={themeLayouts} />
            <Toaster
              position="top-center"
              reverseOrder={false}
              toastOptions={{
                style: {
                  zIndex: 9999, // Set z-index to your desired value
                },
              }}
            />
          </AuthRouteProvider>
        </FuseTheme>
      </CacheProvider>
    </MockAdapterProvider>
  );
}

export default withAppProviders(App);
