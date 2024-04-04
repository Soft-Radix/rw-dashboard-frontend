import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableRowProps,
} from "@mui/material";
import { ReactNode } from "react";

interface IProps {
  children: ReactNode;
  headings: string[];
  headingRowProps?: TableRowProps;
  useBorderDesign?: boolean;
}
function CommonTable({
  children,
  headings,
  headingRowProps,
  useBorderDesign,
}: IProps) {
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
                {item}
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
