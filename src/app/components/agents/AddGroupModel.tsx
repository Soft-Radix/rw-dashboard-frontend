import { InputAdornment } from "@mui/material";
import { addAgentGroup, addAgentInagentGroup } from "app/store/Agent group";
import {
  AgentGroupRootState,
  AgentGroupType,
} from "app/store/Agent group/Interface";
import { restAll } from "app/store/Client";
import { useAppDispatch } from "app/store/store";
import { useFormik } from "formik";
import { SearchIcon } from "public/assets/icons/topBarIcons";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AgentGroupSchema } from "src/formSchema";
import CommonModal from "../CommonModal";
import InputField from "../InputField";
import { debounce } from "lodash";
import { filterType } from "app/store/Client/Interface";

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
  const { searchAgentList } = useSelector(
    (store: AgentGroupRootState) => store.agentGroup
  );
  console.log(searchAgentList, "as");

  const dispatch = useAppDispatch();
  // const {searchAgentList}=useSelector(store:roo)

  const onSubmit = async (values: AgentGroupType, { resetForm }) => {
    // console.log(values, "valuesnew");
    const { payload } = await dispatch(addAgentGroup(values));

    // console.log(payload, "payload");
    if (payload?.data?.status) {
      resetForm();
    }
  };
  const [filterMenu, setFilterMenu] = useState<filterType>({
    start: 0,
    limit: 10,
    search: "",
  });

  useEffect(() => {
    if (!!agentGroupState?.successMsg) {
      dispatch(restAll());
      fetchAgentGroupList;
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
  const debouncedSearch = debounce((searchValue) => {
    // Update the search filter here
    setFilterMenu((prevFilters) => ({
      ...prevFilters,
      search: searchValue,
    }));
  }, 300); // Adjust the delay as needed (300ms in this example)

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    debouncedSearch(value);
  };
  // console.log(filterMenu, "ggg");
  useEffect(() => {
    dispatch(addAgentInagentGroup(filterMenu));
  }, [filterMenu]);

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
            onChange={handleSearchChange}
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
