import React from "react";
import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import Task from "./Task";

const ListContainer = styled.div`
  flex: 1;
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;

  display: flex;
  flex-direction: column;
`;
const ListTitle = styled.h3`
  padding: 8px;
`;
const ListTasks = styled.div`
  padding: 8px;
  background-color: ${({isDraggingOver}) =>
    isDraggingOver ? "lightblue" : "white"};
  flex-grow: 1;
`;

const Column = ({ column, tasks }) => {
  return (
    <ListContainer>
      <ListTitle>{column.title}</ListTitle>
      <Droppable droppableId={column.id} type='task'>
        {(provided, snapshot) => (
          <ListTasks
            ref={provided.innerRef}
            innerRef={provided.innerRef}
            {...provided.droppableProps}
            isDraggingOver={snapshot.isDraggingOver}
          >
            {tasks.map((task, index) => (
              <Task key={task.id} task={task} index={index} />
            ))}
            {provided.placeholder}
          </ListTasks>
        )}
      </Droppable>
    </ListContainer>
  );
};

export default React.memo(Column);
