import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Cookies from "universal-cookie";

import { DragDropContext } from "react-beautiful-dnd";
import DefaultData from "./DefaultRowData";

import WidgetList from "./WidgetList";

const MainWidgetsContainer = styled.div`
  display: flex;
  flex-direction: column;
  border: solid 3px;
`;

const Main = () => {
  const [data, setData] = useState(DefaultData);

  //First time setup for new users
  // useEffect(() => {
  //   const cookies = new Cookies();

  //   const existingData = cookies.get('widgetsData')
  //   console.log(existingData)
  //   if(existingData) {
  //     setData(existingData); //Use cookie data
  //   }else{
  //     cookies.set('widgetsData' , DefaultData, {path: '/'})
  //   }
  // }, [])

  const handleDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    const start = data.lists[source.droppableId];
    const end = data.lists[destination.droppableId];

    if(start === end){
      const newWidgetIds = Array.from(start.widgetIds);
      newWidgetIds.splice(source.index, 1);
      newWidgetIds.splice(destination.index, 0, draggableId);
      const newList = {
        ...start,
        widgetIds: newWidgetIds,
      };

      const newState = {
        ...data,
        lists: {
          ...data.lists,
          [newList.id]: newList,
        },
      };

      setData(newState);
      return;
    }
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <MainWidgetsContainer>
        {data.listOrder.map((listId) => {
          const list = data.lists[listId];
          const widgets = list.widgetIds.map((id) => data.widgets[id]);
          return <WidgetList key={list.id} list={list} widgets={widgets} />;
        })}
      </MainWidgetsContainer>
    </DragDropContext>
  );
};

export default Main;
