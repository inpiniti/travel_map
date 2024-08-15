export type TravelPlan = {
  id: number;
  plan_name: string;
  author: string;
  date_created: Date;
  travel_region: string;
  travel_period: string;
};

export const useTravelPlan = () => {
  const status = useState("travelStatus", () => false);
  const { toast } = useToast();

  // 여행계획
  // 계획명, 작성자, 작성일, 여행지역, 여행목적, 여행기간 등
  const travelPlans = useState<
    | TravelPlan[]
    | {
        id: number;
        plan_name: string;
        author: string;
        date_created: Date;
        travel_region: string;
        travel_period: string;
      }[]
    | null
  >("travelPlans");

  const selectedTravelPlan = useState<TravelPlan>("travelPlan");

  const getTravelPlans = async () => {
    const promise = useSupabase()
      .from("travel_plan")
      .select("*")
      .order("date_created", { ascending: false });
    if (useFilter().value.city != "전체") {
      promise.eq("travel_region", useFilter().value.city);
    }

    if (useFilter().value.search != "") {
      promise.or(
        `plan_name.ilike.%${useFilter().value.search}%,author.ilike.%${
          useFilter().value.search
        }%`
      );
    }

    try {
      travelPlans.value = (await promise).data;
      if (selectedTravelPlan.value == null && travelPlans.value != null) {
        selectedTravelPlan.value = travelPlans.value[0];
      }
      return true;
    } catch (error) {
      console.error("Error fetching travel plans", error);
      return false;
    }
  };

  const setTravelPlan = async (travelPlan: TravelPlan) => {
    try {
      status.value = true;
      const { error } = await useSupabase()
        .from("travel_plan")
        .insert([travelPlan]);
      if (error) {
        throw error;
      }
      toast({
        title: "여행 계획이 추가되었습니다.",
      });
      await getTravelPlans();
      return true;
    } catch (error) {
      console.error("Error adding travel plan", error);
      toast({
        title: "여행 계획 추가에 실패했습니다.",
        variant: "destructive",
        description: `Error: ${error}`,
      });
      return false;
    } finally {
      status.value = false;
    }
  };

  return {
    selectedTravelPlan,
    travelPlans,
    getTravelPlans,
    setTravelPlan,
    status,
  };
};
