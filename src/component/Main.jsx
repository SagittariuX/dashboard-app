import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Cookies from "universal-cookie";

import { DragDropContext } from "react-beautiful-dnd";
import DefaultData from "./DefaultRowData";
import Viewport from './Viewports';

import WidgetList from "./WidgetList";

import {StylesProvider} from '@material-ui/core/styles'
import {Container} from '@material-ui/core';

const BackgroundWrapper = styled(Container)`
  background-color: #3d434b;
  padding: 8px;
`;

const AppWrapper = styled(Container)`
  display: flex;
  min-height: 100vh;
  padding-left: 0px;
  padding-right: 0px;
  
  background-color: transparent;
  border-radius: 10px;

  overflow: hidden;
  @media ${Viewport.tablet}{
    display:block;
  }
`;

const MainWidgetsContainer = styled.div`
  display: flex;
  flex: 3;
  flex-direction: column;
`;

const SideBar = styled.div`
  display: flex;
  flex: 1;
  background-color: #383c40;
`;


const Main = () => {
  const [data, setData] = useState(DefaultData);

  // First time setup for new users
  useEffect(() => {
    const cookies = new Cookies();

    const existingData = cookies.get('widgetsData')
    console.log(existingData)
    if(existingData) {
      setData(existingData); //Use cookie data
    }else{
      cookies.set('widgetsData' , DefaultData, {path: '/'})
    }
  }, [])

  const handleDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    const cookies = new Cookies();
    if (!destination){
      return;
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ){
      return;
    }
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
      
      cookies.set('widgetsData' , newState, {path: '/'})
      setData(newState);
      return;
    }

    const startWidgetIds = Array.from(start.widgetIds);
    startWidgetIds.splice(source.index, 1);
    const newStart = {
      ...start,
      widgetIds : startWidgetIds,
    }

    const endWidgetIds = Array.from(end.widgetIds);
    endWidgetIds.splice(destination.index, 0 , draggableId);
    const newEnd = {
      ...end,
      widgetIds : endWidgetIds,
    }

    const newState={
      ...data,
      lists:{
        ...data.lists,
        [newStart.id] : newStart,
        [newEnd.id] : newEnd,
      }
    }

    cookies.set('widgetsData' , newState, {path: '/'})
    setData(newState);
    return;

  };

  return (
    
    <StylesProvider injectFirst>
      <BackgroundWrapper maxWidth={false}>
        <AppWrapper maxWidth='xl'>
          <DragDropContext onDragEnd={handleDragEnd}>
            <MainWidgetsContainer>
              {data.listOrder.map((listId) => {
                const list = data.lists[listId];
                const widgets = list.widgetIds.map((id) => data.widgets[id]);
                return <WidgetList key={list.id} list={list} widgets={widgets}/>;
              })}
            </MainWidgetsContainer>
          </DragDropContext>
          <SideBar>
            HI
          </SideBar>
        </AppWrapper>
      </BackgroundWrapper>
    </StylesProvider>
  );
};

export default Main;
