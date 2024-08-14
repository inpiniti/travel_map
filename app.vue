<script setup lang="ts">
import ColCover from "./components/colCover.vue";

const filter = useFilter();
const { getTravelPlans } = useTravelPlan();

onMounted(() => {
  getTravelPlans();
});
</script>

<template>
  <ColCover class="absolute h-svh">
    <Fix>
      <RowCover>
        <Fix
          class="flex items-center justify-between w-full md:p-4 md:w-56"
          :class="filter.viewOnMobile == 'plan' ? 'p-4' : 'p-2'"
        >
          <TopMenuBar />
        </Fix>
        <Full class="justify-between hidden p-2 md:flex">
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
          class="w-full md:w-56 md:flex"
          :class="filter.viewOnMobile == 'plan' ? '' : 'hidden '"
        >
          <ColCover>
            <Fix class="p-2">
              <PlanFilter />
            </Fix>
            <Fix class="hidden p-2 md:flex">
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
          class="w-full md:w-96 md:flex"
          :class="filter.viewOnMobile == 'schedule' ? '' : 'hidden'"
        >
          <ColCover>
            <ScheduleList />
          </ColCover>
        </Fix>
        <Full
          class="z-0 w-full md:flex md:relative md:top-0"
          :class="filter.viewOnMobile == 'map' ? '' : 'absolute top-[99999px]'"
        >
          <ColCover>
            <Fix><PlanFilter /></Fix>
            <Full>
              <Map />
            </Full>
          </ColCover>
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
