import { Component, ReactNode } from "react";
import { matchRoutes } from "react-router-dom";
import FuseUtils from "@fuse/utils";
import AppContext, { AppContextType } from "app/AppContext";
import withRouter from "@fuse/core/withRouter";
import history from "@history";
import { WithRouterProps } from "@fuse/core/withRouter/withRouter";
import { FuseRouteItemType } from "@fuse/utils/FuseUtils";
import {
  getSessionRedirectUrl,
  resetSessionRedirectUrl,
  setSessionRedirectUrl,
} from "@fuse/core/FuseAuthorization/sessionRedirectUrl";
import FuseLoading from "@fuse/core/FuseLoading";

type FuseAuthorizationProps = {
  children: ReactNode;
  location: Location;
  userRole: string[] | string;
  loginRedirectUrl?: string;
} & WithRouterProps;

type State = AppContextType & {
  accessGranted: boolean;
};

function isUserGuest(role: string[] | string) {
  return !role || (Array.isArray(role) && role.length === 0);
}

class FuseAuthorization extends Component<FuseAuthorizationProps, State> {
  timer: NodeJS.Timeout | null = null;

  constructor(props: FuseAuthorizationProps, context: AppContextType) {
    super(props);

    const { routes } = context;

    this.state = {
      accessGranted: true,
      routes,
    };
  }

  componentDidMount() {
    console.log(
      "Component Did Mount - Access Granted:",
      this.state.accessGranted
    );
    if (!this.state.accessGranted) {
      // this.redirectRoute();
    }
  }

  componentWillUnmount() {
    if (this.timer) {
      clearTimeout(this.timer);
    }
  } 

  shouldComponentUpdate(nextProps: FuseAuthorizationProps, nextState: State) {
    const { accessGranted } = this.state;
    console.log(
      "Should Component Update - Access Granted:",
      accessGranted,
      "Next Access Granted:",
      nextState.accessGranted
    );
    return nextState.accessGranted !== accessGranted;
  }

  componentDidUpdate(prevProps: FuseAuthorizationProps, prevState: State) {
    const { accessGranted } = this.state;

    if (accessGranted !== prevState.accessGranted) {
      if (this.timer) {
        clearTimeout(this.timer);
      }

      this.timer = setTimeout(() => {
        this.setState({ accessGranted });
        if (!accessGranted) {
          this.redirectRoute();
        }
      }, 3000);
    }
  }

  static getDerivedStateFromProps(props: FuseAuthorizationProps, state: State) {
    const { location, userRole } = props;
    const { pathname } = location;
    const matchedRoutes = matchRoutes(state.routes, pathname);
    const matched = matchedRoutes ? matchedRoutes[0] : false;

    console.log("Matched Routes:", matchedRoutes);

    const isGuest = isUserGuest(userRole);
    console.log("Is User Guest:", isGuest);

    if (!matched) {
      return { accessGranted: true };
    }

    const { route }: { route: FuseRouteItemType } = matched;
    console.log("User Role:", userRole, "Route Auth:", route.auth);

    let userHasPermission = FuseUtils.hasPermission(route.auth, userRole);
    console.log("User Has Permission:", userHasPermission);

    if (route.auth == undefined && userRole == undefined) {
      return { accessGranted: false };
    }

    const ignoredPaths = [
      "/",
      "/callback",
      "/sign-in",
      "/sign-out",
      "/logout",
      "/404",
      "/verification",
    ];

    console.log(
      "Ignored Paths:",
      ignoredPaths.includes(pathname),
      "Pathname:",
      pathname
    );

    if (matched && !userHasPermission && !ignoredPaths.includes(pathname)) {
      setSessionRedirectUrl(pathname);
    }

    if (!userHasPermission && !isGuest && !ignoredPaths.includes(pathname)) {
      setSessionRedirectUrl("/");
    }

    return {
      accessGranted: matched ? userHasPermission : true,
    };
  }

  redirectRoute() {
    const { userRole, loginRedirectUrl = "/" } = this.props;
    const redirectUrl = getSessionRedirectUrl() || loginRedirectUrl;

    if (!userRole || userRole.length === 0) {
      setTimeout(() => history.push("/sign-in"), 0);
    } else {
      setTimeout(() => history.push(redirectUrl), 0);
      resetSessionRedirectUrl();
    }
  }

  render() {
    const { accessGranted } = this.state;
    const { children } = this.props;

    return accessGranted ? children : <FuseLoading />;
  }
}

FuseAuthorization.contextType = AppContext;

export default withRouter(FuseAuthorization);
