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

export const CATEGORYS = [
  "공항",
  "명소",
  "관광",
  "근교명소",
  "음식점",
  "카페",
  "호텔",
  "쇼핑",
  "선술집",
];

export const ICON: any = {
  공항: "plane",
  명소: "landmark",
  관광: "umbrella-beach",
  근교명소: "landmark",
  음식점: "utensils",
  카페: "mug-saucer",
  호텔: "hotel",
  쇼핑: "bag-shopping",
  선술집: "glass-cheers",
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
          .in("type", useFilter().value.category)
      ).data as Spot[];
      return true;
    } catch (error) {
      console.error("Error fetching spots", error);
      return false;
    }
  };

  const getSpotOfGoogle = async (word: string) => {
    try {
      return (await fetch(`/api/google/search/${word}`)).json();
    } catch (error) {
      console.error("Error fetching spots", error);
      return false;
    }
  };

  const getSpotsById = async (ids: number[]) => {
    try {
      // Supabase에서 데이터 조회
      const { data: spots, error } = await useSupabase()
        .from("spot")
        .select("*")
        .in("id", ids);

      // ids 배열의 순서에 따라 spots 배열 재정렬
      const orderedSpots = ids
        .map((id) => spots?.find((spot) => spot.id === id))
        .filter((spot) => spot !== undefined) as Spot[];

      // orderedSpots는 이제 ids 배열의 순서대로 정렬된 Spot[] 타입입니다.
      return orderedSpots;
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

  return {
    spots,
    status,
    selectedSpot,
    getSpots,
    setSpot,
    getSpotsById,
    getSpotOfGoogle,
  };
};
