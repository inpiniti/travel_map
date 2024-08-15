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
  await getSchedule();
};

const handleImageError = (event: any) => {
  event.target.src = `/여행.jpg`;
};
</script>
<template>
  <div class="flex flex-col gap-2 p-2">
    <Card
      v-for="(travelPlan, index) in travelPlans"
      class="flex gap-2 p-2 text-xs cursor-pointer hover:bg-neutral-100"
      @click="click(travelPlan)"
      :class="{
        'bg-neutral-100': selectedTravelPlan === travelPlan,
      }"
    >
      <img
        :src="getImg(travelPlan.travel_region)"
        alt="Travel Image"
        class="object-cover rounded-lg h-14 w-14 shrink-0"
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
          <div><i class="fas fa-user"></i>{{ travelPlan.author }}</div>
          <div>{{ dayjs(travelPlan.date_created).format("YYYY-MM-DD") }}</div>
        </div>
      </div>
    </Card>
  </div>
</template>
