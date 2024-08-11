<script setup lang="ts">
import dayjs from "dayjs";
const { travelPlans } = useTravelPlan();
const getImg = (index: number) => {
  if (index === 0) return `/city/가평.png`;
  else if (index === 1) return `/city/강릉.png`;
  else if (index === 2) return `/city/경주.png`;
  else
    return `https://img.freepik.com/free-vector/peullaes-dijain-jaedan-ui-nal-ilbon_23-2148810360.jpg`;
};
</script>
<template>
  <div class="flex flex-col gap-2 p-2">
    <Card
      v-for="(travelPlan, index) in travelPlans"
      class="flex gap-2 p-4 text-xs"
    >
      <img
        :src="getImg(index)"
        alt="Travel Image"
        class="w-32 h-full object-cover rounded-lg"
      />
      <div class="p-2 flex flex-col">
        <div class="font-bold text-lg mb-2">
          {{ travelPlan.travel_region }}
          {{ travelPlan.travel_period }} 여행
        </div>
        <div class="flex items-center mb-1">
          <i class="fas fa-user"></i>{{ travelPlan.author }}
        </div>
        <div class="flex items-center mb-1">
          <i class="fas fa-calendar-alt"></i
          >{{ dayjs(travelPlan.date_created).format("YYYY-MM-DD") }}
        </div>
        <div class="flex gap-2">
          <div class="flex items-center mb-1">
            <i class="fas fa-map-marker-alt"></i>{{ travelPlan.travel_region }}
          </div>
          <div class="flex items-center mb-1">
            <i class="fas fa-flag"></i>{{ travelPlan.travel_purpose }}
          </div>
        </div>
        <div class="flex items-center">
          <i class="fas fa-clock"></i>{{ travelPlan.travel_period }}
        </div>
      </div>
    </Card>
  </div>
</template>
