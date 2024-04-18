import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import { MenuItem, styled, useTheme } from "@mui/material";
import { useFormik } from "formik";
import { Dispatch, SetStateAction } from "react";
import CommonModal from "../CommonModal";
import InputField from "../InputField";
import SelectField from "../selectField";

interface IProps {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
}
const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    gap: "16px",
    "& .radioIcon": {
        color: "#9DA0A6",
        border: "2px solid currentColor",
        height: "16px",
        aspectRatio: 1,
        borderRadius: "50%",
        position: "relative",
    },
    "&.Mui-selected": {
        backgroundColor: "transparent",
        "& .radioIcon": {
            color: theme.palette.secondary.main,
            "&::after": {
                content: '""',
                display: "block",
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                height: "7px",
                aspectRatio: 1,
                borderRadius: "50%",
                backgroundColor: "currentColor",
            },
        },
    },
}));

function EditProfile({ isOpen, setIsOpen }: IProps) {
    const theme = useTheme();

    const formik = useFormik({
        initialValues: {
            name: "",
            role: "",
            email: "",
            phone: "",
        },
        onSubmit: (values) => { },
    });
    return (
        <CommonModal
            open={isOpen}
            handleToggle={() => setIsOpen((prev) => !prev)}
            modalTitle="Change Password"
            maxWidth="733"
            btnTitle={"Change"}
        >
            <div className="flex flex-col gap-20 ">
                <InputField
                    formik={formik}
                    name="oldPass"
                    label="Old Password"
                    placeholder="Enter Old Password"
                />
                <InputField
                    formik={formik}
                    name="email"
                    label="New Password"
                    placeholder="Enter New Password "
                />
                <InputField
                    formik={formik}
                    name="phone"
                    label="Confirm New Password"
                    placeholder="Enter Confirm New Password"
                />
            </div>
        </CommonModal>
    );
}

export default EditProfile;
