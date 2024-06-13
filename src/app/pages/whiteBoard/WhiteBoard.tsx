import TitleBar from "src/app/components/TitleBar";
import { DrawIoEmbed, DrawIoEmbedRef } from "react-drawio";
import { useEffect, useRef, useState } from "react";

function WhiteBoard() {
  const [data, setData] = useState("");
  const [imgData, setImgData] = useState<string | null>(null);
  const drawioRef = useRef<DrawIoEmbedRef>(null);

  const exportImage = () => {
    if (drawioRef.current) {
      drawioRef.current.exportDiagram({
        format: "png",
      });
    }
  };

  useEffect(() => {
    console.log(imgData);
  }, [imgData]);

  const onSave = (data) => {
    setData(data);
    exportImage();
  };

  return (
    <div>
      <TitleBar title="White Board" />
      <div className="px-28 flex gap-20 flex-wrap lg:flex-nowrap h-[calc(100vh-150px)]">
        {imgData && (
          <div className="p-5 border bg-grey-300 w-auto h-auto">
            <img src={imgData} />
          </div>
        )}

        <DrawIoEmbed
          xml={data}
          urlParameters={{
            ui: "kennedy",
            spin: true,
            libraries: true,
            saveAndExit: false,
          }}
          configuration={{}}
          onExport={(data) => setImgData(data.data)}
          onSave={onSave}
        />
      </div>
    </div>
  );
}

export default WhiteBoard;
