import { Button, TableCell, TableRow, Theme } from "@mui/material";
import { useTheme } from "@mui/styles";
import { DeleteIcon, EditIcon } from "public/assets/icons/common";
import { PlusIcon } from "public/assets/icons/dashboardIcons";
import { useState } from "react";
import TitleBar from "src/app/components/TitleBar";
import CommonTable from "src/app/components/commonTable";
import CommonPagination from "src/app/components/pagination";
import AddProduct from "./AddProductModal";
import DeleteProduct from "./DeleteProductModal";


export default function ManageProducts() {
  const [isOpenSupportDetail, setIsOpenDetailPage] = useState<boolean>(false);
  const [isOpenAddModal, setIsOpenAddModal] = useState(false);
  const [deleteId, setIsDeleteId] = useState<number>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isOpenDeletedModal, setIsOpenDeletedModal] = useState(false);
  const theme: Theme = useTheme();

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
                    <span
                      className="p-2 cursor-pointer"
                    >
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
                          setIsEditing(true)
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
              </TableRow>
            </>
          </CommonTable>
          <div className="flex justify-end py-14 px-[3rem]">
            <CommonPagination count={10} />
          </div>
        </div>
      </div>
      <AddProduct
        isOpen={isOpenAddModal}
        setIsOpen={setIsOpenAddModal}
         isEditing={isEditing}
         setIsEditing={setIsEditing}
      />
      <DeleteProduct
        isOpen={isOpenDeletedModal}
        setIsOpen={setIsOpenDeletedModal}
      />
    </div>
  );
}
