export type Schedule = {
  id?: number;
  day: number;
  travel_plan_id: number;
  travel_spot_ids: number[];
};

export const useSchedule = () => {
  const { spots, getSpotsById } = useSpot();

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

  const schedules = useState<Schedule[]>();
  const schedulesSpots = useState<Spot[]>();

  const dayNSchedule = computed(() => {
    return (schedules.value ?? []).filter((schedule) => {
      return schedule.day === useFilter().value.day;
    })[0];
  });

  watchEffect(async () => {
    if (useFilter().value.type == "일정") {
      if (dayNSchedule.value && dayNSchedule.value.travel_spot_ids) {
        schedulesSpots.value = await getSpotsById(
          dayNSchedule.value.travel_spot_ids
        );
      } else {
        schedulesSpots.value = [];
      }
    } else {
      schedulesSpots.value = spots.value;
    }
  });

  const getSchedule = async () => {
    try {
      schedules.value = (
        await useSupabase()
          .from("schedule")
          .select("*")
          .eq("travel_plan_id", useTravelPlan().selectedTravelPlan.value.id)
          .order("day", { ascending: true })
      ).data as Schedule[];
      return true;
    } catch (error) {
      console.error("Error fetching schedules", error);
      return false;
    }
  };

  const setSchedule = async (schedule: Schedule) => {
    try {
      const { error } = await useSupabase().from("schedule").insert([schedule]);
      if (error) {
        throw error;
      }
      await getSchedule();
      return true;
    } catch (error) {
      console.error("Error adding schedule", error);
      return false;
    }
  };

  const putSchedule = async (schedule: Schedule) => {
    try {
      const { error } = await useSupabase()
        .from("schedule")
        .update({ travel_spot_ids: schedule.travel_spot_ids })
        .eq("id", schedule.id);
      if (error) {
        throw error;
      }
      await getSchedule();
      return true;
    } catch (error) {
      console.error("Error updating schedule", error);
      return false;
    }
  };

  return {
    schedules,
    schedulesSpots,
    dayNSchedule,
    getSchedule,
    setSchedule,
    putSchedule,
  };
};
