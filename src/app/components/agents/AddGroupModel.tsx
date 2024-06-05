import { Checkbox, InputAdornment } from "@mui/material";
import {
  addAgentGroup,
  addAgentInagentGroup,
  getGroupMemberDetail,
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
import { AddAgentGroupSchema, AgentGroupSchema } from "src/formSchema";
import CommonModal from "../CommonModal";
import InputField from "../InputField";
import { debounce } from "lodash";
import { filterType } from "app/store/Client/Interface";
import img1 from "../../../../public/assets/images/pages/admin/accImg.png";
import { useParams } from "react-router";
import { getAgentList } from "app/store/Agent";
import ListLoading from "@fuse/core/ListLoading";

interface IProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  isNewAgent: boolean;
  fetchAgentGroupList?: () => void;
  filterPagination?: any;
}

function AddGroupModel({
  isOpen,
  setIsOpen,
  isNewAgent,
  filterPagination,
  fetchAgentGroupList,
}: IProps) {
  const agentGroupState = useSelector(
    (store: AgentGroupRootState) => store.agentGroup
  );
  const { searchAgentList, status, addagentList } = useSelector(
    (store: AgentGroupRootState) => store.agentGroup
  );
  // console.log(addagentList, "pp");
  const [checked, setChecked] = useState(false);
  const [checkedItems, setCheckedItems] = useState([]);

  const [searchText, setSearchText] = useState("");
  const [isValid, setisValid] = useState<boolean>(false);
  const [filterMenu, setFilterMenu] = useState<filterType>({
    start: 0,
    limit: -1,
    search: "",
  });
  // console.log(agentGroupState, "ggfsd");
  const { group_id } = useParams();
  // console.log(id, "asss");

  const dispatch = useAppDispatch();
  // const {searchAgentList}=useSelector(store:roo)

  const onSubmit = async (values: AgentGroupType, { resetForm }) => {
    const { payload } = await dispatch(
      addAgentGroup({ group_name: values?.group_names })
    );
    // console.log(payload, "payload");

    if (payload?.data?.status) {
      fetchAgentGroupList();
      resetForm();
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
    setFilterMenu((prevFilters) => ({
      ...prevFilters,
      search: "",
    }));
    if (checkedItems.length! == 0) {
      setisValid(true);
    }
    dispatch(addAgentInagentGroup({ ...filterMenu, group_id: group_id }));
    dispatch(getGroupMemberDetail({ ...filterPagination, group_id }));
    setIsOpen(false);
    setCheckedItems([]);

    // Handle the case when there is an id (e.g., updating an existing group)
  };

  const handleCheckboxChange = (id: number) => {
    setCheckedItems((prevState) =>
      prevState.includes(id)
        ? prevState.filter((item) => item !== id)
        : [...prevState, id]
    );
  };

  const { start, limit, search } = filterMenu;
  const formik = useFormik({
    initialValues: {
      group_names: "",
    },
    validationSchema: AddAgentGroupSchema,
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
    if (isNewAgent && isOpen) {
      dispatch(addAgentInagentGroup({ ...filterMenu, group_id: group_id }));
    }
  }, [start, limit, search, isOpen]);

  // console.log(checkedItems, "hhh");
  useEffect(() => {
    if (!!agentGroupState?.successMsg) {
      dispatch(restAll());
      // fetchAgentGroupList;
      setIsOpen(false);
      formik.resetForm();
    } else if (!!agentGroupState?.errorMsg) {
      // console.log(agentGroupState?.errorMsg, "agentGroupState?.errorMsg");

      setIsOpen(true);
      // dispatch(restAll());
    }
  }, [agentGroupState, filterMenu]);

  const handleToggle = (e: React.MouseEvent) => {
    // dispatch(addAgentInagentGroup({ ...filterMenu, group_id: group_id }));
    // setFilterMenu((prevFilters) => ({
    //   ...prevFilters,
    //   search: "",
    // }));
    debouncedSearch("");
    setCheckedItems([]);
    setIsOpen(false);
    formik.resetForm(); // Reset form values when closing the modal
  };
  useEffect(() => {
    if (checkedItems.length > 0) {
      setisValid(true);
    } else {
      setisValid(false);
    }
  }, [checkedItems]);

  // console.log(formik.errors, "formik");

  return (
    <CommonModal
      open={isOpen}
      handleToggle={handleToggle}
      modalTitle={isNewAgent ? "Add Agent" : "Add Group"}
      maxWidth="733"
      btnTitle="Save"
      closeTitle="Cancel"
      onSubmit={isNewAgent ? handleAddmember : formik.handleSubmit}
      disabled={isNewAgent && agentGroupState.actionStatus}
      isValid={!!isNewAgent ? isValid : true}
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
            <div className=" max-h-[200px] w-full overflow-y-auto shadow-sm cursor-pointer">
              {status == "loading" ? (
                <ListLoading />
              ) : (
                <>
                  {searchAgentList.map((item: any) => (
                    <label
                      className="flex items-center gap-10 px-20 w-1/3 cursor-pointer"
                      key={item.id}
                      // onClick={() => handleCheckboxChange(item.id)}
                    >
                      <Checkbox
                        checked={checkedItems.includes(item.id)}
                        onChange={() => handleCheckboxChange(item.id)}
                      />
                      <span
                        className=""
                        // onClick={() => handleCheckboxChange(item.id)}
                      >
                        {item.first_name}
                      </span>
                    </label>
                  ))}
                </>
              )}
            </div>
          </>
        ) : (
          <InputField
            formik={formik}
            name="group_names"
            id="group_names"
            label="Group Name"
            placeholder="Enter Group Name"
          />
        )}
      </div>
    </CommonModal>
  );
}

export default AddGroupModel;
