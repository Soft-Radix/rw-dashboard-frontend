import { DrawIoEmbed, DrawIoEmbedRef } from "react-drawio";
import { useEffect, useRef, useState } from "react";
import { ROLES } from "src/app/constants/constants";
import { useParams } from "react-router";
import { useAppDispatch } from "app/store/store";
import { addWhiteBoardData, getWhiteBoardData } from "app/store/Projects";
import { WhiteBoardData } from "app/store/Projects/Interface";
import toast from "react-hot-toast";
import FuseLoading from "@fuse/core/FuseLoading";
import { NoDataFound } from "public/assets/icons/common";
import { Typography } from "@mui/material";

function WhiteBoard() {
  const client_id = JSON.parse(localStorage.getItem("userDetail"));
  const [data, setData] = useState("");
  const [show, setShow] = useState(false);
  const [loadingDrawIo, setLoadingDrawIo] = useState(true);
  const [imgData, setImgData] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const drawioRef = useRef<DrawIoEmbedRef>(null);
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (
      client_id &&
      client_id.id &&
      (client_id.role_id === ROLES.CLIENT || client_id.role_id === ROLES.ADMIN)
    ) {
      setShow(true);
    } else {
      setShow(false);
    }
  }, [client_id]);

  // useEffect(() => {
  //   setTimeout(() => {
  //     var iframe = document.querySelector("iframe");

  //     console.log("frame...", iframe);

  //     if (iframe) {
  //       // Access the content document inside the iframe
  //       var iframeDocument =
  //         iframe.contentDocument || iframe.contentWindow.document;

  //       // Find the element inside the iframe
  //       var element = iframeDocument.querySelector(".gePrimaryBtn");

  //       if (element) {
  //         // @ts-ignore
  //         element.style.backgroundColor = "red";
  //     }
  //     }
  //   }, 2000);
  // }, [drawioRef.current, loadingDrawIo]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await dispatch(getWhiteBoardData(id));
      if (res?.payload?.data) {
        if (res.payload.data.data) {
          if (res.payload.data.data.xml_data)
            setData(res.payload.data.data.xml_data);
          if (res.payload.data.data.xml_img)
            setImgData(res.payload.data.data.xml_img);
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

  const exportImage = () => {
    if (drawioRef.current) {
      drawioRef.current.exportDiagram({
        format: "png",
      });
    }
  };

  const onSave = (data) => {
    setData(data.xml);
    exportImage();
  };

  useEffect(() => {
    if (imgData && !loading && data) {
      saveData();
    }
  }, [imgData]);

  const saveData = async () => {
    try {
      const payload: WhiteBoardData = {
        project_id: id as string,
        xml_data: data,
        xml_img: imgData,
      };
      const res = await dispatch(addWhiteBoardData(payload));
      if (res?.payload?.data && res?.payload?.data.status) {
        toast.success(res?.payload?.data?.message);
      } else {
        toast.error(res?.payload?.data?.message);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Unable to save Whiteboard");
    }
  };

  return (
    <div className="px-28 flex gap-20 flex-wrap lg:flex-nowrap h-[calc(100vh-270px)]">
      <div className="w-full h-full bg-white rounded-lg shadow-sm flex justify-center items-center relative">
        {(loading || (show && loadingDrawIo)) && (
          <div className="w-full h-full flex justify-center items-center absolute">
            <FuseLoading />
          </div>
        )}
        {!loading && !show && (
          <div className="p-5 w-full h-full flex justify-center items-center">
            {imgData ? (
              <img src={imgData} className="w-full h-full object-contain" />
            ) : (
              <div className="flex gap-5 flex-col justify-center items-center">
                <NoDataFound />
                <Typography className="text-[24px] text-center font-600 leading-normal">
                  No data found !
                </Typography>
              </div>
            )}
          </div>
        )}

        {!loading && show && (
          <div
            className={`w-full h-full bg-white rounded-lg shadow-sm ${
              loadingDrawIo ? "opacity-0" : "opacity-100"
            }`}
          >
            <DrawIoEmbed
              xml={data}
              urlParameters={{
                ui: "min",
                spin: false,
                libraries: false,
                saveAndExit: false,
                noExitBtn: true,
              }}
              onLoad={(data) => {
                setLoadingDrawIo(false);
              }}
              configuration={{
                spinner: false,
                toolbar: false,
                menubar: false,
              }}
              onExport={(data) => setImgData(data.data)}
              onSave={onSave}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default WhiteBoard;
