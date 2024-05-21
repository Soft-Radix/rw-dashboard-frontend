import { Checkbox, InputAdornment } from "@mui/material";
import {
  addAgentGroup,
  addAgentInagentGroup,
  searchAgentGroup,
} from "app/store/Agent group";
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
import img1 from "../../../../public/assets/images/pages/admin/accImg.png";
import { useParams } from "react-router";

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
  const { searchAgentList, addagentList } = useSelector(
    (store: AgentGroupRootState) => store.agentGroup
  );
  // console.log(addagentList, "pp");
  const [checked, setChecked] = useState(false);
  const [checkedItems, setCheckedItems] = useState([]);
  const [searchText, setSearchText] = useState("");
  // console.log(agentGroupState, "ggfsd");
  const { group_id } = useParams();
  // console.log(id, "asss");

  const dispatch = useAppDispatch();
  // const {searchAgentList}=useSelector(store:roo)

  const onSubmit = async (values: AgentGroupType, { resetForm }) => {
    console.log(values, "valauuuu");

    const { payload } = await dispatch(addAgentGroup(values));
    // console.log(payload, "payload");

    if (payload?.data?.status) {
      resetForm();
      fetchAgentGroupList();
    }
  };

  const handleAddmember = async () => {
    await dispatch(
      searchAgentGroup({
        group_id: group_id,
        agent_ids: checkedItems,
        delete_agent_ids: [],
      })
    );
    setIsOpen(false);
    // Handle the case when there is an id (e.g., updating an existing group)
  };

  const handleCheckboxChange = (id: number) => {
    setCheckedItems((prevState) =>
      prevState.includes(id)
        ? prevState.filter((item) => item !== id)
        : [...prevState, id]
    );
  };
  const [filterMenu, setFilterMenu] = useState<filterType>({
    start: 0,
    limit: -1,
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
  // console.log(checkedItems, "hhh");
  return (
    <CommonModal
      open={isOpen}
      handleToggle={() => setIsOpen((prev) => !prev)}
      modalTitle={isNewAgent ? "Add Agent" : "Add Group"}
      maxWidth="733"
      btnTitle="Save"
      closeTitle="Cancel"
      onSubmit={isNewAgent ? handleAddmember : formik.handleSubmit}
    >
      <div className="flex flex-col  mb-20 ">
        {isNewAgent ? (
          <>
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
            <div className=" max-h-[100px] w-1/3 overflow-y-auto shadow-sm cursor-pointer">
              {searchAgentList.map((item: any) => (
                <div
                  className="flex items-center gap-10 px-20 w-full"
                  key={item.id}
                >
                  <label className="flex items-center gap-10 w-full cursor-pointer">
                    <Checkbox
                      checked={checkedItems.includes(item.id)}
                      onChange={() => handleCheckboxChange(item.id)}
                    />
                    <span>{item.first_name}</span>
                  </label>
                </div>
              ))}
            </div>
          </>
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
