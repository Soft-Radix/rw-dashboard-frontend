// import { Button, Tab, Tabs, Theme } from "@mui/material";
import {
  Grid,
  ListItemIcon,
  TableCell,
  TableRow,
  Theme,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/styles";
import { useState } from "react";
import CommonTable from "src/app/components/commonTable";
import ActivityChart from "./ActivityChart";
import RecentTaskUpdateTable from "./RecentTaskUpdateTable";
import { useSelector } from "react-redux";
import { ClientRootState } from "app/store/Client/Interface";
import moment from "moment";

const rows = [
  {
    name: "amanda",
    description: "Amanda has successfully completed the logo design task.",
  },
  {
    name: "Alexandra",
    description: "Alexandra has successfully completed the logo design task.",
  },
  {
    name: "Bernadette",
    description: "Bernadette has successfully completed the logo design task.",
  },
  {
    name: "Elizabeth",
    description: "Elizabeth has successfully completed the logo design task.",
  },
  // {
  //   user: [
  //     {
  //       image: "../assets/images/pages/dashBoared/recentTableImg.png",
  //       text: "Penelope",
  //     },
  //   ],
  //   taskCompleted: "Logo Design",
  //   punch: "Out",

  //   updates: [
  //     {
  //       arrow: "../assets/images/pages/dashBoared/arrowUpDown.png",
  //       text: "Recent Task Updates",
  //     },
  //   ],
  // },
];

export default function DashboardRecentActivity() {
  const theme: Theme = useTheme();
  const userDetails = JSON.parse(localStorage.getItem("userDetail"));
  const urlForImage = import.meta.env.VITE_API_BASE_IMAGE_URL;
  const [isOpenAddModal, setIsOpenAddModal] = useState(false);
  const [showUpdateTable, setShowUpdateTable] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);
  const [updateTableIndex, setUpdateTableIndex] = useState<number>();
  const { resetActivity } = useSelector(
    (store: ClientRootState) => store.client
  );
  // console.log(resetActivity, "resetActivity");
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };
  const openRecentUpdateTable = (i: number) => {
    setUpdateTableIndex(i === updateTableIndex ? null : i);
    console.log(updateTableIndex, "tableIndex");
    setShowUpdateTable(!showUpdateTable);
    // console.log(i, "tableIndex");
  };
  const hideRecenctTableUpdate = () => {
    setShowUpdateTable(false);
  };
  return (
    <Grid container spacing={3} className="px-28 mb-[3rem] ">
      <Grid item xs={12} lg={12}>
        <div className="shadow-sm bg-white rounded-lg relative py-10">
          <Typography className="text-[16px] font-600 py-28 px-20">
            Recent Activity
          </Typography>
          {resetActivity?.map((item) => {
            return (
              <>
                <div className="flex items-center justify-between gap-20 px-20 border-y-1 py-10 ">
                  <div>
                    <img
                      className="h-40 w-40 rounded-full"
                      src={
                        item.user_image
                          ? urlForImage + item.user_image
                          : "../assets/images/logo/images.jpeg"
                      }
                    ></img>
                  </div>
                  <div className="flex w-full gap-10 justify-between sm:flex-row flex-col">
                    <div>
                      <p className="font-500 text-[16px] text-[#151D48]">
                        {item.userName}
                      </p>
                      <p className="text-[14px] text-[#737791]">
                        {item.message}
                      </p>
                    </div>
                    <Typography className="text-[14px] text-[#757982]  ">
                      {item.createdAt
                        ? moment(item.createdAt).format("MMMM Do, YYYY")
                        : "N/A"}
                    </Typography>
                  </div>
                </div>
              </>
            );
          })}
          {/* <CommonTable
            headings={["User", "Task Completed", "Punch In/Out", ""]}
          >
            <>
              {rows.map((row, index) => (
                <TableRow
                  key={index}
                  // style={{ position: "relative" }}
                  sx={{
                    "& td": {
                      borderBottom: "1px solid #EDF2F6",
                      paddingTop: "12px",
                      paddingBottom: "12px",
                      color: theme.palette.primary.main,
                      textAlign: "center",
                    },
                  }}
                >
                  <TableCell
                    scope="row"
                    className="flex items-center gap-8 flex-col sm:flex-row "
                  >
                    <img src={row.user[0].image} />
                    <span>{row.user[0].text}</span>
                  </TableCell>

                  <TableCell scope="row">{row.taskCompleted}</TableCell>
                  <TableCell scope="row">{row.punch}</TableCell>
                  <TableCell
                    scope="row"
                    className="flex items-center gap-4 justify-center cursor-pointer "
                  >
                    <img src={row.updates[0].arrow} />
                    <span
                      className="text-[#4F46E5] text-sm"
                      onClick={() => openRecentUpdateTable(index)}
                    >
                      {row.updates[0].text}
                    </span>
                    {showUpdateTable && updateTableIndex === index && (
                      <RecentTaskUpdateTable
                        hideTable={hideRecenctTableUpdate}
                      />
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </>
          </CommonTable> */}
        </div>
      </Grid>
      {/* <Grid item xs={12} lg={6}>
        {userDetails.role == "client" && (
          <div className="shadow-sm bg-white rounded-lg">
            <div className="flex items-center justify-between px-20 py-28 border-b border-solid border-[#EDF2F6]">
              <Typography className="text-[16px] font-600">
                Logged Hours
              </Typography>

              <div className="flex sm:mr-20 items-center justify-center sm:gap-32">
                <Typography className="text-[16px] font-500">
                  Total Logged Hours
                </Typography>
                <span className="text-[#4F46E5] p-10 rounded-md bg-[#F6F6F6] font-600">
                  {" "}
                  34
                </span>
              </div>
            </div>
            <div className="pb-10">
              <ActivityChart />
            </div>
          </div>
        )}
      </Grid> */}
    </Grid>
  );
}
