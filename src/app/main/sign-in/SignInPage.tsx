import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import JwtLoginTab from "./tabs/JwtSignInTab";

/**
 * The sign in page.
 */
function SignInPage() {
  return (
    <div className="flex min-w-0 flex-1 flex-col items-center sm:flex-row sm:justify-center md:items-start md:justify-start">
      <Paper className="h-full w-full px-16 py-8 ltr:border-r-1 rtl:border-l-1 sm:h-auto sm:w-auto sm:rounded-2xl sm:p-48 sm:shadow md:flex md:h-full md:w-1/2 md:items-center md:rounded-none md:p-64 md:shadow-none flex justify-center">
        <CardContent className="mx-auto max-w-420 sm:mx-0 sm:w-420">
          <div className="flex items-center">
            <img src="assets/icons/remote-icon.svg" alt="" />
          </div>

          <Typography className="mt-32 text-[48px] font-bold leading-tight tracking-tight">
            Log In
          </Typography>
          <div className="mt-2 flex items-baseline font-medium">
            <Typography className="text-[18px] text-[#757982] mt-8">
              To proceed, kindly provide the required details below.
            </Typography>
            {/* <Link className="ml-4" to="/sign-up">
              Sign up
            </Link> */}
          </div>

          <JwtLoginTab />
        </CardContent>
      </Paper>

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
            Embark on a journey with us, empowering your entrepreneurial spirit
            to shape and cultivate your business from the ground up.
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
              More than <span className="text-[#9994F0]">170k</span> <br />{" "}
              people joined us
            </div>
          </div>
        </div>
      </Box>
    </div>
  );
}

export default SignInPage;
