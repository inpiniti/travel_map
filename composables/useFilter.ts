export const useFilter = () =>
  useState("filter", () => {
    return {
      search: "",
      scheduleSearch: "",
      city: "전체",
      day: 1,
      type: "일정",
      category: [],
      selectedTile: "cartoDb",
      scheduleWritingOpen: false,
      viewOnMobile: "plan", // plan, schedule, map
      isDraggable: false,
      spotWritingOpen: false,
    };
  });
