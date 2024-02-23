import {
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  Theme,
  TableRow,
} from "@mui/material";
import {
  ArrowRightCircleIcon,
  DeleteIcon,
  EditIcon,
} from "public/assets/icons/common";
import { useTheme } from "@mui/styles";

const rows = [
  {
    title: "Brand logo design",
    defaultChecked: true,
    assignedImg: ["female-01.jpg", "female-02.jpg", "female-03.jpg"],
    priority: "Medium",
  },
  {
    title: "Brand logo design",
    defaultChecked: true,
    assignedImg: [
      "female-01.jpg",
      "female-02.jpg",
      "female-03.jpg",
      "female-04.jpg",
      "female-05.jpg",
    ],
    priority: "Medium",
  },
  {
    title: "Brand logo design",
    defaultChecked: false,
    assignedImg: ["female-01.jpg", "female-02.jpg", "female-03.jpg"],
    priority: "Medium",
  },
  {
    title: "Brand logo design",
    defaultChecked: false,
    assignedImg: ["female-01.jpg", "female-02.jpg", "female-03.jpg"],
    priority: "Low",
  },
  {
    title: "Brand logo design",
    defaultChecked: false,
    assignedImg: ["female-01.jpg", "female-02.jpg", "female-03.jpg"],
    priority: "High",
  },
  {
    title: "Brand logo design",
    defaultChecked: false,
    assignedImg: ["female-01.jpg", "female-02.jpg", "female-03.jpg"],
    priority: "Low",
  },
  {
    title: "Brand logo design",
    defaultChecked: false,
    assignedImg: ["female-01.jpg", "female-02.jpg", "female-03.jpg"],
    priority: "High",
  },
];

function ThemePageTable() {
  const theme: Theme = useTheme();
  return (
    <TableContainer>
      <Table size="small" aria-label="simple table">
        <TableHead className="bg-[#F7F9FB] text-sm">
          <TableRow>
            <TableCell className="text-sm text-grey-500 pl-20">Title</TableCell>
            <TableCell className="text-sm text-grey-500" align="center">
              Assigned
            </TableCell>
            <TableCell className="text-sm text-grey-500" align="center">
              Due Date
            </TableCell>
            <TableCell className="text-sm text-grey-500" align="center">
              Priority
            </TableCell>
            <TableCell className="text-sm text-grey-500" align="left">
              Action
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow
              key={index}
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
                "& td": {
                  borderBottom: "1px solid #EDF2F6",
                  paddingTop: "12px",
                  paddingBottom: "12px",
                  color: theme.palette.primary.main,
                },
              }}
            >
              <TableCell scope="row">
                <span className="flex items-center gap-10">
                  <Checkbox
                    sx={{ padding: "4px" }}
                    color="primary"
                    defaultChecked={row.defaultChecked}
                    inputProps={{
                      "aria-labelledby": `table-checkbox-${index}`,
                    }}
                  />{" "}
                  {row.title}
                </span>
              </TableCell>
              <TableCell align="center">
                <div className="flex justify-center">
                  {row.assignedImg.map((item, index) =>
                    index < 3 ? (
                      <img
                        className="h-[34px] w-[34px] rounded-full border-2 border-white ml-[-14px] z-0"
                        key={item}
                        src={`/assets/images/avatars/${item}`}
                        alt={item}
                        loading="lazy"
                      />
                    ) : index > 3 ? (
                      <span
                        style={{
                          backgroundColor: theme.palette.secondary.main,
                        }}
                        className="h-[34px] w-[34px] flex items-center justify-center text-sm text-white bg-secondary rounded-full border-2 border-white ml-[-10px] z-0"
                      >
                        +{row.assignedImg.length - 3}
                      </span>
                    ) : null
                  )}
                </div>
              </TableCell>
              <TableCell align="center">Feb 12,2024</TableCell>
              <TableCell align="center">
                <span
                  className={`inline-flex items-center justify-center rounded-full w-[70px] min-h-[25px] text-sm font-500
               ${row.priority === "Low" ? "text-[#4CAF50] bg-[#4CAF502E]" : row.priority === "Medium" ? "text-[#FF5F15] bg-[#FF5F152E]" : "text-[#F44336] bg-[#F443362E]"}`}
                >
                  {row.priority}
                </span>
              </TableCell>
              <TableCell align="left" className="w-[1%]">
                <div className="flex gap-20">
                  <span className="p-2 cursor-pointer">
                    <DeleteIcon />
                  </span>
                  <span className="p-2 cursor-pointer">
                    <EditIcon />
                  </span>
                  <span className="p-2 cursor-pointer">
                    <ArrowRightCircleIcon />
                  </span>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ThemePageTable;
