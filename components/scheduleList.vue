<script setup lang="ts">
import draggable from "vuedraggable";

const { selectedTravelPlan } = useTravelPlan();
const { getSpots, selectedSpot, spots } = useSpot();
const { schedulesSpots, dayNSchedule, putSchedule } = useSchedule();
const filter = useFilter();

onMounted(() => {
  getSpots();
});

function onEnd() {
  putSchedule({
    id: dayNSchedule.value.id,
    day: filter.value.day,
    travel_plan_id: selectedTravelPlan.value.id,
    travel_spot_ids: schedulesSpots.value.map((spot) => spot.id) as number[],
  });
}

const scheduleWritingOpen = (spot: Spot) => {
  selectedSpot.value = spot;
  filter.value.scheduleWritingOpen = true;
};
</script>
<template>
  <ScrollArea class="h-full">
    <DevOnly>
      <div class="absolute top-0 left-0 text-xs bg-opacity-50">
        scheduleList
      </div>
    </DevOnly>
    <draggable
      v-if="filter.type == '일정'"
      v-model="schedulesSpots"
      class="flex flex-col gap-2 p-2 dragArea"
      @end="onEnd"
      :disabled="!filter.isDraggable || filter.type !== '일정'"
    >
      <template #item="{ element: spot }">
        <ScheduleCard :spot="spot" @click="scheduleWritingOpen(spot)" />
      </template>
    </draggable>
    <draggable
      v-else
      v-model="spots"
      class="flex flex-col gap-2 p-2 dragArea"
      @end="onEnd"
      :disabled="!filter.isDraggable || filter.type !== '일정'"
    >
      <template #item="{ element: spot }">
        <ScheduleCard :spot="spot" @click="scheduleWritingOpen(spot)" />
      </template>
    </draggable>
  </ScrollArea>
</template>
