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
}
function CommonTable({ children, headings, headingRowProps }: IProps) {
  return (
    <TableContainer>
      <Table size="small" aria-label="simple table" className="common_table">
        <TableHead className="bg-[#F7F9FB] text-sm">
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
