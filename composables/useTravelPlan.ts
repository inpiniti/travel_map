export type TravelPlan = {
  id: number;
  plan_name: string;
  author: string;
  date_created: Date;
  travel_region: string;
  travel_purpose: string;
  travel_period: string;
};

export const useTravelPlan = () => {
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
        travel_purpose: string;
        travel_period: string;
      }[]
    | null
  >("travelPlans");

  const getTravelPlans = async () => {
    try {
      travelPlans.value = (
        await useSupabase().from("travel_plan").select("*")
      ).data;
      return true;
    } catch (error) {
      console.error("Error fetching travel plans", error);
      return false;
    }
  };
  return { travelPlans, getTravelPlans };
};
