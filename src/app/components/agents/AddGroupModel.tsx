import { InputAdornment } from "@mui/material";
import { addAgentGroup } from "app/store/Agent group";
import {
  AgentGroupRootState,
  AgentGroupType,
} from "app/store/Agent group/Interface";
import { restAll } from "app/store/Client";
import { useAppDispatch } from "app/store/store";
import { useFormik } from "formik";
import { SearchIcon } from "public/assets/icons/topBarIcons";
import { Dispatch, SetStateAction, useEffect } from "react";
import { useSelector } from "react-redux";
import { AgentGroupSchema } from "src/formSchema";
import CommonModal from "../CommonModal";
import InputField from "../InputField";

interface IProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  isNewAgent: boolean;
  fetchAgentGroupList?: () => void;
}

function AddGroupModel({
  isOpen,
  setIsOpen,
  isNewAgent,
  fetchAgentGroupList,
}: IProps) {
  const agentGroupState = useSelector(
    (store: AgentGroupRootState) => store.agentGroup
  );
  // console.log(agentGroupState, "as");

  const dispatch = useAppDispatch();

  const onSubmit = async (values: AgentGroupType, { resetForm }) => {
    console.log(values, "values");
    const { payload } = await dispatch(addAgentGroup(values));
    // console.log(payload, "payload");
    if (payload?.data?.status) {
      resetForm();
    }
  };

  useEffect(() => {
    if (!!agentGroupState?.successMsg) {
      dispatch(restAll());
      setIsOpen((prev) => false);
    } else if (!!agentGroupState?.errorMsg) {
      dispatch(restAll());
    }
  }, [agentGroupState]);

  const formik = useFormik({
    initialValues: {
      group_name: "",
    },
    validationSchema: AgentGroupSchema,
    onSubmit,
  });
  

  return (
    <CommonModal
      open={isOpen}
      handleToggle={() => setIsOpen((prev) => !prev)}
      modalTitle={isNewAgent ? "Add Agent" : "Add Group"}
      maxWidth="733"
      btnTitle="Save"
      closeTitle="Cancel"
      onSubmit={formik.handleSubmit}
    >
      <div className="flex flex-col gap-20 mb-20 ">
        {isNewAgent ? (
          <InputField
            formik={formik}
            name="groupName"
            label="Agent"
            placeholder="Search Agent with Name or ID"
            sx={{ backgroundColor: "#F6F6F6", borderRadius: "8px" }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <span className="text-[16px] font-600 text-[#111827] bg-[#F6F6F6] pl-10">
                    <SearchIcon />
                  </span>
                </InputAdornment>
              ),
            }}
          />
        ) : (
          <InputField
            formik={formik}
            name="group_name"
            label="Group Name"
            placeholder="Enter Group Name"
          />
        )}
      </div>
    </CommonModal>
  );
}

export default AddGroupModel;
