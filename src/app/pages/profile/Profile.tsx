import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import { Button, Grid, Switch, Typography, useTheme } from "@mui/material";
import { styled } from "@mui/styles";
import { ArrowRightCircleIcon, EmailIcon } from "public/assets/icons/common";
import { ChangeEvent, useState } from "react";
import { Link } from "react-router-dom";
import TitleBar from "src/app/components/TitleBar";
import ClientDetail from "src/app/components/client/ClientDetail";
import EditProfile from "src/app/components/profile/EditProfile";
import TwoFactorAuth from "src/app/components/profile/TwoFactorAuth";

const Android12Switch = styled(Switch)(() => ({
  padding: 0,
  height: 34,
  width: 80,
  borderRadius: 100,
  "& .MuiSwitch-track": {
    borderRadius: 22 / 2,
    backgroundColor: "#f6f6f6",
    opacity: 1,
    "&::before, &::after": {
      position: "absolute",
      top: "50%",
      transform: "translateY(-50%)",
    },
    "&::before": {
      content: '"ON"',
      left: 10,
      color: "#fff",
      display: "none",
    },
    "&::after": {
      content: '"OFF"',
      right: 10,
      color: "#757982",
    },
  },
  "& .MuiButtonBase-root": {
    padding: 0,
    "& .MuiSwitch-input": {
      left: 0,
    },
    "&.Mui-checked": {
      "& .MuiSwitch-input": {
        left: "-55px",
      },
      transform: "translateX(44px)",
      "&+.MuiSwitch-track": {
        backgroundColor: "#4f46e5",
        opacity: 1,
        "&::before": {
          display: "inline",
        },
        "&::after": {
          display: "none",
        },
      },
    },
  },
  "& .MuiSwitch-thumb": {
    filter: "drop-shadow(0px 0px 6px rgba(0,0,0,0.1))",
    display: "block",
    boxShadow: "none",
    width: "28px",
    height: "auto",
    aspectRatio: 1,
    margin: 3,
    backgroundColor: "white",
  },
}));
export default function Profile() {
  const [isOpenAddModal, setIsOpenAddModal] = useState(false);
  const [isOpenAuthModal, setIsOpenAuthModal] = useState(false);
  const [isAuthenticated, setIsAuthenticate] = useState(false);

  const handleAuthSwitch = (e: ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    setIsAuthenticate(checked);
    if (checked) {
      setIsOpenAuthModal(true);
    }
  };

  return (
    <div>
      <TitleBar title="My Profile" />
      <div className="px-28 gap-20 mb-[3rem]">
        <div className="shadow-md bg-white rounded-lg overflow-hidden">
          <div
            className="aspect-[4.2/1] bg-cover bg-center min-h-[200px] relative"
            style={{
              backgroundImage: "url(/assets/images/pages/profile/cover.jpg)",
            }}
          >
            <span className="absolute top-14 right-14 bg-secondary h-[3.4rem] aspect-square flex items-center justify-center rounded-full border-2 border-white cursor-pointer shadow-lg">
              <FuseSvgIcon className="text-white" size={20}>
                heroicons-outline:camera
              </FuseSvgIcon>
            </span>
          </div>
          <div className="py-[3rem] px-[2.4rem] flex justify-between flex-wrap items-center">
            <div className="flex items-center gap-[4rem] grow">
              <img
                src="/assets/images/avatars/male-01.jpg"
                alt=""
                className="h-[100px] w-[100px] rounded-full"
              />
              <div>
                <h4 className="text-3xl font-600 mb-8">Alexandra</h4>
                <div className="flex justify-between gap-16 text-para_light text-xl lg:gap-[3.2rem]">
                  <p className="flex gap-4 items-center">
                    <FuseSvgIcon size={20}>
                      heroicons-outline:shopping-bag
                    </FuseSvgIcon>
                    Client
                  </p>
                  <p className="flex gap-4 items-center">
                    {/* <FuseSvgIcon size={20}>heroicons-outline:phone</FuseSvgIcon> */}
                    <EmailIcon />
                    info456@gmail.com
                  </p>
                  <p className="flex gap-4 items-center">
                    <FuseSvgIcon size={20}>heroicons-outline:phone</FuseSvgIcon>
                    +1 2513652150
                  </p>
                </div>
              </div>
            </div>
            <Button
              variant="contained"
              color="secondary"
              className="h-[40px] text-[16px] flex gap-8 whitespace-nowrap"
              aria-label="Edit Profile"
              size="large"
              onClick={() => setIsOpenAddModal(true)}
            >
              Edit Profile
            </Button>
          </div>
        </div>
        <Grid container spacing="26px" className="py-[2.4rem]">
          <Grid item lg={6} className="basis-full">
            <Link to="/change-password" className="contents">
              <div className="shadow-md bg-white rounded-lg p-24 flex items-center justify-between gap-10">
                <div>
                  <Typography
                    component="h4"
                    className="text-2xl text-title font-600 mb-8"
                  >
                    Change Password
                  </Typography>
                  <p className="text-para_light">
                    Here you can change your password.
                  </p>
                </div>
                <div className="shrink-0 w-[5rem] aspect-square flex items-center justify-center border rounded-lg border-borderColor">
                  <ArrowRightCircleIcon />
                </div>
              </div>
            </Link>
          </Grid>
          <Grid item lg={6} className="basis-full">
            <div className="shadow-md bg-white rounded-lg p-24 flex items-center justify-between gap-10">
              <div>
                <Typography
                  component="h4"
                  className="text-2xl text-title font-600 mb-8"
                >
                  Google Calendar Integration
                </Typography>
                <p className="text-para_light">
                  Effortlessly keep track of your projects, tasks, etc.
                </p>
              </div>
              <div className="shrink-0 w-[5rem] aspect-square flex items-center justify-center border rounded-lg border-borderColor">
                <ArrowRightCircleIcon />
              </div>
            </div>
          </Grid>
        </Grid>
        <div className="shadow-md bg-white rounded-lg p-24 flex items-center justify-between gap-10">
          <div>
            <Typography
              component="h4"
              className="text-2xl text-title font-600 mb-8"
            >
              Two-Factors Authentication
            </Typography>
            <p className="text-para_light">
              <span className="text-secondary">dum@gmail.com</span> is linked
              for Two-Factor Authentication.
            </p>
          </div>
          <Android12Switch
            checked={isAuthenticated}
            onChange={handleAuthSwitch}
          />
        </div>
      </div>
      <EditProfile isOpen={isOpenAddModal} setIsOpen={setIsOpenAddModal} />
      <TwoFactorAuth isOpen={isOpenAuthModal} setIsOpen={setIsOpenAuthModal} />
    </div>
  );
}
