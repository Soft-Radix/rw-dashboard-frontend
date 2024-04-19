import { MenuItem, styled, useTheme } from "@mui/material";

type MonthlyProp = {
  value: string,
  label: string
}

/**
 * Get access token from local storage
 */
export const getLocalStorage = (item) => {
  let data = localStorage.getItem(item);
  return data ? JSON.parse(data) : null;
};


export const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: "16px",
  "& .radioIcon": {
    color: "#9DA0A6",
    border: "2px solid currentColor",
    height: "16px",
    aspectRatio: 1,
    borderRadius: "50%",
    position: "relative",
  },
  "&.Mui-selected": {
    backgroundColor: "transparent",
    "& .radioIcon": {
      color: theme.palette.secondary.main,
      "&::after": {
        content: '""',
        display: "block",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        height: "7px",
        aspectRatio: 1,
        borderRadius: "50%",
        backgroundColor: "currentColor",
      },
    },
  },
}));


export const MonthlyOptions: MonthlyProp[] = [
  { value: "One", label: "One time" },
  { value: "Monthly", label: "Monthly" },
  { value: "Quarterly", label: "Quarterly" },
  { value: "Semi", label: "Semi annually" },
  { value: "Add weekly and bi-weekly", label: "Annually" },
  { value: "Add weekly and bi-weekly", label: "Add weekly and bi-weekly" },
];