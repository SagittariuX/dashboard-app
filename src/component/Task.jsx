import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

const TaskContainer = styled.div`
  border: 1px solid lightgrey;
  border-radius: 2px;
  padding: 8px;
  margin-bottom: 8px;
  background-color: ${({isDragging}) => isDragging ? 'lightgreen': 'white'};
`;

const Task = ({ task, index }) => {
  return (
    <Draggable draggableId={task.id} index={index}> 
      {(provided, snapshot) => (
        <TaskContainer
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          innerRef={provided.innerRef}
          isDragging={snapshot.isDragging}
        >
          {task.content}
        </TaskContainer>
      )}
    </Draggable>
  );
};

export default Task;
