<script setup lang="ts">
const { getSpots, selectedSpot } = useSpot();
const { schedulesSpots } = useSchedule();
const filter = useFilter();

onMounted(() => {
  getSpots();
});

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
    <div class="flex flex-col gap-2 p-2">
      <Card
        v-for="spot in schedulesSpots"
        class="flex flex-col gap-2 p-2 text-xs cursor-pointer hover:bg-neutral-100"
        @click="scheduleWritingOpen(spot)"
      >
        <div class="flex w-full h-full gap-2 overflow-hidden">
          <Full>
            <div class="font-bold">{{ spot.spot_name }}</div>
            <div class="text-neutral-400 line-clamp-3">
              {{ spot.description }}
            </div>
            <div class="flex items-center gap-2 pt-2">
              <Badge variant="secondary">{{ spot.type }}</Badge>
              <Badge variant="outline">{{ spot.city }}</Badge>
            </div>
          </Full>
          <Fix>
            <img
              class="object-cover w-20 h-20 rounded"
              :src="spot.image"
              :alt="spot.spot_name"
            />
          </Fix>
        </div>
      </Card>
    </div>
  </ScrollArea>
</template>
