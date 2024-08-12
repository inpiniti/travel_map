export const useFilter = () =>
  useState("filter", () => {
    return {
      search: "",
      city: "가평,양평",
      day: 1,
      type: "일정",
      category: "음식점",
    };
  });
