import React, {useRef} from "react";
import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import Widget from "./Widget";

const ListContainer = styled.div`
  display: flex;
  flex: 1;
  padding: 8px;
`;

const ListWidgets = styled.div`
  display: flex;
  padding: 8px;
  background-color: ${({ isDraggingOver }) =>
    isDraggingOver ? "grey" : '#212529'};

  
  border-radius: 10px;
  flex-grow: 1;
`;

const WidgetList = React.memo(
  
  ({ list, widgets }) => {
    const count  = useRef(0);
    return (
      <ListContainer>
        <div style={{color: "white"}}>{count.current++}</div>
        <Droppable droppableId={list.id} direction="horizontal">
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
    if (JSON.stringify(prevProps.list) !== JSON.stringify(nextProps.list)) {
      return false;
    }

    return true;
  }
);

export default WidgetList;
