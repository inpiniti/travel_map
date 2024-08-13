<script setup lang="ts">
const { spots, getSpots } = useSpot();
const { isMobile } = useDevice();

onMounted(() => {
  getSpots();
});
</script>
<template>
  <Fix class="p-2">
    <div class="flex justify-between">
      <div class="flex items-center gap-2">
        <Button
          variant="secondary"
          @click="useFilter().value.day = useFilter().value.day - 1"
        >
          <
        </Button>
        <div class="whitespace-nowrap">{{ useFilter().value.day }}일차</div>
        <Button
          variant="secondary"
          @click="useFilter().value.day = useFilter().value.day + 1"
        >
          >
        </Button>
      </div>
      <Tabs v-if="!isMobile" v-model="useFilter().value.type">
        <TabsList>
          <TabsTrigger value="일정"> 일정 </TabsTrigger>
          <TabsTrigger value="장소"> 장소 </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  </Fix>
  <Full>
    <ScrollArea class="h-full">
      <div class="flex flex-col gap-2 p-2">
        <Card v-for="spot in spots" class="flex flex-col gap-2 p-2 text-xs">
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
  </Full>
</template>
