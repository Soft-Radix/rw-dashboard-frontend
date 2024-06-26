import {
  Button,
  TableCell,
  TableRow,
  Theme,
  Tooltip,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/styles";
import { productDelete, productList, productUpdate } from "app/store/Client";
import { useAppDispatch } from "app/store/store";
import { DeleteIcon, EditIcon, NoDataFound } from "public/assets/icons/common";
import { PlusIcon } from "public/assets/icons/dashboardIcons";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import TitleBar from "src/app/components/TitleBar";
import CommonTable from "src/app/components/commonTable";
import AddProduct from "./AddProductModal";
import DeleteProduct from "./DeleteProductModal";
import CommonPagination from "src/app/components/pagination";
import { filterType } from "app/store/AccountManager/Interface";
import { RootState } from "app/store/store";
import { useSelector } from "react-redux";
import ListLoading from "@fuse/core/ListLoading";

export const TruncateText = ({ text, maxWidth }) => {
  const [isTruncated, setIsTruncated] = useState(false);
  const textRef = useRef(null);

  useEffect(() => {
    if (textRef.current) {
      const textWidth = textRef.current.scrollWidth;
      setIsTruncated(textWidth > maxWidth);
    }
  }, [text, maxWidth]);

  return (
    <Tooltip title={text} enterDelay={500} disableHoverListener={!isTruncated}>
      <Typography
        ref={textRef}
        noWrap
        style={{
          maxWidth: `${maxWidth}px`,
          overflow: "hidden",
          textOverflow: "ellipsis",
          // display: "inline-block",
          whiteSpace: "nowrap",
        }}
      >
        {text}
      </Typography>
    </Tooltip>
  );
};

export default function ManageProducts() {
  const [isOpenSupportDetail, setIsOpenDetailPage] = useState<boolean>(false);
  const [isOpenAddModal, setIsOpenAddModal] = useState(false);
  const [disable, setDisable] = useState(false);
  const [deleteId, setIsDeleteId] = useState<number>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isOpenDeletedModal, setIsOpenDeletedModal] = useState(false);
  const [list, setList] = useState<any[]>([]);
  const [id, setId] = useState();
  const theme: Theme = useTheme();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(true);
  const [filters, setfilters] = useState<filterType>({
    start: 0,
    limit: 10,
    search: "",
  });
  const accManagerState = useSelector((state: RootState) => state.client);

  const fetchData = async () => {
    try {
      //@ts-ignore
      const res = await dispatch(productList(filters));
      setLoading(false);
      setList(res?.payload?.data?.data?.list);
      const currentRows = res?.payload?.data?.data?.list?.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
      );
      if (currentRows.length === 0 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    } catch (error) {
      setLoading(false);
      console.error("Error fetching data:", error);
    }
  };

  // useEffect(() => {
  //   fetchData();
  // }, [filters.start]);

  useEffect(() => {
    fetchData();
  }, [
    dispatch,
    isOpenAddModal,
    filters.start,
    filters.search,
    filters.client_id,
    filters.limit,
  ]);

  const onDelete = async () => {
    setDisable(true);
    setId(null);
    try {
      const payload = {
        product_id: id,
      };
      //@ts-ignore
      const res = await dispatch(productDelete(payload));

      fetchData();
      setIsOpenDeletedModal(false);

      // setList(res?.payload?.data?.data?.list);
      toast.success(res?.payload?.data?.message);
      // toast.dismiss();
      setIsDeleteId(null);
      setTimeout(() => {
        setDisable(false);
      }, 500);
    } catch (error) {
      setDisable(false);
      console.error("Error fetching data:", error);
    }
  };
  const fetchUpdateData = async (payload: any) => {
    setId(null);
    try {
      //@ts-ignore
      const res = await dispatch(productUpdate(payload));
      // setList(res?.payload?.data?.data?.list);
      setId(null);
      fetchData();
      toast.success(res?.payload?.data?.message);
      // toast.dismiss();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const totalPageCount = Math.ceil(list?.length / itemsPerPage);

  const currentRows = list?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

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
  // if (loading == true) {
  //   return <ListLoading />;
  // }

  return (
    <div>
      <TitleBar title="Manage Products" minHeight="min-h-[80px]">
        <Button
          variant="outlined"
          color="secondary"
          className="h-[36px] text-[16px] flex gap-8 font-[600]"
          aria-label="Add Tasks"
          size="large"
          onClick={() => setIsOpenAddModal(true)}
        >
          <PlusIcon color={theme.palette.secondary.main} />
          Add Product
        </Button>
      </TitleBar>
      <div className="px-28 mb-[3rem]">
        <div className="bg-white rounded-lg shadow-sm">
          <CommonTable
            headings={["Name", "Description", "Unit Price", "Action"]}
          >
            {currentRows?.length === 0 && !loading ? (
              <TableRow
                sx={{
                  "& td": {
                    borderBottom: "1px solid #EDF2F6",
                    paddingTop: "12px",
                    paddingBottom: "12px",
                    color: theme.palette.primary.main,
                  },
                }}
              >
                <TableCell colSpan={7} align="center">
                  <div
                    className="flex flex-col justify-center align-items-center gap-20 bg-[#F7F9FB] min-h-[400px] py-40"
                    style={{ alignItems: "center" }}
                  >
                    <NoDataFound />
                    <Typography className="text-[24px] text-center font-600 leading-normal">
                      No data found !
                    </Typography>
                  </div>
                </TableCell>
              </TableRow>
            ) : loading ? (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  <ListLoading /> {/* Render loader component */}
                </TableCell>
              </TableRow>
            ) : (
              <>
                {currentRows?.map((item, index) => {
                  return (
                    <>
                      <TableRow
                        sx={{
                          "& td": {
                            borderBottom: "1px solid #EDF2F6",
                            paddingTop: "12px",
                            paddingBottom: "12px",
                            color: theme.palette.primary.main,
                          },
                        }}
                      >
                        <TableCell scope="row" className="w-[400px]  ">
                          {/* <Tooltip title={item.name} enterDelay={500}> */}
                          {/* <span>{truncateText(item.name, 5)}</span> */}
                          {/* </Tooltip> */}
                          <TruncateText text={item.name} maxWidth={400} />
                        </TableCell>
                        <TableCell align="center" className="w-[400px]  ">
                          {/* <Tooltip title={item.description} enterDelay={500}> */}
                          {/* <span>{truncateText(item.description, 5)}</span> */}
                          {/* </Tooltip> */}
                          <TruncateText
                            text={item.description}
                            maxWidth={400}
                          />
                        </TableCell>

                        <TableCell align="center" className="whitespace-nowrap">
                          <p style={{ lineHeight: "15px" }}>
                            ${item.unit_price}
                          </p>
                        </TableCell>
                        <TableCell align="center" className="w-[1%]">
                          <div className="flex gap-20 pe-20">
                            <span className="p-2 cursor-pointer">
                              <DeleteIcon
                                onClick={() => {
                                  setIsOpenDeletedModal(true);
                                  setId(item.id);
                                }}
                              />
                            </span>
                            <span className="p-2 cursor-pointer">
                              <EditIcon
                                onClick={() => {
                                  setId(item.id);
                                  setIsOpenAddModal(true);
                                  setIsEditing(true);
                                }}
                              />
                            </span>
                          </div>
                        </TableCell>
                      </TableRow>
                    </>
                  );
                })}
              </>
            )}
          </CommonTable>
          <div className="flex justify-end py-14 px-[3rem]">
            <CommonPagination
              count={accManagerState?.total_records}
              onChange={(e, PageNumber: number) => checkPageNum(e, PageNumber)}
              page={filters.start + 1}
            />
          </div>
        </div>
      </div>
      {isOpenAddModal && (
        <AddProduct
          isOpen={isOpenAddModal}
          setIsOpen={setIsOpenAddModal}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          fetchUpdateData={fetchUpdateData}
          setId={setId}
          id={id}
        />
      )}
      <DeleteProduct
        isOpen={isOpenDeletedModal}
        setIsOpen={setIsOpenDeletedModal}
        onDelete={onDelete}
        disabled={disable}
      />
    </div>
  );
}
