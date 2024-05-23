import { Button, TableCell, TableRow, Theme } from "@mui/material";
import { useTheme } from "@mui/styles";
import { productDelete, productList, productUpdate } from "app/store/Client";
import { useAppDispatch } from "app/store/store";
import { DeleteIcon, EditIcon } from "public/assets/icons/common";
import { PlusIcon } from "public/assets/icons/dashboardIcons";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import TitleBar from "src/app/components/TitleBar";
import CommonTable from "src/app/components/commonTable";
import AddProduct from "./AddProductModal";
import DeleteProduct from "./DeleteProductModal";
import CommonPagination from "src/app/components/pagination";

export default function ManageProducts() {
  const [isOpenSupportDetail, setIsOpenDetailPage] = useState<boolean>(false);
  const [isOpenAddModal, setIsOpenAddModal] = useState(false);
  const [deleteId, setIsDeleteId] = useState<number>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isOpenDeletedModal, setIsOpenDeletedModal] = useState(false);
  const [list, setList] = useState<any[]>([]);
  const [id, setId] = useState();
  const theme: Theme = useTheme();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const dispatch = useAppDispatch();

  const fetchData = async () => {
    const payload = {
      start: 0,
      limit: 40,
      search: "",
    };
    try {
      //@ts-ignore
      const res = await dispatch(productList(payload));
      setList(res?.payload?.data?.data?.list);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [dispatch, id]);

  const onDelete = async () => {
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
    } catch (error) {
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
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const totalPageCount = Math.ceil(list.length / itemsPerPage);

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setCurrentPage(page);
    // Handle any additional logic when the page changes, e.g., fetching data
  };

  const currentRows = list.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div>
      <TitleBar title="Manage Products" minHeight="min-h-[80px]">
        <Button
          variant="outlined"
          color="secondary"
          className="h-[40px] text-[16px] flex gap-8 font-[600]"
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
                      <TableCell scope="row">{item.name}</TableCell>
                      <TableCell align="center" className="whitespace-nowrap">
                        {item.description}
                      </TableCell>

                      <TableCell align="center" className="whitespace-nowrap">
                        ${item.unit_price}
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

              {/* <TableCell align="center" className="w-[1%]">
                  <div className="flex gap-20 pe-20">
                    <span className="p-2 cursor-pointer">
                      <DeleteIcon
                        onClick={() => {
                          setIsOpenDeletedModal(true);
                        }}
                      />
                    </span>
                    <span className="p-2 cursor-pointer">
                      <EditIcon
                        onClick={() => {
                          setIsOpenAddModal(true);
                          setIsEditing(true);
                        }}
                      />
                    </span>
                  </div>
                </TableCell>
              </TableRow>
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
                <TableCell scope="row">Jone Doe</TableCell>
                <TableCell align="center" className="whitespace-nowrap">
                  Lorem Ipsum
                </TableCell>

                <TableCell align="center" className="whitespace-nowrap">
                  $100
                </TableCell>

                <TableCell align="center" className="w-[1%]">
                  <div className="flex gap-20 pe-20">
                    <span className="p-2 cursor-pointer">
                      <DeleteIcon
                        onClick={() => {
                          setIsOpenDeletedModal(true);
                        }}
                      />
                    </span>
                    <span className="p-2 cursor-pointer">
                      <EditIcon onClick={() => setIsOpenAddModal(true)} />
                    </span>
                  </div>
                </TableCell>
              </TableRow> */}
            </>
          </CommonTable>
          <div className="flex justify-end py-14 px-[3rem]">
            <CommonPagination
              count={totalPageCount}
              currentPage={currentPage}
              onPageChange={handlePageChange}
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
      />
    </div>
  );
}
