<script setup lang="ts">
const { getSpots } = useSpot();
const { schedulesSpots } = useSchedule();
const { isMobile } = useDevice();

onMounted(() => {
  getSpots();
});
</script>
<template>
  <ScrollArea class="h-full">
    <div class="flex flex-col gap-2 p-2">
      <Card
        v-for="spot in schedulesSpots"
        class="flex flex-col gap-2 p-2 text-xs"
      >
        <div class="flex w-full h-full gap-2 overflow-hidden">
          <Full>
            <div class="font-bold">{{ spot.spot_name }}</div>
            <div class="text-neutral-400 line-clamp-3">
              {{ spot.description }}
            </div>
            <div class="flex gap-2 pt-2">
              <Button size="xs" variant="secondary">{{ spot.type }}</Button>
              <Button size="xs" variant="outline">{{ spot.city }}</Button>
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
