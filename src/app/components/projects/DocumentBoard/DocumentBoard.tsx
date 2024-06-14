import { useEffect, useState } from "react";
import { ROLES } from "src/app/constants/constants";
import { useParams } from "react-router";
import { useAppDispatch } from "app/store/store";
import { addDocBoardData, getDocBoardData } from "app/store/Projects";
import toast from "react-hot-toast";
import FuseLoading from "@fuse/core/FuseLoading";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const modules = {
  toolbar: [
    [{ font: [] }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["clean"],
    ["code-block"],
    [{ align: [] }],
    [{ color: [] }, { background: [] }],
    ["formula"],
    ["blockquote", "code-block"],
    [{ direction: "rtl" }],
    [{ script: "sub" }, { script: "super" }],
    ["link", "image", "video", "formula"],
    ["clean"],
  ],
  clipboard: {
    matchVisual: false,
  },
};

const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "video",
];

function DocumentBoard() {
  const client_id = JSON.parse(localStorage.getItem("userDetail"));
  const [show, setShow] = useState(true);
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (
      client_id &&
      client_id.id &&
      (client_id.role_id === ROLES.CLIENT || client_id.role_id === ROLES.ADMIN)
    ) {
      setShow(false);
    } else {
      setShow(true);
    }
  }, [client_id]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await dispatch(getDocBoardData(id));
      if (res?.payload?.data) {
        if (res.payload.data.data) {
          if (res.payload.data.data.doc_file)
            setValue(res.payload.data.data.doc_file);
        }
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      } else {
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.error("Error fetching data:", error);
    }
  };

  const saveData = async () => {
    try {
      const payload: any = {
        project_id: id as string,
        doc_file: value,
      };
      const res = await dispatch(addDocBoardData(payload));
      if (res?.payload?.data && res?.payload?.data.status) {
        toast.success(res?.payload?.data?.message);
      } else {
        toast.error(res?.payload?.data?.message);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Unable to save Document");
    }
  };

  return (
    <div className="px-28 flex gap-20 flex-wrap lg:flex-nowrap h-[calc(100vh-270px)]">
      <div className="w-full h-full bg-white rounded-lg shadow-sm flex justify-center items-center">
        {loading ? (
          <FuseLoading />
        ) : (
          <div className="w-full flex flex-col justify-between">
            <ReactQuill
              className="w-full h-[calc(100vh-330px)]"
              modules={show ? {...modules, toolbar: false} :{...modules}}
              formats={formats}
              theme="snow"
              value={value}
              onChange={setValue}
              readOnly={show}
            />
            <div className="flex items-center justify-end h-[50px] mx-10">
              <button
                className="btn bg-[#4F46E5] text-white px-[10px] py-[5px] text-[16px] font-500 mr-10 rounded-lg"
                onClick={saveData}
              >
                Save
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default DocumentBoard;
