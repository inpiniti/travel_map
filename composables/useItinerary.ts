export type Itinerary = {
  id: number;
  day: number;
  travel_plan_id: number;
  travel_spot_ids: number[];
};

export const useItinerary = () => {
  // 여행 일정
  // 여행계획아이디, 일차, 여행지ids
  // ex) 12, 1, [1, 2, 3]
  // 13, 2, [4, 5, 6]

  // 생성 쿼리
  // CREATE TABLE itinerary (
  //     id SERIAL PRIMARY KEY,
  //     day INTEGER NOT NULL,
  //     travel_plan_id INTEGER NOT NULL,
  //     travel_spot_ids INTEGER[] NOT NULL
  // );

  // index 를 여행계획아이디, 일차로 각각 생성
  // CREATE INDEX idx_travel_plan_id ON itinerary (travel_plan_id);
  // CREATE INDEX idx_day ON itinerary (day);

  const itineraries = useState<Itinerary[]>();

  const getItinerary = async () => {
    try {
      itineraries.value = (
        await useSupabase()
          .from("itinerary")
          .select("*")
          .order("day", { ascending: true })
      ).data as Itinerary[];
      return true;
    } catch (error) {
      console.error("Error fetching itineraries", error);
      return false;
    }
  };

  const setItinerary = async (itinerary: Itinerary) => {
    try {
      const { error } = await useSupabase()
        .from("itinerary")
        .insert([itinerary]);
      if (error) {
        throw error;
      }
      await getItinerary();
      return true;
    } catch (error) {
      console.error("Error adding itinerary", error);
      return false;
    }
  };

  return { itineraries, getItinerary, setItinerary };
};
