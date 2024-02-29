import { TableCell, TableRow, Typography, useTheme } from "@mui/material";
import clsx from "clsx";
import { DeleteIcon, EditIcon } from "public/assets/icons/common";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import ActionModal from "src/app/components/ActionModal";
import TitleBar from "src/app/components/TitleBar";
import CommonTable from "src/app/components/commonTable";
import UploadFileName from "src/app/components/sharedFiles/UploadFIleName";

const tableRows = [
  {
    type: "Icon",
  },
  {
    type: "Image",
  },
  {
    type: "Icon",
  },
  {
    type: "Image",
  },
];

function SharedFiles() {
  const theme = useTheme();
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [isOpenAddModal, setIsOpenAddModal] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File[] | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setUploadedFile(acceptedFiles);
    setIsOpenAddModal(true);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div>
      <TitleBar title="Shared File" />
      <div className="px-28 mb-[3rem]">
        <div
          {...getRootProps()}
          className="border-2 border-dashed border-secondary  overflow-hidden rounded-lg"
        >
          <div
            className={clsx(
              "h-[230px] bg-secondary_bg flex flex-col items-center gap-20 justify-center transition",
              isDragActive && "opacity-50"
            )}
          >
            <input {...getInputProps()} />
            <img
              className="max-w-[100px]"
              src="/assets/images/pages/sharedFiles/drop.svg"
              alt=""
            />
            <h5 className="text-3xl">
              {isDragActive ? (
                "Drop the files here to upload ..."
              ) : (
                <>
                  Drag and drop a file or{" "}
                  <span className="text-secondary underline cursor-pointer">
                    browse
                  </span>
                </>
              )}
            </h5>
          </div>
        </div>
        <div className="shadow-sm bg-white rounded-lg mt-[3rem]">
          <Typography className="text-2xl font-semibold px-[18px] py-20">
            Uploaded Files
          </Typography>
          <CommonTable
            headings={["Preview", "Name of File", "Uploaded Date", "Actions"]}
          >
            {tableRows.map((item, index) => (
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
                <TableCell>
                  <div className="flex items-center gap-[1.8rem]">
                    <div className="h-[38px] rounded-full bg-secondary_bg aspect-square flex items-center justify-center">
                      <img
                        className="w-[22px] h-auto"
                        src="/assets/images/pages/sharedFiles/pdfIcon.png"
                        alt="pdfIcon"
                      />
                    </div>
                    Preview {item.type}
                  </div>
                </TableCell>
                <TableCell align="center">Google-certificate.pdf</TableCell>
                <TableCell align="center">Feb 12,2024</TableCell>
                <TableCell align="left" className="w-[1%]">
                  <div className="flex gap-20 pe-20">
                    <span className="p-2 cursor-pointer">
                      <EditIcon />
                    </span>
                    <span
                      className="p-2 cursor-pointer"
                      onClick={() => setOpenDeleteModal(true)}
                    >
                      <DeleteIcon />
                    </span>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </CommonTable>
        </div>
      </div>
      <UploadFileName
        isOpen={isOpenAddModal}
        setIsOpen={setIsOpenAddModal}
        uploadedFile={uploadedFile}
      />
      <ActionModal
        modalTitle="Delete File"
        modalSubTitle="Are you sure you want to delete this File ?"
        open={openDeleteModal}
        handleToggle={() => setOpenDeleteModal((prev) => !prev)}
        type="delete"
      />
    </div>
  );
}

export default SharedFiles;
