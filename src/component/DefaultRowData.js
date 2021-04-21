const widgetsData = {
  widgets: {
    "default-1": { id: "default-1", content: "pie-graph" },
    "default-2": { id: "default-2", content: "line-graph" },
    "default-3": { id: "default-3", content: "bar-graph" },
    "default-4": { id: "default-4", content: "circle-graph" },
  },
  lists: {
    "list-1": {
      id: "list-1",
      widgetIds: ["default-1", "default-2"],
    },
    "list-2": {
      id: "list-2",
      widgetIds: ["default-3", "default-4"],
    },
  },
  // Facilitate reordering of the lists
  listOrder: ["list-1", "list-2"],
};

export default widgetsData;
