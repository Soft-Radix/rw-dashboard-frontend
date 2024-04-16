import {
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
}
function CommonTable({
  children,
  headings,
  headingRowProps,
  useBorderDesign,
  headingIcon,
  headIcon,
}: IProps) {
  console.log(headIcon, "hjh");
  return (
    <TableContainer>
      <Table
        size="small"
        aria-label="simple table"
        className={`${useBorderDesign ? "border-design" : "common_table"}`}
      >
        <TableHead
          className={`${useBorderDesign ? "bg-[#F7F9FB] text-sm border-solid border-[#EDF2F6]" : "bg-[#F7F9FB] text-sm border-b-2 border-solid border-[#EDF2F6]"}`}
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
              >
                {headingIcon ? (
                  <TableCell
                    align={
                      headings.length - 1 === index || index === 0
                        ? "left"
                        : "center"
                    }
                    className="flex items-center "
                  >
                    {headIcon[index]} {item}
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
