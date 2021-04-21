import React, {useRef} from "react";
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

  min-height: 100px;
`;

const ListWidgets = styled.div`
  padding: 8px;
  background-color: ${({ isDraggingOver }) =>
    isDraggingOver ? "lightblue" : "white"};
  flex-grow: 1;
`;

const WidgetList = React.memo(
  ({ list, widgets }) => {

    const count = useRef(0);
    return (
      <ListContainer>
        <div>{count.current += 1}</div>
        <Droppable droppableId={list.id}>
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
