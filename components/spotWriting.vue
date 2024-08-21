<script setup lang="ts">
import { city } from "../data/city";
const {
  setSpot,
  getSpots,
  status,
  getSpotOfGoogle,
  isGetSpotByLatitudeLongitudeName,
} = useSpot();
const { toast } = useToast();
const filter = useFilter();

const form = ref({
  spot_name: "",
  description: "",
  image: "",
  latitude: 0,
  longitude: 0,
  type: "",
  city: "",
  rating: 0, // 평점
  reviews: 0, // 리뷰 수
  opening: "", // 영업시간
  veryRelaxed: "", // 매우 여유로운 시간대
  relaxed: "", // 여유로운 시간대
  moderate: "", // 보통 시간대
  somewhatCrowded: "", // 다소 혼잡한 시간대
  veryCrowded: "", // 매우 혼잡한 시간대
  detailType: "", // 상세타입
});
const loading = ref({
  save: false,
  get: false,
});

const saveSpot = async () => {
  loading.value.save = true;
  const res = await setSpot(form.value);
  loading.value.save = false;
  if (res) {
    form.value = {
      ...form.value,
      spot_name: "",
      description: "",
      image: "",
      latitude: 0,
      longitude: 0,
    };
    filter.value.spotWritingOpen = false;
  }
  // 장소 팝업창 뜨기
  useFilter().value.scheduleWritingOpen = true;
};
//const open = ref(false);

watch(
  () => filter.value.spotWritingOpen,
  async () => {
    if (filter.value.spotWritingOpen) {
      form.value.spot_name = `${useFilter().value.city} ${
        useFilter().value.scheduleSearch
      }`;

      // 구글 검샘
      const res = await getSpot();
      if (res) {
        // 디비에 이미 있는지 확인
        const isSpot = await isGetSpotByLatitudeLongitudeName(form.value);
        if (!isSpot) {
          // 없는 경우 새 장소 등록
          await saveSpot();
        }

        // 화면 닫고, 새 장소 또는 저장된 장소를 보여줌
        useFilter().value.scheduleSearch = form.value.spot_name;
        await getSpots();
        filter.value.spotWritingOpen = false;
      }
    }
  }
);

const getSpot = async () => {
  loading.value.get = true;
  const res: any = await getSpotOfGoogle(form.value.spot_name);
  loading.value.get = false;
  if (ref.name == null) {
    toast({
      title: `구글에 "${form.value.spot_name}" 라는 장소가 없습니다.`,
      variant: "destructive",
    });
    return false;
  }

  if (res) {
    form.value = {
      spot_name: res.name,
      description: res.description,
      image: res.image,
      latitude: res.latitude,
      longitude: res.longitude,

      rating: res.rating,
      reviews: res.reviews,
      opening: res.opening,
      veryRelaxed: res.veryRelaxed,
      relaxed: res.relaxed,
      moderate: res.moderate,
      somewhatCrowded: res.somewhatCrowded,
      veryCrowded: res.veryCrowded,
      detailType: res.type,

      type: form.value.type,
      city: form.value.city,
    };
  }

  return true;
};
</script>
<template>
  <Dialog
    :open="filter.spotWritingOpen"
    @update:open="filter.spotWritingOpen = $event"
  >
    <DialogContent class="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>장소 등록하기</DialogTitle>
        <DialogDescription>
          등록된 장소가 없어 구글지도에서 가져오는 중입니다. 잠시만
          기다려주세요.
        </DialogDescription>
      </DialogHeader>
      <div class="grid gap-4 py-4">
        <div class="grid items-center grid-cols-4 gap-4">
          <Label class="text-right"> 장소 유형 </Label>
          <Select v-model="form.type">
            <SelectTrigger class="col-span-3">
              <SelectValue placeholder="Select a city" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem :value="category" v-for="category in CATEGORYS">
                  {{ category }}
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div class="grid items-center grid-cols-4 gap-4">
          <Label class="text-right"> 도시 </Label>
          <Select v-model="form.city">
            <SelectTrigger class="col-span-3">
              <SelectValue placeholder="Select a city" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="전체"> 전체 </SelectItem>
                <template v-for="key in Object.keys(city)">
                  <SelectLabel>{{ key }}</SelectLabel>
                  <SelectItem :value="city_name" v-for="city_name in city[key]">
                    {{ city_name }}
                  </SelectItem>
                </template>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div class="grid items-center grid-cols-4 gap-4">
          <Label class="text-right"> 장소명 </Label>
          <Input class="col-span-2" v-model="form.spot_name" />
          <Button class="col-span-1" @click="getSpot">
            <template v-if="loading.get">
              <font-awesome icon="circle-notch" spin />
            </template>
            <template v-else> 가져오기 </template>
          </Button>
        </div>
        <div class="grid items-center grid-cols-4 gap-4">
          <Label class="text-right">상세 유형</Label>
          <Input type="text" class="col-span-3" v-model="form.detailType" />
        </div>
        <div class="grid items-center grid-cols-4 gap-4">
          <Label class="text-right"> 장소 설명 </Label>
          <Input class="col-span-3" v-model="form.description" />
        </div>
        <div class="grid items-center grid-cols-4 gap-4">
          <Label class="text-right"> 장소 이미지 ULR </Label>
          <Input class="col-span-3" v-model="form.image" />
        </div>
        <div class="grid items-center grid-cols-4 gap-4">
          <Label class="text-right"> 위도 </Label>
          <Input class="col-span-3" v-model="form.latitude" />
        </div>
        <div class="grid items-center grid-cols-4 gap-4">
          <Label class="text-right"> 경도 </Label>
          <Input class="col-span-3" v-model="form.longitude" />
        </div>
        <div class="grid items-center grid-cols-4 gap-4">
          <Label class="text-right"> 평점 </Label>
          <Input class="col-span-3" v-model="form.rating" />
        </div>
        <div class="grid items-center grid-cols-4 gap-4">
          <Label class="text-right"> 리뷰수 </Label>
          <Input class="col-span-3" v-model="form.reviews" />
        </div>
        <div class="grid items-center grid-cols-4 gap-4">
          <Label class="text-right"> 영업시간 </Label>
          <Input class="col-span-3" v-model="form.opening" />
        </div>
      </div>
      <DialogFooter>
        <Button type="submit" @click="saveSpot">
          <template v-if="status">
            <font-awesome icon="circle-notch" spin />
          </template>
          <template v-else> Save </template>
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
