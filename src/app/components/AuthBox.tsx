import Box from "@mui/material/Box";
import AvatarGroup from "@mui/material/AvatarGroup";
import Avatar from "@mui/material/Avatar";
import { Typography } from "@mui/material";

function AuthBox() {
  return (
    <Box
      className="relative hidden h-full flex-auto items-center justify-center overflow-hidden p-64 md:flex lg:px-112"
      sx={{
        backgroundColor: "primary.main",
      }}
    >
      <svg
        className="absolute top-[-10%] right-0"
        width="418"
        height="394"
        viewBox="0 0 418 394"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M418 354C209.236 354 40.5 209.264 40.5 0.5"
          stroke="white"
          strokeOpacity="0.14"
          strokeWidth="80"
        />
      </svg>

      <svg
        className="absolute bottom-[-10%] left-0"
        width="378"
        height="378"
        viewBox="0 0 378 378"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M338 378C338 191.328 186.672 40 0 40"
          stroke="white"
          strokeOpacity="0.14"
          strokeWidth="80"
        />
      </svg>

      <div className="relative z-10 w-full max-w-2xl">
        <Box
          className="w-[68px] h-9 mb-[20px]"
          sx={{
            backgroundColor: "secondary.main",
          }}
        />
        <div className="text-7xl font-bold leading-none text-gray-100">
          <div className="mb-[5px] text-[60px]">Welcome to</div>
          <div className="text-[60px]">the RCW!</div>
        </div>
        <div className="mt-24 max-w-[467px] leading-6 tracking-tight text-white text-[18px]">
          Embark on a journey with us, empowering your entrepreneurial spirit to
          shape and cultivate your business from the ground up.
        </div>
        <div className="mt-32 flex items-center">
          <AvatarGroup
            sx={{
              "& .MuiAvatar-root": {
                borderColor: "primary.main",
              },
            }}
          >
            <Avatar src="assets/images/avatars/female-18.jpg" />
            <Avatar src="assets/images/avatars/female-11.jpg" />
            <Avatar src="assets/images/avatars/male-09.jpg" />
            <Avatar src="assets/images/avatars/male-16.jpg" />
          </AvatarGroup>

          <div className="ml-16 font-medium tracking-tight text-white text-[16px]">
            More than{" "}
            <Typography className="contents text-[16px]" color="secondary.main">
              170k
            </Typography>{" "}
            <br /> people joined us
          </div>
        </div>
      </div>
    </Box>
  );
}

export default AuthBox;
