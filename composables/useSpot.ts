type Spot = {
  id?: number;
  spot_name: string;
  description: string;
  image: string;
  latitude: number;
  longitude: number;
  type: string;
  city: string;
};

// postgres 생성 쿼리 만들어줘
// CREATE TABLE spot (
//   id SERIAL PRIMARY KEY,
//   spot_name TEXT NOT NULL,
//   description TEXT NOT NULL,
//   image TEXT NOT NULL,
//   latitude NUMERIC NOT NULL,
//   longitude NUMERIC NOT NULL,
//   type TEXT NOT NULL,
//   city TEXT NOT NULL
// );

// 인덱스를 type과 city에 각각 걸어줘
// CREATE INDEX spot_type_index ON spot(type);
// CREATE INDEX spot_city_index ON spot(city);

// 여행지
export const useSpot = () => {
  // 여행지
  // 여행지명, 설명, 이미지, 위도, 경도
  const spots = useState<Spot[]>("spots");

  const status = useState("spotStatus", () => false);

  const getSpots = async () => {
    console.log("category", useFilter().value.category);
    try {
      spots.value = (
        await useSupabase()
          .from("spot")
          .select("*")
          .eq("type", useFilter().value.category)
      ).data as Spot[];
      return true;
    } catch (error) {
      console.error("Error fetching spots", error);
      return false;
    }
  };

  const getSpotsById = async (ids: number[]) => {
    try {
      spots.value = (await useSupabase().from("spot").select("*").in("id", ids))
        .data as Spot[];
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

  return { spots, status, getSpots, setSpot };
};
