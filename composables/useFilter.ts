export const useFilter = () =>
  useState("filter", () => {
    return {
      search: "",
      scheduleSearch: "",
      city: "후쿠오카",
      day: 1,
      type: "일정",
      category: ["명소"],
      selectedTile: "cartoDb",
      scheduleWritingOpen: false,
      viewOnMobile: "plan", // plan, schedule, map
      isDraggable: false,
    };
  });
