import React, { useState } from "react";

import { DragDropContext } from "react-beautiful-dnd";
import Data from "./ListTestData";

import Column from "./Column";

//Learning RBD
//Following EggHead Guide : https://egghead.io/lessons/react-create-and-style-a-list-of-data-with-react

const ListTest = () => {
  const [data, setData] = useState(Data);

  const handleDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    const column = data.columns[source.droppableId];
    const newTaskIds = Array.from(column.taskIds);
    newTaskIds.splice(source.index , 1);
    newTaskIds.splice(destination.index, 0 , draggableId);

    const newColumn = {
        ...column,
        taskIds: newTaskIds,
    };

    const newState = {
        ...data,
        columns: {
            ...data.columns,
            [newColumn.id]: newColumn,
        }
    };

    setData(newState);

  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      {data.columnOrder.map((columnId) => {
        const column = data.columns[columnId];
        const tasks = column.taskIds.map((taskId) => data.tasks[taskId]);

        return <Column key={column.id} column={column} tasks={tasks} />;
      })}
    </DragDropContext>
  );
};

export default ListTest;
