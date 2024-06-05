import { Pagination, PaginationProps, styled } from "@mui/material";
// import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

import React from "react";

interface IProps extends PaginationProps {
  onPageChange?: (event: React.ChangeEvent<unknown>, page: number) => void;
  currentPage?: number;
  count?: number;
  onChange?: any;
}

const StyledPagination = styled(Pagination)(({ theme }) => ({
  "& ul": {
    alignItems: "initial",
  },
  "& li": {
    margin: "0 4px",
  },
  "& .MuiPaginationItem-root": {
    border: "1px solid #E7E8E9",
    borderRadius: 4,
    margin: 0,
    height: 32,
    width: 32,
    backgroundColor: "transparent",
    "& .MuiSvgIcon-root": {
      width: "1.3em",
      height: "auto",
      color: "#9DA0A6",
    },
    "&.Mui-selected": {
      color: theme.palette.secondary.main,
      borderColor: "currentColor",
      backgroundColor: "transparent",
    },
    "&.Mui-disabled": {
      opacity: 0.5,
      backgroundColor: "#E7E8E9",
      borderColor: "#9DA0A6",
    },
  },
}));

function CommonPagination({
  onPageChange,
  currentPage,
  count,
  ...rest
}: IProps) {
  // console.log("🚀 ~ count:", count);

  return (
    // <StyledPagination
    //   count={count}
    //   page={currentPage}
    //   onChange={onPageChange}
    //   {...rest}
    // />
    <Stack spacing={2}>
      <Pagination
        count={count}
        siblingCount={0}
        boundaryCount={1}
        page={currentPage}
        onChange={onPageChange}
        sx={{
          "& .Mui-selected": {
            borderColor: "#4f46e5",
            background: "#fff",
          },
        }}
        {...rest}
        variant="outlined"
        shape="rounded"
      />
    </Stack>
  );
}

export default CommonPagination;
