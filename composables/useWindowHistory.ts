export const useWindowHistory = () => {
  const filter = useFilter();
  const { selectedTravelPlan } = useTravelPlan();

  const history = useState("history", () => window.history);
  const push = () => {
    const serializableData = JSON.parse(
      JSON.stringify({
        filter: filter.value,
        selectedTravelPlan: selectedTravelPlan.value,
      })
    );
    history.value.pushState(serializableData, "", location.href);
  };

  const pop = (event: any) => {
    if (event.state) {
      filter.value = event.state.filter;
      selectedTravelPlan.value = event.state.selectedTravelPlan;
    }
  };

  return {
    push,
    pop,
  };
};
