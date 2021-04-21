import React from "react";
import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import Widget from "./Widget";

const ListContainer = styled.div`
  flex: 1;
  margin: 8px;
  padding: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
  display: flex;
`;

const ListWidgets = styled.div`
  display:flex;
  padding: 8px;
  background-color: ${({ isDraggingOver }) =>
    isDraggingOver ? "lightblue" : "white"};

  flex-grow: 1;
`;

const WidgetList = React.memo(
  ({ list, widgets }) => {
    return (
      <ListContainer>
        <Droppable droppableId={list.id} direction='horizontal'>
          {(provided, snapshot) => (
            <ListWidgets
              ref={provided.innerRef}
              innerRef={provided.innerRef}
              {...provided.droppableProps}
              isDraggingOver={snapshot.isDraggingOver}
              
            >
              {widgets.map((widget, index) => (
                <Widget key={widget.id} widget={widget} index={index} />
              ))}
              {provided.placeholder}
            </ListWidgets>
          )}
        </Droppable>
      </ListContainer>
    );
  },
  (prevProps, nextProps) => {
    console.log(prevProps);
    console.log(nextProps)
    if (JSON.stringify(prevProps.list) !== JSON.stringify(nextProps.list)) {
      return false;
    }

    return true;
  }
);

export default WidgetList;
