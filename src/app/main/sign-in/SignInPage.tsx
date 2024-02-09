import CardContent from "@mui/material/CardContent";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import AuthBox from "src/app/components/AuthBox";
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
          </div>

          <JwtLoginTab />
        </CardContent>
      </Paper>
      <AuthBox />
    </div>
  );
}

export default SignInPage;
