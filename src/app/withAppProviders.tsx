// import createGenerateClassName from '@mui/styles/createGenerateClassName';
// import jssPreset from '@mui/styles/jssPreset';
// import { create } from 'jss';
// import jssExtend from 'jss-plugin-extend';
// import rtl from 'jss-rtl';
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StyledEngineProvider } from "@mui/material/styles";
import { adminRoutes, clientRoutes } from "app/configs/routesConfig";
import { useEffect, useMemo } from "react";
import { Provider } from "react-redux";
import ErrorBoundary from "@fuse/utils/ErrorBoundary";
import AppContext from "./AppContext";
import store from "./store/store";
import { getLocalStorage } from "src/utils";

type ComponentProps = {
  name?: string;
};

/**
 * A Higher Order Component that provides the necessary context providers for the app.
 */
function withAppProviders(Component: React.ComponentType<ComponentProps>) {
  /**
   * The component that wraps the provided component with the necessary context providers.
   */
  const userDetail = getLocalStorage("userDetail");
  console.log("🚀 ~ withAppProviders ~ userDetail:", userDetail);
  function WithAppProviders(props: React.PropsWithChildren<ComponentProps>) {
    /**
     * The value to pass to the AppContext provider.
     */

    // const val = useMemo(
    //   () =>
    //     userDetail?.role === "admin"
    //       ? { routes: adminRoutes }
    //       : { routes: clientRoutes },
    //   [adminRoutes, clientRoutes]
    // );
    const val = useMemo(() => {
      if (userDetail.is_signed == 1) {
        if (userDetail.role == "admin") {
          return { routes: adminRoutes };
        } else if (userDetail.role == "client") {
          return { routes: clientRoutes };
        }
      }
      window.location.href = "/sign-in";
    }, [userDetail, adminRoutes, clientRoutes]);

    useEffect(() => {
      if (
        userDetail.is_signed == 0 &&
        userDetail.subscription_and_docusign?.[0]?.link
      ) {
        window.open(userDetail.subscription_and_docusign[0].link, "_blank");
        window.location.href = "/sign-in";
      }
    }, [userDetail]);

    return (
      <ErrorBoundary>
        <AppContext.Provider value={val}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Provider store={store}>
              <StyledEngineProvider injectFirst>
                <Component {...props} />
              </StyledEngineProvider>
            </Provider>
          </LocalizationProvider>
        </AppContext.Provider>
      </ErrorBoundary>
    );
  }

  return WithAppProviders;
}

export default withAppProviders;
