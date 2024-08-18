<script setup lang="ts">
import { city } from "../data/city";
const { updateSpot, status, getSpotOfGoogle, selectedSpot } = useSpot();

const form = ref({
  id: 0,
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
const open = ref(false);
const loading = ref({
  save: false,
  get: false,
});

const saveSpot = async () => {
  loading.value.save = true;
  const res = await updateSpot(form.value);
  loading.value.save = false;
  if (res) {
    open.value = false;
  }
};

watchEffect(() => {
  form.value.id = selectedSpot.value.id ?? 0;
  form.value.spot_name = selectedSpot.value.spot_name ?? "";
  form.value.description = selectedSpot.value.description ?? "";
  form.value.image = selectedSpot.value.image ?? "";
  form.value.latitude = selectedSpot.value.latitude ?? 0;
  form.value.longitude = selectedSpot.value.longitude ?? 0;
  form.value.type = selectedSpot.value.type ?? "";
  form.value.city = selectedSpot.value.city ?? "";
  form.value.rating = selectedSpot.value.rating ?? 0;
  form.value.reviews = selectedSpot.value.reviews ?? 0;
  form.value.opening = selectedSpot.value.opening ?? "";
  form.value.veryRelaxed = selectedSpot.value.veryRelaxed ?? "";
  form.value.relaxed = selectedSpot.value.relaxed ?? "";
  form.value.moderate = selectedSpot.value.moderate ?? "";
  form.value.somewhatCrowded = selectedSpot.value.somewhatCrowded ?? "";
  form.value.veryCrowded = selectedSpot.value.veryCrowded ?? "";
  form.value.detailType = selectedSpot.value.detailType ?? "";
});

const getSpot = async () => {
  loading.value.get = true;
  const res: any = await getSpotOfGoogle(form.value.spot_name);
  loading.value.get = false;
  if (res) {
    form.value.spot_name = res.name;
    form.value.description = form.value.description ?? res.description;
    form.value.image = res.image;
    form.value.latitude = res.latitude;
    form.value.longitude = res.longitude;
    form.value.rating = res.rating;
    form.value.reviews = res.reviews;
    form.value.opening = res.opening;
    form.value.veryRelaxed = res.veryRelaxed.join(", ");
    form.value.relaxed = res.relaxed.join(", ");
    form.value.moderate = res.moderate.join(", ");
    form.value.somewhatCrowded = res.somewhatCrowded.join(", ");
    form.value.veryCrowded = res.veryCrowded.join(", ");
    form.value.detailType = res.type;
  }
};
</script>
<template>
  <Dialog :open="open" @update:open="open = $event">
    <DialogTrigger as-child>
      <Button class="flex gap-2">
        <font-awesome icon="pen" />
        장소 수정하기
      </Button>
    </DialogTrigger>
    <DialogContent class="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>장소 수정하기</DialogTitle>
        <DialogDescription>
          등록된 장소가 없는 경우 여기에서 장소를 등록해보세요. 완료되면 저장을
          클릭하세요.
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
          <Input
            class="col-span-2"
            placeholder="이치란 본점"
            v-model="form.spot_name"
          />
          <Button class="col-span-1 flex gap-2" @click="getSpot">
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
          <Input
            class="col-span-3"
            placeholder="후쿠오카를 대표하는 라멘 전문점
칼칼하게 먹고 싶다면 비밀소스 3단계 이상 추천
텐진 등 다른 곳에도 여러 매장이 있음"
            v-model="form.description"
          />
        </div>
        <div class="grid items-center grid-cols-4 gap-4">
          <Label class="text-right"> 장소 이미지 ULR </Label>
          <Input
            class="col-span-3"
            placeholder="https://www.google.com"
            v-model="form.image"
          />
        </div>
        <div class="grid items-center grid-cols-4 gap-4">
          <Label class="text-right"> 위도 </Label>
          <Input
            class="col-span-3"
            placeholder="33.590355"
            v-model="form.latitude"
          />
        </div>
        <div class="grid items-center grid-cols-4 gap-4">
          <Label class="text-right"> 경도 </Label>
          <Input
            class="col-span-3"
            placeholder="130.401716"
            v-model="form.longitude"
          />
        </div>
        <div class="grid items-center grid-cols-4 gap-4">
          <Label class="text-right"> 평점 </Label>
          <Input class="col-span-3" placeholder="4.5" v-model="form.rating" />
        </div>
        <div class="grid items-center grid-cols-4 gap-4">
          <Label class="text-right"> 리뷰수 </Label>
          <Input class="col-span-3" placeholder="345" v-model="form.reviews" />
        </div>
        <div class="grid items-center grid-cols-4 gap-4">
          <Label class="text-right"> 영업시간 </Label>
          <Input
            class="col-span-3"
            placeholder="오전 9:30~오후 6:15"
            v-model="form.opening"
          />
        </div>
      </div>
      <DialogFooter>
        <Button v-if="status"> loading... </Button>
        <Button v-else type="submit" @click="saveSpot"> Save </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
