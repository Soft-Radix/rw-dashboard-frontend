import {
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableRowProps,
} from "@mui/material";
import { DownArrowBlack } from "public/assets/icons/projectsIcon";
import { ReactNode } from "react";

interface IProps {
  children: ReactNode;
  headings: string[];
  headingRowProps?: TableRowProps;
  useBorderDesign?: boolean;
  headingIcon?: boolean;
  headIcon?: any;
  sortColumn?: string;
  sortOrder?: string;
  onSort?: (column: string) => void;
}
function CommonTable({
  children,
  headings,
  headingRowProps,
  useBorderDesign,
  headingIcon,
  headIcon,
  onSort,
}: IProps) {
  return (
    <TableContainer>
      <Table
        size="small"
        aria-label="simple table"
        className={`${useBorderDesign ? "border-design" : "common_table "}`}
      >
        <TableHead
          className={`${useBorderDesign ? "bg-[#F7F9FB] text-sm border-solid border-[#EDF2F6]" : "bg-[#F7F9FB] text-sm border-b-2 border-solid border-[#EDF2F6]"} `}

          // sx={{
          //   "& th": {
          //     borderBottom: "1px solid #EDF2F6",
          //   },
          // }}
        >
          <TableRow {...headingRowProps}>
            {headings.map((item, index) => (
              <TableCell
                className={`th ${index === 0 ? "pl-20" : ""}`}
                key={index}
                align={
                  headings.length - 1 === index || index === 0
                    ? "left"
                    : "center"
                }
                onClick={() => {
                  if (typeof onSort == "function") {
                    onSort(item);
                  } else null;
                }}
              >
                {headingIcon ? (
                  <TableCell
                    align={
                      headings.length - 1 === index || index === 0
                        ? "left"
                        : "left"
                    }
                    className={`th ${index === 0 ? "flex gap-10 justify-start items-center" : "flex gap-10 justify-center items-center"}`}
                  >
                    {index === 0 && (
                      <div>
                        <Checkbox />
                      </div>
                    )}
                    <div className="flex items-center gap-10">
                      {headIcon[index]} {item}
                    </div>
                  </TableCell>
                ) : (
                  <>{item}</>
                )}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>{children}</TableBody>
      </Table>
    </TableContainer>
  );
}

export default CommonTable;
