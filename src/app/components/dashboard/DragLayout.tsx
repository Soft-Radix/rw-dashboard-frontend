import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

// ... other imports

const DragLayout = ({ id, children }) => {
  return (
    <Draggable draggableId={String(id)} index={1}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={{ ...provided.draggableProps.style, userSelect: "none" }}
        >
          {children}
        </div>
      )}
    </Draggable>
  );
};
export default DragLayout;
