import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import { MenuItem, styled, useTheme } from "@mui/material";
import { useFormik } from "formik";
import { Dispatch, SetStateAction } from "react";
import CommonModal from "../CommonModal";
import InputField from "../InputField";
import { useAppDispatch } from "app/store/store";
import { changePassword } from "app/store/Client";

interface IProps {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
}

function ChangePassword({ isOpen, setIsOpen }: IProps) {
    const dispatch = useAppDispatch()
    const onSubmit = async (values) => {
        dispatch(changePassword({ token: '', password: values.password }))
    }
    const formik = useFormik({
        initialValues: {
            name: "",
            role: "",
            email: "",
            phone: "",
        },
        onSubmit
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
                    name="password"
                    label="New Password"
                    placeholder="Enter New Password "
                />
                <InputField
                    formik={formik}
                    name="cnfPassword"
                    label="Confirm New Password"
                    placeholder="Enter Confirm New Password"
                />
            </div>
        </CommonModal>
    );
}

export default ChangePassword;
