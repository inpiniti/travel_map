<script setup lang="ts">
import dayjs from "dayjs";
const { selectedTravelPlan, travelPlans } = useTravelPlan();
const filter = useFilter();
const getImg = (index: number) => {
  if (index === 0) return `/city/가평.png`;
  else if (index === 1) return `/city/강릉.png`;
  else if (index === 2) return `/city/경주.png`;
  else
    return `https://img.freepik.com/free-vector/peullaes-dijain-jaedan-ui-nal-ilbon_23-2148810360.jpg`;
};
const click = (travelPlan: TravelPlan) => {
  selectedTravelPlan.value = travelPlan;
  filter.value.viewOnMobile = "schedule";
};
</script>
<template>
  <div class="flex flex-col gap-2 p-2">
    <Card
      v-for="(travelPlan, index) in travelPlans"
      class="flex gap-2 p-2 text-xs cursor-pointer hover:bg-neutral-100"
      @click="click"
      :class="{
        'bg-neutral-100': selectedTravelPlan === travelPlan,
      }"
    >
      <img
        :src="getImg(index)"
        alt="Travel Image"
        class="object-cover h-full rounded-lg w-14 shrink-0"
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
