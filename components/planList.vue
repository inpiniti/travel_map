<script setup lang="ts">
import dayjs from "dayjs";
const { selectedTravelPlan, travelPlans } = useTravelPlan();
const { getSchedule } = useSchedule();
const filter = useFilter();
const getImg = (travel_region: string) => {
  return `/city/${travel_region}.png`;
};
const click = async (travelPlan: TravelPlan) => {
  selectedTravelPlan.value = travelPlan;
  filter.value.viewOnMobile = "schedule";
  filter.value.type = "일정";
  await getSchedule();

  useWindowHistory().push();
};

const handleImageError = (event: any) => {
  event.target.src = `/여행.jpg`;
};
</script>
<template>
  <div class="flex flex-col gap-2 p-2">
    <Card
      v-for="(travelPlan, index) in travelPlans"
      class="flex gap-2 p-2 text-xs cursor-pointer"
      @click="click(travelPlan)"
      :class="{
        'bg-yellow-400 ': selectedTravelPlan.id == travelPlan.id,
      }"
    >
      <img
        :src="getImg(travelPlan.travel_region)"
        alt="Travel Image"
        class="object-cover w-16 h-16 rounded-lg shrink-0"
        @error="handleImageError"
      />
      <div class="flex flex-col justify-between grow-[0] w-full">
        <div class="flex flex-col">
          <div class="font-bold">
            {{ travelPlan.plan_name }}
          </div>
          <div>
            {{ travelPlan.travel_region }}
            {{ travelPlan.travel_period }}
          </div>
        </div>
        <div class="flex items-center justify-between w-full">
          <div>{{ travelPlan.author }}</div>
          <div>{{ dayjs(travelPlan.date_created).format("YY.MM.DD") }}</div>
        </div>
      </div>
    </Card>
  </div>
</template>
