<script setup lang="ts">
import { city } from "../data/city";
import dayjs from "dayjs";

const { setTravelPlan, status } = useTravelPlan();
const form = ref({
  plan_name: "",
  author: "",
  travel_region: "",
  travel_period: "",
  date_created: dayjs().format("YYYY-MM-DD"),
});

const savePlan = () => {
  setTravelPlan(form.value);
};
</script>
<template>
  <Dialog>
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
          <Select>
            <SelectTrigger class="col-span-3">
              <SelectValue placeholder="Select 유형..." />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem
                  :value="city_name"
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
          <Label class="text-right"> 장소명 </Label>
          <Input
            class="col-span-3"
            placeholder="서울 3박 4일 여행"
            v-model="form.plan_name"
          />
        </div>
        <div class="grid items-center grid-cols-4 gap-4">
          <Label class="text-right"> 장소 설명 </Label>
          <Input
            class="col-span-3"
            placeholder="홍길동"
            v-model="form.author"
          />
        </div>
        <div class="grid items-center grid-cols-4 gap-4">
          <Label class="text-right"> 장소 이미지 ULR </Label>
          <Select v-model="form.travel_region">
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
          <Label class="text-right"> 위도 </Label>
          <Input
            class="col-span-3"
            placeholder="3박 4일"
            v-model="form.travel_period"
          />
        </div>
        <div class="grid items-center grid-cols-4 gap-4">
          <Label class="text-right"> 경도 </Label>
          <Input
            class="col-span-3"
            placeholder="3박 4일"
            v-model="form.travel_period"
          />
        </div>
      </div>
      <DialogFooter>
        <Button v-if="status"> loading... </Button>
        <Button v-else type="submit" @click="savePlan"> Save </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
