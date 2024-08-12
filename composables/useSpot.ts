type Spot = {
  id: number;
  spot_name: string;
  description: string;
  image: string;
  latitude: number;
  longitude: number;
};

// 여행지
export const useSpot = () => {
  // 여행지
  // 여행지명, 설명, 이미지, 위도, 경도
  const spots = ref<
    | Spot[]
    | {
        id: number;
        spot_name: string;
        description: string;
        image: string;
        latitude: number;
        longitude: number;
      }[]
    | null
  >(null);

  const getSpots = async () => {
    try {
      spots.value = (await useSupabase().from("spot").select("*")).data;
      return true;
    } catch (error) {
      console.error("Error fetching spots", error);
      return false;
    }
  };

  const setSpot = async (spot: Spot) => {
    try {
      await useSupabase().from("spot").insert([spot]);
      return true;
    } catch (error) {
      console.error("Error inserting spot", error);
      return false;
    }
  };

  return { spots, getSpots };
};
