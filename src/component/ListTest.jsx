import React, { useState } from "react";
import styled from "styled-components";
import { DragDropContext } from "react-beautiful-dnd";
import Data from "./ListTestData";

import Column from "./Column";

//Learning RBD
//Following EggHead Guide : https://egghead.io/lessons/react-create-and-style-a-list-of-data-with-react

const ColumnContainer = styled.div`
  display: flex;
`;

const ListTest = () => {
  const [data, setData] = useState(Data);

  const handleDragEnd = (result) => {
    const { destination, source, draggableId } = result;
    console.log(result);
    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    const start = data.columns[source.droppableId];
    const end = data.columns[destination.droppableId];

    if (start === end) {
      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);
      const newColumn = {
        ...start,
        taskIds: newTaskIds,
      };

      const newState = {
        ...data,
        columns: {
          ...data.columns,
          [newColumn.id]: newColumn,
        },
      };

      setData(newState);
      return;
    }

    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStart = {
        ...start,
        taskIds: startTaskIds,
    }

    const finishTaskIds = Array.from(end.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newEnd ={
        ...end,
        taskIds: finishTaskIds,
    }

    const newState = {
        ...data,
        columns:{
            ...data.columns,
            [newStart.id]: newStart,
            [newEnd.id]: newEnd,
        },
    }

    setData(newState);
    return;
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <ColumnContainer>
        {data.columnOrder.map((columnId) => {
          const column = data.columns[columnId];
          const tasks = column.taskIds.map((taskId) => data.tasks[taskId]);
          return <Column key={column.id} column={column} tasks={tasks} />;
        })}
      </ColumnContainer>
    </DragDropContext>
  );
};

export default ListTest;
