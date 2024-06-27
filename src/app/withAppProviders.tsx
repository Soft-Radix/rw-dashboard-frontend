// import createGenerateClassName from '@mui/styles/createGenerateClassName';
// import jssPreset from '@mui/styles/jssPreset';
// import { create } from 'jss';
// import jssExtend from 'jss-plugin-extend';
// import rtl from 'jss-rtl';
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StyledEngineProvider } from "@mui/material/styles";
import {
  accManagerRoutes,
  adminRoutes,
  agentRoutes,
  clientRoutes,
} from "app/configs/routesConfig";
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
  function WithAppProviders(props: React.PropsWithChildren<ComponentProps>) {
    /**
     * The value to pass to the AppContext provider.
     */
    console.log(userDetail, "userDetail");
    const val = useMemo(() => {
      if (userDetail?.role === "admin") {
        return { routes: adminRoutes };
      } else if (userDetail?.role === "agent") {
        return { routes: agentRoutes };
      } else if (userDetail?.role === "accmanager") {
        return { routes: accManagerRoutes };
      } else {
        return { routes: clientRoutes };
      }
    }, [adminRoutes, clientRoutes, agentRoutes, accManagerRoutes]);
    // const val = useMemo(() => {
    //   if (userDetail.is_signed == 1) {
    //     if (userDetail.role === "admin") {
    //       return { routes: adminRoutes };
    //     } else if (userDetail.role === "client") {
    //       return { routes: clientRoutes };
    //     }
    //   } else {
    //     return { routes: verificationRoutes };
    //   }
    // }, [userDetail, adminRoutes, clientRoutes, verificationRoutes]);

    // useEffect(() => {
    //   if (
    //     userDetail.is_signed == 0 &&
    //     userDetail.subscription_and_docusign?.[0]?.link
    //   ) {
    //     window.open(userDetail.subscription_and_docusign[0].link, "_blank");
    //     window.location.href = "/sign-in";
    //   }
    // }, [userDetail]);

    // // If val is null (i.e., user is not signed in), redirect to the sign-in page
    // useEffect(() => {
    //   if (val == null) {
    //     window.location.href = "/sign-in";
    //   }
    // }, [val]);

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
