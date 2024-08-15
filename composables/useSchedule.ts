export type Schedule = {
  id?: number;
  day: number;
  travel_plan_id: number;
  travel_spot_ids: number[];
};

export const useSchedule = () => {
  const { spots, getSpotsById } = useSpot();
  const { toast } = useToast();

  const schedules = useState<Schedule[]>("schedules", () => []);
  const schedulesSpots = useState<Spot[]>("schedulesSpots", () => []);

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

      toast({
        title: "일정이 추가되었습니다.",
      });
      await getSchedule();
      return true;
    } catch (error) {
      toast({
        title: "일정 추가에 실패했습니다.",
        description: `Error: ${error}`,
        variant: "destructive",
      });
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
      toast({
        title: "일정이 수정되었습니다.",
      });
      await getSchedule();
      return true;
    } catch (error) {
      toast({
        title: "일정 수정에 실패했습니다.",
        description: `Error: ${error}`,
        variant: "destructive",
      });
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
