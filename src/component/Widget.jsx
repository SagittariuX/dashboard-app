import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

const WidgetContainer = styled.div`
  border: 1px solid lightgrey;
  border-radius: 2px;
  padding: 8px;
  margin-bottom: 8px;
  background-color: ${({ isDragging }) =>
    isDragging ? "lightgreen" : "white"};
`;

const Widget = ({ widget, index }) => {
  const { id, content } = widget;
  return (
    <Draggable draggableId={id} index={index}>
      {(provided, snapshot) => (
        <WidgetContainer
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          innerRef={provided.innerRef}
          isDragging={snapshot.isDragging}
        >
          {content}
        </WidgetContainer>
      )}
    </Draggable>
  );
};

export default Widget;
