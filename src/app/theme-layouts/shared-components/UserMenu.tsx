import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import { darken } from "@mui/material/styles";
import { DownArrow } from "public/assets/icons/topBarIcons";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useAuth } from "src/app/auth/AuthRouteProvider";
import { selectUser } from "src/app/auth/user/store/userSlice";
import { getLocalStorage } from "src/utils";
import { logoutCometChat } from "app/configs/cometChatConfig";
import SignOutModal from "src/app/auth/SignOutModal";
import { restAll } from "app/store/Client";
import { useAppDispatch } from "app/store/store";

/**
 * The user menu.
 */
function UserMenu() {
  const user = getLocalStorage("userDetail");
  const { signOut } = useAuth();
  const dispatch = useAppDispatch();
  const [userMenu, setUserMenu] = useState<HTMLElement | null>(null);
  const [isSignOut, setIsSignOut] = useState<boolean>(false);

  const userMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setUserMenu(event.currentTarget);
  };

  const userMenuClose = () => {
    setUserMenu(null);
  };

  if (!user) {
    return null;
  }
  const handleLogout = async () => {
    dispatch(restAll());
    signOut();
    await logoutCometChat();
    localStorage.clear();
  };
  return (
    <>
      <Button
        className="flex gap-5 p-0 min-h-40 min-w-40  md:py-6 "
        onClick={userMenuClick}
        color="inherit"
      >
        {user?.photoURL ? (
          <Avatar
            sx={{
              background: (theme) => theme.palette.background.default,
              color: (theme) => theme.palette.text.primary,
            }}
            className="md:mx-4"
            alt="user photo"
            src={user.data.photoURL}
          />
        ) : (
          <Avatar
            sx={{
              background: (theme) =>
                darken(theme.palette.background.default, 0.05),
              color: (theme) => theme.palette.text.secondary,
            }}
            className="md:mx-4"
          >
            {user?.first_name?.[0]}
          </Avatar>
        )}
        <div className="flex-col items-start hidden mx-4 md:flex">
          <Typography component="span" className="flex font-semibold">
            {user.first_name}
          </Typography>
          <Typography
            className="font-medium capitalize text-11"
            color="text.secondary"
          >
            {user.role?.toString()}
            {(!user.role ||
              (Array.isArray(user.role) && user.role.length === 0)) &&
              "Guest"}
          </Typography>
        </div>
        <DownArrow />
      </Button>

      <Popover
        open={Boolean(userMenu)}
        anchorEl={userMenu}
        onClose={userMenuClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        classes={{
          paper: "py-8",
        }}
      >
        {!user.role || user.role.length === 0 ? (
          <>
            <MenuItem component={Link} to="/sign-in" role="button">
              <ListItemIcon className="min-w-40">
                <FuseSvgIcon>heroicons-outline:lock-closed</FuseSvgIcon>
              </ListItemIcon>
              <ListItemText primary="Sign In" />
            </MenuItem>
            <MenuItem component={Link} to="/sign-up" role="button">
              <ListItemIcon className="min-w-40">
                <FuseSvgIcon>heroicons-outline:user-add </FuseSvgIcon>
              </ListItemIcon>
              <ListItemText primary="Sign up" />
            </MenuItem>
          </>
        ) : (
          <>
            <MenuItem component={Link} to="/profile" onClick={userMenuClose}>
              <ListItemIcon className="min-w-40">
                <FuseSvgIcon>heroicons-outline:user</FuseSvgIcon>
              </ListItemIcon>
              <ListItemText primary="My profile" />
            </MenuItem>
            <MenuItem
              onClick={() => {
                setIsSignOut(true);
                // signOut();
                // await logoutCometChat();
                // localStorage.clear();
              }}
            >
              <ListItemIcon className="min-w-40">
                <FuseSvgIcon>heroicons-outline:logout</FuseSvgIcon>
              </ListItemIcon>
              <ListItemText primary="Sign out" />
            </MenuItem>
          </>
        )}
      </Popover>
      <SignOutModal
        isOpen={isSignOut}
        setIsOpen={setIsSignOut}
        onDelete={handleLogout}
      />
    </>
  );
}

export default UserMenu;
