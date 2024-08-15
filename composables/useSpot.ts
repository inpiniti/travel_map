export type Spot = {
  id?: number;
  spot_name: string;
  description: string;
  image: string;
  latitude: number;
  longitude: number;
  type: string;
  city: string;
};

export const ICON: any = {
  공항: "plane",
  명소: "landmark",
  근교명소: "landmark",
  음식점: "utensils",
  카페: "mug-saucer",
  호텔: "hotel",
  쇼핑: "bag-shopping",
  "즐길 거리": "map",
  박물관: "landmark",
  대중교통: "train",
  약국: "hospital",
  ATM: "money-bill",
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
  const selectedSpot = useState<Spot>("spot");
  const status = useState("spotStatus", () => false);
  const { toast } = useToast();

  const getSpots = async () => {
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
      return (await useSupabase().from("spot").select("*").in("id", ids))
        .data as Spot[];
    } catch (error) {
      console.error("Error fetching spots", error);
      return [];
    }
  };

  const setSpot = async (spot: Spot) => {
    try {
      await useSupabase().from("spot").insert([spot]);
      toast({
        title: "여행지가 추가되었습니다.",
      });
      return true;
    } catch (error) {
      toast({
        title: "여행지 추가에 실패했습니다.",
        variant: "destructive",
        description: `Error: ${error}`,
      });
      return false;
    }
  };

  return { spots, status, selectedSpot, getSpots, setSpot, getSpotsById };
};
