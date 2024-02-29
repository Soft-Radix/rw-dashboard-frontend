import { Button, TableCell, TableRow, Theme } from "@mui/material";
import { useTheme } from "@mui/styles";
import { useFormik } from "formik";
import { DeleteIcon, EditIcon } from "public/assets/icons/common";
import { PlusIcon } from "public/assets/icons/dashboardIcons";
import { SitesIcon } from "public/assets/icons/passManager-icons";
import { useState } from "react";
import ActionModal from "src/app/components/ActionModal";
import ImagesOverlap from "src/app/components/ImagesOverlap";
import TitleBar from "src/app/components/TitleBar";
import CommonTable from "src/app/components/commonTable";
import CommonPagination from "src/app/components/pagination";
import AddPassword from "src/app/components/passwordManager/AddPassword";

const rows = [
  {
    site_name: "Website Classification",
    images: [
      "female-01.jpg",
      "female-02.jpg",
      "female-03.jpg",
      "female-04.jpg",
      "female-05.jpg",
    ],
    username: "Alexandra",
    email: "info0675@gmail.com",
    date: "Feb 12,2024",
  },
  {
    site_name: "Website Classification",
    images: ["male-01.jpg", "male-02.jpg", "male-03.jpg"],
    username: "Alexandra",
    email: "info0675@gmail.com",
    date: "Feb 12,2024",
  },
  {
    site_name: "Website Classification",
    images: ["female-01.jpg", "female-02.jpg", "female-03.jpg"],
    username: "Alexandra",
    email: "info0675@gmail.com",
    date: "Feb 12,2024",
  },
  {
    site_name: "Website Classification",
    images: [
      "female-01.jpg",
      "female-02.jpg",
      "female-03.jpg",
      "female-04.jpg",
      "female-05.jpg",
    ],
    username: "Alexandra",
    email: "info0675@gmail.com",
    date: "Feb 12,2024",
  },
  {
    site_name: "Website Classification",
    images: ["male-01.jpg", "male-02.jpg", "male-03.jpg"],
    username: "Alexandra",
    email: "info0675@gmail.com",
    date: "Feb 12,2024",
  },
  {
    site_name: "Website Classification",
    images: ["female-01.jpg", "female-02.jpg", "female-03.jpg"],
    username: "Alexandra",
    email: "info0675@gmail.com",
    date: "Feb 12,2024",
  },
];

export default function PasswordManager() {
  const theme: Theme = useTheme();
  const formik = useFormik({
    initialValues: {
      role: "",
      verification: "",
    },
    // validationSchema: validationSchemaProperty,
    onSubmit: (values) => {},
  });

  const [isOpenAddModal, setIsOpenAddModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  return (
    <div>
      <TitleBar title="Password Manager">
        <Button
          variant="outlined"
          color="secondary"
          className="h-[40px] text-[16px] flex gap-8 whitespace-nowrap"
          aria-label="Add User"
          size="large"
          onClick={() => setIsOpenAddModal(true)}
        >
          <PlusIcon color={theme.palette.secondary.main} className="shrink-0" />
          Add Passowrd
        </Button>
      </TitleBar>
      <div className="px-28 mb-[3rem]">
        <div className="shadow-sm bg-white rounded-lg">
          <CommonTable
            headings={[
              "Site Name",
              "Username",
              "Password",
              "Assigned to",
              "Created on",
              "Actions",
            ]}
          >
            <>
              {rows.map((row, index) => (
                <TableRow
                  key={index}
                  sx={{
                    "& td": {
                      fontWeight: 500,
                      borderBottom: "1px solid #EDF2F6",
                      paddingTop: "12px",
                      paddingBottom: "12px",
                      color: theme.palette.primary.main,
                    },
                  }}
                >
                  <TableCell scope="row">
                    <div className="flex items-center pe-[3.25rem]">
                      <div className="flex items-center ml-10 grow">
                        <span className="shrink-0 mr-10 h-[38px] aspect-square flex items-center justify-center rounded-full bg-secondary_bg text-secondary">
                          <SitesIcon />
                        </span>
                        <span>{row.site_name}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell align="center" className="whitespace-nowrap">
                    {row.username}
                  </TableCell>
                  <TableCell align="center" className="whitespace-nowrap">
                    ***********
                  </TableCell>
                  <TableCell align="center">
                    <ImagesOverlap images={row.images} />
                  </TableCell>
                  <TableCell align="center" className="whitespace-nowrap">
                    {row.date}
                  </TableCell>
                  <TableCell align="left" className="w-[1%]">
                    <div className="flex gap-20 pe-20">
                      <span
                        className="p-2 cursor-pointer"
                        onClick={() => setOpenDeleteModal(true)}
                      >
                        <DeleteIcon />
                      </span>
                      <span className="p-2 cursor-pointer">
                        <EditIcon />
                      </span>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </>
          </CommonTable>
          <div className="flex justify-end py-14 px-[3rem]">
            <CommonPagination count={10} />
          </div>
        </div>
      </div>
      <AddPassword isOpen={isOpenAddModal} setIsOpen={setIsOpenAddModal} />
      <ActionModal
        modalTitle="Delete Password!"
        modalSubTitle="Are you sure you want to delete this password ?"
        open={openDeleteModal}
        handleToggle={() => setOpenDeleteModal((prev) => !prev)}
        type="delete"
      />
    </div>
  );
}
