import React, { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import ReactDOM from "react-dom";

// import MainCard from "./MainCard";
import { useAppDispatch } from "app/store/store";
import {
  projectColumnMove,
  projectTaskMove,
  projectTaskMoveCol,
} from "app/store/Projects";
import transformData from "../../dashboard/dataTransform";
import Todo from "./Todo";
import InProgress from "./InProgress";

const Container = styled("div")``;

const DragLayout = ({ columnList, callListApi, id }) => {
  const dispatch = useAppDispatch();
  const [starter, setStarter] = useState(transformData(columnList));
  const a = transformData(columnList);
  useEffect(() => {
    setStarter(transformData(columnList));
    console.log(transformData(columnList));
  }, [columnList]);

  const moveColumns = async (payload: {
    project_id: string;
    column_ids: any[];
  }) => {
    try {
      const res = await dispatch(projectColumnMove(payload));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const moveRow = async (payload: {
    project_column_id: number;
    task_ids: any[];
  }) => {
    try {
      const res = await dispatch(projectTaskMove(payload));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const moveinColumn = async (payload: {
    project_column_id: number;
    task_id: number;
  }) => {
    try {
      const res = await dispatch(projectTaskMoveCol(payload));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const onDragEnd = async ({ destination, source, draggableId, type }) => {
    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const start = starter.columns[source.droppableId];
    const end = starter.columns[destination.droppableId];

    if (type === "column") {
      console.log(destination, source, draggableId);
      const newOrder = [...starter.columnOrder];
      newOrder.splice(source.index, 1);
      newOrder.splice(destination.index, 0, draggableId);
      const numberArray = newOrder.map(Number);
      setStarter({
        ...starter,
        columnOrder: newOrder,
      });
      const payload = {
        project_id: id,
        column_ids: numberArray,
      };

      try {
        await moveColumns(payload); // Call the moveColumns function with the correct payload
      } catch (error) {
        console.error("Error moving column:", error);
      }
      return;
    }

    if (start == end) {
      const column = starter.columns[source.droppableId];
      const taskIds = [...column.taskIds];
      taskIds.splice(source.index, 1);
      taskIds.splice(destination.index, 0, draggableId);
      const newColumn = {
        ...column,
        taskIds,
      };
      setStarter({
        ...starter,
        columns: {
          ...starter.columns,
          [column.id]: newColumn,
        },
      });
      const numberArray = taskIds.map(Number);
      const newId = Number(column?.id);
      const payload = {
        project_column_id: newId,
        task_ids: numberArray,
      };

      try {
        await moveRow(payload);
      } catch (error) {
        console.error("Error moving column:", error);
      }
      return;
    }

    const startTaskIds = [...start.taskIds];
    const endTaskIds = [...end.taskIds];

    startTaskIds.splice(source.index, 1);
    endTaskIds.splice(destination.index, 0, draggableId);

    const newStartColumn = {
      ...start,
      taskIds: startTaskIds,
    };
    const endTaskColumn = {
      ...end,
      taskIds: endTaskIds,
    };
    const payload = {
      project_column_id: Number(endTaskColumn?.id),
      task_id: draggableId,
    };

    try {
      await moveinColumn(payload); // Call the moveColumns function with the correct payload
    } catch (error) {
      console.error("Error moving column:", error);
    }
    setStarter({
      ...starter,
      columns: {
        ...starter.columns,
        [start.id]: newStartColumn,
        [end.id]: endTaskColumn,
      },
    });
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="all-column" type="column" direction="vertical">
        {(provided, snapshot) => (
          <Container
            //@ts-ignore
            isDraggingOver={snapshot.isDraggingOver}
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {starter.columnOrder.map((columnId, index) => {
              const column = starter.columns[columnId];

              const tasks = column?.taskIds.map(
                (taskId) => starter?.tasks[taskId]
              );
              const firstTaskId = Object.keys(starter.tasks)[0];
              const project_id = starter?.tasks[firstTaskId]?.project_id;

              return (
                <Todo
                  index={index}
                  key={column?.id}
                  title={column.title}
                  column={column}
                  tasks={tasks}
                  id={column?.id}
                  project_id={id}
                  callListApi={callListApi}
                />
              );
            })}
            {provided.placeholder}
          </Container>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default DragLayout;
