<script setup lang="ts">
import { city } from "../data/city";
import dayjs from "dayjs";

const { setSpot, status } = useSpot();
const form = ref({
  spot_name: "",
  description: "",
  image: "",
  latitude: "",
  longitude: "",
  type: "",
  city: "",
});

const saveSpot = async () => {
  await setSpot(form.value);
};
const open = ref(false);
</script>
<template>
  <Dialog :open="open" @update:open="open = $event">
    <DialogTrigger as-child>
      <Button> + 장소 등록하기 </Button>
    </DialogTrigger>
    <DialogContent class="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>장소 등록하기</DialogTitle>
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
              <SelectValue placeholder="Select 유형..." />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem
                  :value="type"
                  v-for="type in [
                    '음식점',
                    '호텔',
                    '즐길 거리',
                    '박물관',
                    '대중교통',
                    '약국',
                    'ATM',
                  ]"
                >
                  {{ type }}
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
            class="col-span-3"
            placeholder="이치란 본점"
            v-model="form.spot_name"
          />
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
      </div>
      <DialogFooter>
        <Button v-if="status"> loading... </Button>
        <Button v-else type="submit" @click="saveSpot"> Save </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
