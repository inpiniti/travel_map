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

const scheduleList = computed(() => {
  if (filter.value.type == "일정") {
    return schedulesSpots.value;
  } else {
    return spots.value.filter((spot) => {
      return spot.spot_name.includes(useFilter().value.scheduleSearch);
    });
  }
});
</script>
<template>
  <ScrollArea class="h-full">
    <DevOnly>
      <div class="absolute top-0 left-0 text-xs bg-opacity-50">
        scheduleList
      </div>
    </DevOnly>
    <draggable
      v-model="scheduleList"
      class="flex flex-col gap-2 p-2 dragArea"
      @end="onEnd"
      :disabled="!filter.isDraggable || filter.type !== '일정'"
    >
      <template #item="{ element: spot }">
        <Card
          class="flex flex-col gap-2 p-2 text-xs cursor-pointer"
          @click="scheduleWritingOpen(spot)"
        >
          <div class="flex w-full h-full gap-2 overflow-hidden">
            <Full>
              <div class="flex flex-col gap-1">
                <div class="flex items-center gap-2">
                  <Badge variant="outline">{{ spot.city }}</Badge>
                  <Badge variant="secondary">{{ spot.type }}</Badge>
                </div>
                <div>
                  <div class="font-bold text-sm">{{ spot.spot_name }}</div>
                </div>
                <div class="text-zinc-400 line-clamp-3">
                  {{ spot.description }}
                </div>
                <div class="text-zinc-600 line-clamp-3">
                  {{ spot.opening }}
                </div>
                <div class="flex items-center gap-2 pt-2">
                  <Badge v-if="spot.detailType">{{ spot.detailType }}</Badge>
                  <Badge v-if="spot.rating" variant="outline">{{
                    spot.rating
                  }}</Badge>
                  <Badge v-if="spot.reviews" variant="secondary">{{
                    spot.reviews
                  }}</Badge>
                </div>
              </div>
            </Full>
            <Fix>
              <img
                class="object-cover w-20 h-28 rounded-lg"
                :src="spot.image"
                :alt="spot.spot_name"
              />
            </Fix>
          </div>
        </Card>
      </template>
    </draggable>
  </ScrollArea>
</template>
