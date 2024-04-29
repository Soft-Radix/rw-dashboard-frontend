import { useFormik } from "formik";
import { Dispatch, SetStateAction, useEffect } from "react";
import CommonModal from "../CommonModal";
import InputField from "../InputField";
import { addAgentSchema } from "src/formSchema";
import { useAppDispatch } from "app/store/store";

import { useSelector } from "react-redux";
import { addAgent } from "app/store/Agent";
import { restAll } from "app/store/Agent";
import { AgentRootState, AgentType } from "app/store/Agent/Interafce";

interface IProps {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    fetchAgentList?: () => void;
}

function AddAgentModel({ isOpen, setIsOpen, fetchAgentList }: IProps) {
    const dispatch = useAppDispatch();
    const agentState = useSelector((store: AgentRootState) => store.agent);

    const onSubmit = async (values: AgentType, { resetForm }) => {
        const { payload } = await dispatch(addAgent(values));
        if (payload?.data?.status) {
            fetchAgentList();
            resetForm();
        }
    };
    const formik = useFormik({
        initialValues: {
            first_name: "",
            last_name: "",
            email: "",
        },
        validationSchema: addAgentSchema,
        onSubmit,
    });

    useEffect(() => {
        if (!!agentState?.successMsg) {
            dispatch(restAll());
            setIsOpen((prev) => false);
        } else if (!!agentState?.errorMsg) {
            dispatch(restAll());
        }
    }, [agentState]);

    return (
        <CommonModal
            open={isOpen}
            handleToggle={(e) => {
                setIsOpen((prev) => !prev);
                formik.handleReset(e);
            }}
            modalTitle="Add Agent"
            maxWidth="733"
            btnTitle="Save"
            onSubmit={formik.handleSubmit}
        >
            <div className="flex flex-col gap-20 mb-20">
                <InputField
                    formik={formik}
                    name="first_name"
                    label="First Name"
                    placeholder="Enter First Name"
                />
                <InputField
                    formik={formik}
                    name="last_name"
                    label="Last Name"
                    placeholder="Enter Last Name"
                />
                <InputField
                    formik={formik}
                    name="email"
                    label="Email Address"
                    placeholder="Enter Email"
                />
            </div>
        </CommonModal>
    );
}

export default AddAgentModel;
