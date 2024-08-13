<script setup lang="ts">
import ColCover from "./components/colCover.vue";

const filter = useFilter();
const { getTravelPlans } = useTravelPlan();

onMounted(() => {
  getTravelPlans();
});
</script>

<template>
  <ColCover class="h-svh">
    <Fix>
      <RowCover>
        <Fix class="flex items-center justify-between w-full p-4 md:w-56">
          <div>여기어때</div>
          <Tabs class="md:hidden" v-model="filter.viewOnMobile">
            <TabsList>
              <TabsTrigger value="plan"> plan </TabsTrigger>
              <TabsTrigger value="schedule"> schedule </TabsTrigger>
              <TabsTrigger value="map"> map </TabsTrigger>
            </TabsList>
          </Tabs>
        </Fix>
        <Full class="flex justify-between hidden p-2 md:block">
          <MarkerFilter />
          <div class="flex gap-2">
            <SpotWriting />
            <Button
              variant="secondary"
              @click="
                filter.selectedTile == 'openStreetMap'
                  ? (filter.selectedTile = 'cartoDb')
                  : (filter.selectedTile = 'openStreetMap')
              "
              >{{ filter.selectedTile }}
            </Button>
          </div>
        </Full>
      </RowCover>
    </Fix>
    <Full>
      <RowCover>
        <Fix
          class="w-full md:w-56 md:block"
          :class="filter.viewOnMobile == 'plan' ? '' : 'hidden '"
        >
          <ColCover>
            <Fix class="p-2">
              <PlanFilter />
            </Fix>
            <Fix class="hidden p-2 md:block">
              <PlanWriting />
            </Fix>
            <Full>
              <ScrollArea class="h-full">
                <PlanList />
              </ScrollArea>
            </Full>
          </ColCover>
        </Fix>
        <Fix
          class="w-full md:w-96 md:block"
          :class="filter.viewOnMobile == 'schedule' ? '' : 'hidden'"
        >
          <ColCover>
            <ScheduleList />
          </ColCover>
        </Fix>
        <Full
          class="z-0 w-full md:block"
          :class="filter.viewOnMobile == 'map' ? '' : 'hidden'"
        >
          <Map />
        </Full>
      </RowCover>
    </Full>
  </ColCover>
  <ScheduleWriting
    :open="filter.scheduleWritingOpen"
    @update:open="filter.scheduleWritingOpen = $event"
  />
</template>

<style>
.leaflet-div-icon {
  background: transparent;
  border: 0;
}
</style>
