import TitleBar from "src/app/components/TitleBar";

function WhiteBoard() {
  return (
    <div>
      <TitleBar title="White Board" />
      <div className="px-28 flex gap-20 flex-wrap lg:flex-nowrap h-[calc(100vh-150px)]"></div>
    </div>
  );
}

export default WhiteBoard;
