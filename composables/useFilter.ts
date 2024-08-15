export const useFilter = () =>
  useState("filter", () => {
    return {
      search: "",
      city: "전체",
      day: 1,
      type: "일정",
      category: "명소",
      selectedTile: "cartoDb",
      scheduleWritingOpen: false,
      viewOnMobile: "plan", // plan, schedule, map
    };
  });
