import { TableCell, Theme, Typography } from "@mui/material";
import { useTheme } from "@mui/styles";
import { useEffect, useState } from "react";
import AddAgentModel from "src/app/components/agents/AddAgentModel";
import NoSubscription from "../../../../../../public/assets/icons/no-subscription-img.svg";
import CommonTable from "src/app/components/commonTable";
import { TableRow } from "@mui/material";
import ImagesOverlap from "src/app/components/ImagesOverlap";
import { Link, useParams } from "react-router-dom";
import {
  ArrowRightCircleIcon,
  NoSubscriptionData,
  SucessSubCancel,
} from "public/assets/icons/common";
import CommonPagination from "src/app/components/pagination";
import dotImg from "../../../../../../public/assets/icons/dots.svg";
import LongMenu from "../../Subscription/Dropdown";
import toast from "react-hot-toast";
import { subscriptionListItem } from "app/store/Client";
import svg from "../../../../../../public/assets/icons/Layer_1-2.svg";
import { useAppDispatch } from "app/store/store";
import ListLoading from "@fuse/core/ListLoading";
import { filterType } from "app/store/Client/Interface";
import { filter } from "lodash";
import { useSelector } from "react-redux";
import { RootState } from "app/store/store";

// const rows = [
//   {
//     id: "#2367055342",
//     status: "In Review",
//     title: "Basic",
//     date: "Feb 12,2024",
//     assignedImg: dotImg,
//   },
//   {
//     id: "1542145611525",
//     status: "Completed",
//     title: "Basic",
//     date: "Feb 12,2024",
//     assignedImg: dotImg,
//   },
//   {
//     id: "#2367055342",
//     // title: "Basic",
//     status: "In Progress",
//     title: "Basic",
//     date: "Feb 12,2024",
//     assignedImg: dotImg,
//   },
// ];

export default function SubscriptionList() {
  const theme: Theme = useTheme();
  const dispatch = useAppDispatch();
  const [isOpenAddModal, setIsOpenAddModal] = useState(false);
  const [rows, setRows] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 10;

  const { client_id } = useParams();
  const [filters, setfilters] = useState<filterType>({
    start: 0,
    limit: 10,
    search: "",
    // client_id: 0,
  });
  const subscriptionState = useSelector((state: RootState) => state.client);
  const fetchData = async () => {
    try {
      const payload = {
        client_id: client_id,
        ...filters,
      };
      //@ts-ignore
      const res = await dispatch(subscriptionListItem(payload));
      setRows(res?.payload?.data?.data?.list);
      setLoading(false);
      // toast.success(res?.payload?.data?.message);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [dispatch, filters]);

  const totalPageCount = Math.ceil(rows?.length / itemsPerPage);

  const checkPageNum = (e: any, pageNumber: number) => {
    // console.log(pageNumber, "rr");
    setfilters((prevFilters) => {
      if (pageNumber !== prevFilters.start + 1) {
        return {
          ...prevFilters,
          start: pageNumber - 1,
        };
      }
      return prevFilters; // Return the unchanged filters if the condition is not met
    });
  };

  const currentRows = rows?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const StatusMapping = (status) => {
    if (status == 0) {
      return "Pending";
    } else if (status == 1) {
      return "Completed";
    } else if (status == 2) {
      return "Paused";
    } else if (status == 3) {
      return "Expired";
    } else if (status == 4) {
      return "Cancelled";
    }
  };
  if (loading == true) {
    return <ListLoading />;
  }
  return (
    <>
      {/* no subscription start */}
      {/* <div className="px-[24px] pb-[24px]">
                <div className="flex justify-center bg-[#F7F9FB] py-[70px]">
                    <div>
                        <img src={NoSubscription} alt="NoSubscription" className="w-[200px] sm:w-[250px]  md:w-[345px] md:h-[264px]"/>
                        <p className="text-center mt-[28px] text-xl font-medium text-[#111827] leading-6">No subscription found !</p>
                    </div>
                </div>
              
            </div> */}
      {/* no subscription end */}

      {currentRows?.length === 0 ? (
        <div
          className="flex flex-col justify-center align-items-center gap-40 bg-[#F7F9FB] m-20 mt-0 p-20"
          style={{ alignItems: "center" }}
        >
          {/* <NoSubscriptionData /> */}
          <img
            src={svg}
            alt="NoSubscription"
            className="w-[200px] sm:w-[250px]  md:w-[345px] md:h-[264px]"
          />
          {/* {svg} */}
          <Typography className="text-[24px] text-center font-700 leading-normal">
            No subscription found !
            {/* <p className="text-[18px] font-400 text-[#757982] leading-4 pt-20">
            No data has been added yet. Please input the
          </p> */}
            {/* <p className="text-[18px] font-400 text-[#757982] leading-4 pt-10">
            necessary information to proceed.
          </p> */}
          </Typography>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm">
          <CommonTable
            headings={["ID", "Title", "Start Date", "Status", "", ""]}
          >
            <>
              {currentRows?.map((row, index) => (
                <TableRow
                  key={index}
                  // sx={{
                  //     "& td": {
                  //         borderBottom: "1px solid #EDF2F6",
                  //         paddingTop: "12px",
                  //         paddingBottom: "12px",
                  //         color: theme.palette.primary.main,
                  //     },
                  // }}
                >
                  <TableCell scope="row" className="font-500">
                    {row.id}
                  </TableCell>
                  <TableCell align="center" className="font-500">
                    {row.title}
                  </TableCell>
                  <TableCell
                    align="center"
                    className="whitespace-nowrap font-500"
                  >
                    {row?.subscription_start_date}
                  </TableCell>

                  <TableCell align="center" className="whitespace-nowrap">
                    <span
                      className={`inline-flex items-center justify-center rounded-full w-[95px] min-h-[25px] text-sm font-500
                      ${StatusMapping(row.status)}`}
                    >
                      {`${
                        row?.status == 0 || row?.status == 1 ? "" : ""
                      }${StatusMapping(row?.status)}`}
                    </span>
                  </TableCell>

                  <TableCell
                    align="center"
                    className="whitespace-nowrap font-500"
                  >
                    <LongMenu icon={dotImg} />

                    {/* <Link to="#">
                                                   <img src={row.assignedImg} alt="dots" />
                                                </Link> */}
                  </TableCell>
                  <TableCell align="left" className="w-[1%]">
                    <div className="flex gap-20 pe-20">
                      <span className="p-2 cursor-pointer">
                        <Link
                          to={`/admin/client/subscription-detail/${row.id}`}
                        >
                          <ArrowRightCircleIcon />
                        </Link>
                      </span>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </>
          </CommonTable>
          <div className="flex justify-end py-14 px-[3rem]">
            {currentRows?.length > 0 && (
              <CommonPagination
                count={subscriptionState?.total_records}
                onChange={(e, PageNumber: number) =>
                  checkPageNum(e, PageNumber)
                }
                page={filters.start + 1}
              />
            )}
          </div>
        </div>
      )}
      {/* <AddAgentModel isOpen={isOpenAddModal} setIsOpen={setIsOpenAddModal} /> */}
    </>
  );
}
