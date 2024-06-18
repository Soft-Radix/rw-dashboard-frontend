import { MenuItem, styled } from "@mui/material";
import { addMonths, addYears } from "date-fns";

type SelectProp = {
  value: string;
  label: string;
};

/**
 * Get access token from local storage
 */
export const getLocalStorage = (item: string) => {
  let data = localStorage.getItem(item);
  return data !== null && data !== undefined ? JSON.parse(data) : "{}";
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
    fontWeight: 500,
    lineHeight: "20px",
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

export const MonthlyOptions: SelectProp[] = [
  { value: "1", label: "One time" },
  { value: "2", label: "Monthly" },
  { value: "3", label: "Quarterly" },
  { value: "4", label: "Semi annually" },
  { value: "5", label: "Annually" },
  // { value: "Add weekly and bi-weekly", label: "Add weekly and bi-weekly" },
];

export function getLabelByValue(value: string): string {
  const option = MonthlyOptions.find((option) => option.value == value);
  return option ? option.label : "--";
}

export function getAdjustedDate(date: Date, value: any): Date {
  switch (value) {
    case 1:
      return null;
    case 2:
      return addMonths(date, 1);
    case 3:
      return addMonths(date, 3);
    case 4:
      return addMonths(date, 6);
    case 5:
      return addYears(date, 1);
    default:
  }
}

export function getAdjustedTime(value: any): string {
  switch (value) {
    case 1:
      return "";
    case 2:
      return "1 month";
    case 3:
      return "3 months";
    case 4:
      return "6 months";
    case 5:
      return "1 year";
    default:
  }
}
export function getAdjusted(value: any): string {
  switch (value) {
    case 1:
      return "One time";
    case 2:
      return "Month";
    case 3:
      return "Quarterly";
    case 4:
      return "Semi annually";
    case 5:
      return "Annually";
    default:
  }
}

export const EmployOptions: SelectProp[] = [
  { value: "1", label: "One time" },
  { value: "2", label: "Monthly" },
  { value: "3", label: "Quarterly" },
  { value: "4", label: "Semi annually" },
  { value: "5", label: "Annually" },
  // { value: "Add weekly and bi-weekly", label: "Add weekly and bi-weekly" },
];
export const UnitDiscount: SelectProp[] = [
  { value: "1", label: "%" },
  { value: "2", label: "USD" },
];
export const Action: SelectProp[] = [
  { value: "Edit", label: "Edit" },
  { value: "Doller", label: "Doller" },
];

export const BillingTermsOptions: SelectProp[] = [
  { value: "2", label: "Automatically renew until cancelled" },
  { value: "1", label: "Fixed number of payments" },
];

const columnKey = {
  Id: "id",
  Name: "first_name",
  ["Company Name"]: "company_name",
  ["Joining Date"]: "created_at",
  ["Subscription Status"]: "subscription_status",
  ["Account Status"]: "status",
};

// export const sortList = (column: string, isAsc: boolean, list: any) => {
//   const sortedRows = [...list].sort((a, b) => {
//     if (a[columnKey[column]] < b[columnKey[column]]) return isAsc ? -1 : 1;
//     if (a[columnKey[column]] > b[columnKey[column]]) return isAsc ? 1 : -1;
//     return 0;
//   });
//   return sortedRows;
// };

export const sortList = (column: string, isAsc: boolean, list: any) => {
  const sortedRows = [...list].sort((a, b) => {
    const aValue = a[columnKey[column]]
      ? a[columnKey[column]].toString().toLowerCase()
      : "";
    const bValue = b[columnKey[column]]
      ? b[columnKey[column]].toString().toLowerCase()
      : "";

    if (aValue < bValue) return isAsc ? -1 : 1;
    if (aValue > bValue) return isAsc ? 1 : -1;
    return 0;
  });
  return sortedRows;
};

/**
 * Calculates the page number for a given item indexs.
 * @param itemIndex - The zero-based index of the item.
 * @param itemsPerPage - The number of items displayed on each page.
 * @returns The one-based page number where the item resides.
 */
export function calculatePageNumber(
  itemIndex: number,
  itemsPerPage: number
): number {
  if (itemsPerPage <= 0) {
    return 1;
  }

  // This is a one-based page number, so add 1 to the result.
  return Math.ceil(itemIndex / itemsPerPage);
}
