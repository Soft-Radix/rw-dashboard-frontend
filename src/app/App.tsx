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
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "./store/store";
import { getLocalStorage } from "src/utils";
import { Auth0Provider } from "@auth0/auth0-react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import store from "./store/store";
import { setInitialState } from "./theme-layouts/shared-components/navigation/store/navigationSlice";
import { ChatProvider } from "./chatContext/ChatProvider";
import {
  CometChatOngoingCall,
} from "@cometchat/chat-uikit-react";
import IncomingCallHandler from "./components/chatBoard/IncomingCallHandler";

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
  const dispatch = useDispatch<AppDispatch>();
  const persistor = persistStore(store);
  useEffect(() => {
    const userDetail = getLocalStorage("userDetail");
    dispatch(setInitialState(userDetail));
    console.log("userDetail?.role", userDetail?.role);
  }, []);
  /**
   * The language direction from the Redux store.
   */
  const langDirection = useSelector(selectCurrentLanguageDirection);

  /**
   * The main theme from the Redux store.
   */
  const mainTheme = useSelector(selectMainTheme);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <MockAdapterProvider>
          <CacheProvider
            value={createCache(emotionCacheOptions[langDirection] as Options)}
          >
            <FuseTheme theme={mainTheme} direction={langDirection}>
              <AuthRouteProvider>
                <ChatProvider>
                  <div className="">
                  <IncomingCallHandler />
                  </div>
                  <div>
                    <CometChatOngoingCall />
                  </div>

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
                </ChatProvider>
              </AuthRouteProvider>
            </FuseTheme>
          </CacheProvider>
        </MockAdapterProvider>
      </PersistGate>
    </Provider>
  );
}

export default withAppProviders(App);
