export const useFilter = () =>
  useState("filter", () => {
    return {
      search: "",
      city: "가평,양평",
      day: 1,
      type: "일정",
      category: "명소",
      selectedTile: "cartoDb",
      scheduleWritingOpen: false,
      viewOnMobile: "plan", // plan, schedule, map
    };
  });
